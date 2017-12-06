from html.parser import HTMLParser
import re

from wagtail.admin.rich_text.converters.contentstate_models import (
    Block, ContentState, Entity, EntityRange, InlineStyleRange
)


class HandlerState(object):
    def __init__(self):
        self.current_block = None
        self.current_inline_styles = []
        self.current_entity_ranges = []
        # what to do with leading whitespace on the next text node we encounter: strip, keep or force
        self.leading_whitespace = 'strip'
        self.list_depth = 0
        self.list_item_type = None
        self.pushed_states = []

    def push(self):
        self.pushed_states.append({
            'current_block': self.current_block,
            'current_inline_styles': self.current_inline_styles,
            'current_entity_ranges': self.current_entity_ranges,
            'leading_whitespace': self.leading_whitespace,
            'list_depth': self.list_depth,
            'list_item_type': self.list_item_type
        })

    def pop(self):
        last_state = self.pushed_states.pop()
        self.current_block = last_state['current_block']
        self.current_inline_styles = last_state['current_inline_styles']
        self.current_entity_ranges = last_state['current_entity_ranges']
        self.leading_whitespace = last_state['leading_whitespace']
        self.list_depth = last_state['list_depth']
        self.list_item_type = last_state['list_item_type']


class ListElementHandler(object):
    """ Handler for <ul> / <ol> tags """
    def __init__(self, list_item_type):
        self.list_item_type = list_item_type

    def handle_starttag(self, name, attrs, state, contentstate):
        state.push()

        if state.list_item_type is None:
            # this is not nested in another list => depth remains unchanged
            pass
        else:
            # start the next nesting level
            state.list_depth += 1

        state.list_item_type = self.list_item_type

    def handle_endtag(self, name, state, contentstate):
        state.pop()


class BlockElementHandler(object):
    def __init__(self, block_type):
        self.block_type = block_type

    def create_block(self, name, attrs, state, contentstate):
        return Block(self.block_type, depth=state.list_depth)

    def handle_starttag(self, name, attrs, state, contentstate):
        block = self.create_block(name, dict(attrs), state, contentstate)
        contentstate.blocks.append(block)
        state.current_block = block
        state.leading_whitespace = 'strip'

    def handle_endtag(self, name, state, contentState):
        assert not state.current_inline_styles, "End of block reached without closing inline style elements"
        assert not state.current_entity_ranges, "End of block reached without closing entity elements"
        state.current_block = None


class ListItemElementHandler(BlockElementHandler):
    """ Handler for <li> tag """

    def __init__(self):
        pass  # skip setting self.block_type

    def create_block(self, name, attrs, state, contentstate):
        assert state.list_item_type is not None, "%s element found outside of an enclosing list element" % name
        return Block(state.list_item_type, depth=state.list_depth)


class InlineStyleElementHandler(object):
    def __init__(self, style):
        self.style = style

    def handle_starttag(self, name, attrs, state, contentstate):
        assert state.current_block is not None, "%s element found at the top level" % name

        if state.leading_whitespace == 'force':
            # any pending whitespace should be output before handling this tag,
            # and subsequent whitespace should be collapsed into it (= stripped)
            state.current_block.text += ' '
            state.leading_whitespace = 'strip'

        inline_style_range = InlineStyleRange(self.style)
        inline_style_range.offset = len(state.current_block.text)
        state.current_block.inline_style_ranges.append(inline_style_range)
        state.current_inline_styles.append(inline_style_range)

    def handle_endtag(self, name, state, contentstate):
        inline_style_range = state.current_inline_styles.pop()
        assert inline_style_range.style == self.style
        inline_style_range.length = len(state.current_block.text) - inline_style_range.offset


class LinkElementHandler(object):
    def __init__(self, entity_type):
        self.entity_type = entity_type

    def handle_starttag(self, name, attrs, state, contentstate):
        assert state.current_block is not None, "%s element found at the top level" % name

        if state.leading_whitespace == 'force':
            # any pending whitespace should be output before handling this tag,
            # and subsequent whitespace should be collapsed into it (= stripped)
            state.current_block.text += ' '
            state.leading_whitespace = 'strip'

        attrs = dict(attrs)

        entity = Entity(self.entity_type, 'MUTABLE', {'url': attrs['href']})
        key = contentstate.add_entity(entity)

        entity_range = EntityRange(key)
        entity_range.offset = len(state.current_block.text)
        state.current_block.entity_ranges.append(entity_range)
        state.current_entity_ranges.append(entity_range)

    def handle_endtag(self, name, state, contentstate):
        entity_range = state.current_entity_ranges.pop()
        entity_range.length = len(state.current_block.text) - entity_range.offset


class AtomicBlockEntityElementHandler(object):
    """
    Handler for elements like <img> that exist as a single immutable item at the block level
    """
    def handle_starttag(self, name, attrs, state, contentstate):
        assert state.current_block is None, "%s element found nested inside another block" % name

        entity = self.create_entity(name, dict(attrs), state, contentstate)
        key = contentstate.add_entity(entity)

        block = Block('atomic', depth=state.list_depth)
        contentstate.blocks.append(block)
        block.text = ' '
        entity_range = EntityRange(key)
        entity_range.offset = 0
        entity_range.length = 1
        block.entity_ranges.append(entity_range)

    def handle_endtag(self, name, state, contentstate):
        pass


class ImageElementHandler(AtomicBlockEntityElementHandler):
    def create_entity(self, name, attrs, state, contentstate):
        return Entity('IMAGE', 'IMMUTABLE', {'altText': attrs.get('alt'), 'src': attrs['src']})


ELEMENT_HANDLERS_BY_FEATURE = {
    'ol': {
        'ol': ListElementHandler('ordered-list-item'),
        'li': ListItemElementHandler(),
    },
    'ul': {
        'ul': ListElementHandler('unordered-list-item'),
        'li': ListItemElementHandler(),
    },
    'h1': {
        'h1': BlockElementHandler('header-one'),
    },
    'h2': {
        'h2': BlockElementHandler('header-two'),
    },
    'h3': {
        'h3': BlockElementHandler('header-three'),
    },
    'h4': {
        'h4': BlockElementHandler('header-four'),
    },
    'h5': {
        'h5': BlockElementHandler('header-five'),
    },
    'h6': {
        'h6': BlockElementHandler('header-six'),
    },
    'italic': {
        'i': InlineStyleElementHandler('ITALIC'),
        'em': InlineStyleElementHandler('ITALIC'),
    },
    'bold': {
        'b': InlineStyleElementHandler('BOLD'),
        'strong': InlineStyleElementHandler('BOLD'),
    },
    'link': {
        'a': LinkElementHandler('LINK'),
    },
    # 'img': ImageElementHandler(),
}


class HtmlToContentStateHandler(HTMLParser):
    def __init__(self, features=None):
        self.element_handlers = {
            'p': BlockElementHandler('unstyled'),
        }
        if features is not None:
            for feature in features:
                try:
                    feature_element_handlers = ELEMENT_HANDLERS_BY_FEATURE[feature]
                except KeyError:
                    continue
                self.element_handlers.update(feature_element_handlers)

        super().__init__()

    def reset(self):
        self.state = HandlerState()
        self.contentstate = ContentState()

        # stack of (name, handler) tuples for the elements we're currently inside
        self.open_elements = []

        super().reset()

    def add_block(self, block):
        self.contentstate.blocks.append(block)
        self.state.current_block = block
        self.state.leading_whitespace = 'strip'

    def handle_starttag(self, name, attrs):
        try:
            element_handler = self.element_handlers[name]
        except KeyError:
            if not self.open_elements:
                # treat unrecognised top-level elements as paragraphs
                element_handler = self.element_handlers['p']
            else:
                # ignore unrecognised elements below the top-level
                element_handler = None

        self.open_elements.append((name, element_handler))

        if element_handler:
            element_handler.handle_starttag(name, attrs, self.state, self.contentstate)

    def handle_endtag(self, name):
        expected_name, element_handler = self.open_elements.pop()
        assert name == expected_name, "Unmatched tags: expected %s, got %s" % (expected_name, name)
        if element_handler:
            element_handler.handle_endtag(name, self.state, self.contentstate)

    def handle_data(self, content):
        # normalise whitespace sequences to a single space
        content = re.sub(r'\s+', ' ', content)

        if self.state.current_block is None:
            if content == ' ':
                # ignore top-level whitespace
                return
            else:
                # create a new paragraph block for this content
                self.add_block(Block('unstyled', depth=self.state.list_depth))

        if content == ' ':
            # if leading_whitespace = 'strip', this whitespace node is not significant
            #   and should be skipped.
            # For other cases, _don't_ output the whitespace yet, but set leading_whitespace = 'force'
            # so that a space is forced before the next text node or inline element. If no such node
            # appears (= we reach the end of the block), the whitespace can rightfully be dropped.
            if self.state.leading_whitespace != 'strip':
                self.state.leading_whitespace = 'force'
        else:
            # strip or add leading whitespace according to the leading_whitespace flag
            if self.state.leading_whitespace == 'strip':
                content = content.lstrip()
            elif self.state.leading_whitespace == 'force' and not content.startswith(' '):
                content = ' ' + content

            if content.endswith(' '):
                # don't output trailing whitespace yet, because we want to discard it if the end
                # of the block follows. Instead, we'll set leading_whitespace = 'force' so that
                # any following text or inline element will be prefixed by a space
                content = content.rstrip()
                self.state.leading_whitespace = 'force'
            else:
                # no trailing whitespace here - any leading whitespace at the start of the
                # next text node should be respected
                self.state.leading_whitespace = 'keep'

            self.state.current_block.text += content