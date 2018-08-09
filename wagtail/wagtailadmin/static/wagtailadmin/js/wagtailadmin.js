webpackJsonp([0], {
    106: function (e, n, t) {
        "use strict";
        var a = (t(21), t(22), t(56), t(55), t(57), t(116));
        t.d(n, "a", function () {
            return a.a
        })
    }, 108: function (e, n, t) {
        "use strict";
        (function (e) {
            t.d(n, "a", function () {
                return i
            }), t.d(n, "b", function () {
                return o
            });
            var a = t(109), r = t(13), i = function (e) {
                var n = "" + r.b.PAGES + e + "/";
                return t.i(a.a)(n)
            }, o = function (n) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    o = r.b.PAGES + "?child_of=" + n;
                return i.fields && (o += "&fields=" + e.encodeURIComponent(i.fields.join(","))), i.onlyWithChildren && (o += "&has_children=1"), i.offset && (o += "&offset=" + i.offset), o += r.b.EXTRA_CHILDREN_PARAMETERS, t.i(a.a)(o)
            }
        }).call(n, t(15))
    }, 109: function (e, n, t) {
        "use strict";
        (function (e) {
            t.d(n, "a", function () {
                return u
            });
            var a = e.fetch, r = e.Headers, i = function (e) {
                if (e.status >= 200 && e.status < 300) return e;
                throw new Error(e.statusText)
            }, o = function (e) {
                return e.json()
            }, c = function (e, n) {
                return new Promise(function (t, a) {
                    var r = setTimeout(function () {
                        a(new Error("Response timeout"))
                    }, e);
                    n.then(function (e) {
                        clearTimeout(r), t(e)
                    }, function (e) {
                        clearTimeout(r), a(e)
                    })
                })
            }, s = function (e, n) {
                var t = {
                    credentials: "same-origin",
                    headers: new r({Accept: "application/json", "Content-Type": "application/json"}),
                    method: e
                };
                return c(15e3, a(n, t)).then(i).then(o)
            }, u = function (e) {
                return s("GET", e)
            }
        }).call(n, t(15))
    }, 110: function (e, n, t) {
        "use strict";
        var a = t(6), r = t.n(a), i = t(5), o = t.n(i), c = t(52), s = t(54), u = t(113), l = function (e) {
            var n = e.isVisible, t = e.nodes, a = e.path, r = e.pushPage, i = e.popPage, c = e.onClose,
                s = t[a[a.length - 1]];
            return n ? o.a.createElement(u.a, {path: a, page: s, nodes: t, onClose: c, popPage: i, pushPage: r}) : null
        };
        l.propTypes = {
            isVisible: r.a.bool.isRequired,
            path: r.a.array.isRequired,
            nodes: r.a.object.isRequired,
            pushPage: r.a.func.isRequired,
            popPage: r.a.func.isRequired,
            onClose: r.a.func.isRequired
        };
        var d = function (e) {
            return {isVisible: e.explorer.isVisible, path: e.explorer.path, nodes: e.nodes}
        }, p = function (e) {
            return {
                pushPage: function (n) {
                    return e(s.a(n))
                }, popPage: function () {
                    return e(s.b())
                }, onClose: function () {
                    return e(s.c())
                }
            }
        };
        n.a = t.i(c.b)(d, p)(l)
    }, 111: function (e, n, t) {
        "use strict";
        var a = t(6), r = t.n(a), i = t(5), o = t.n(i), c = t(13), s = t(21), u = t(22), l = function (e) {
            var n = e.page, t = e.depth, a = e.onClick, r = 1 === t;
            return o.a.createElement(s.a, {
                href: n.id ? "" + c.d.PAGES + n.id + "/" : c.d.PAGES,
                className: "c-explorer__header",
                onClick: a
            }, o.a.createElement("div", {className: "c-explorer__header__inner"}, o.a.createElement(u.a, {name: r ? "home" : "arrow-left"}), o.a.createElement("span", null, n.admin_display_title || c.c.PAGES)))
        };
        l.propTypes = {
            page: r.a.shape({
                id: r.a.oneOfType([r.a.string, r.a.number]),
                admin_display_title: r.a.string
            }).isRequired, depth: r.a.number.isRequired, onClick: r.a.func.isRequired
        }, n.a = l
    }, 112: function (e, n, t) {
        "use strict";
        var a = t(6), r = t.n(a), i = t(5), o = t.n(i), c = t(13), s = t(22), u = t(21), l = t(56),
            d = o.a.createElement(s.a, {name: "folder-inverse"}),
            p = o.a.createElement(s.a, {name: "edit", title: c.c.EDIT}),
            f = o.a.createElement(s.a, {name: "arrow-right", title: c.c.SEE_CHILDREN}), m = function (e) {
                var n = e.item, t = e.onClick, a = n.id, r = n.admin_display_title, i = n.meta, s = i.children.count > 0,
                    m = i.status.live && !i.status.has_unpublished_changes;
                return o.a.createElement("div", {className: "c-explorer__item"}, o.a.createElement(u.a, {
                    href: "" + c.d.PAGES + a + "/",
                    className: "c-explorer__item__link"
                }, s ? d : null, o.a.createElement("h3", {className: "c-explorer__item__title"}, r), m ? null : o.a.createElement("span", {className: "c-explorer__meta"}, o.a.createElement(l.a, {status: i.status}))), o.a.createElement(u.a, {
                    href: "" + c.d.PAGES + a + "/edit/",
                    className: "c-explorer__item__action c-explorer__item__action--small"
                }, p), s ? o.a.createElement(u.a, {
                    className: "c-explorer__item__action",
                    onClick: t,
                    href: "" + c.d.PAGES + a + "/"
                }, f) : null)
            };
        m.propTypes = {
            item: r.a.shape({
                id: r.a.oneOfType([r.a.string, r.a.number]).isRequired,
                admin_display_title: r.a.string.isRequired,
                meta: r.a.shape({status: r.a.object.isRequired}).isRequired
            }).isRequired, onClick: r.a.func.isRequired
        }, n.a = m
    }, 113: function (e, n, t) {
        "use strict";

        function a(e, n) {
            if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
        }

        function r(e, n) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !n || "object" != typeof n && "function" != typeof n ? e : n
        }

        function i(e, n) {
            if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + typeof n);
            e.prototype = Object.create(n && n.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n)
        }

        var o = t(6), c = t.n(o), s = t(5), u = t.n(s), l = t(134), d = t.n(l), p = t(13), f = t(21), m = t(55),
            E = t(57), h = t(111), v = t(112), _ = t(115), g = function () {
                function e(e, n) {
                    for (var t = 0; t < n.length; t++) {
                        var a = n[t];
                        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
                    }
                }

                return function (n, t, a) {
                    return t && e(n.prototype, t), a && e(n, a), n
                }
            }(), b = function (e) {
                function n(e) {
                    a(this, n);
                    var t = r(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
                    return t.state = {
                        transition: E.a,
                        paused: !1
                    }, t.onItemClick = t.onItemClick.bind(t), t.onHeaderClick = t.onHeaderClick.bind(t), t.clickOutside = t.clickOutside.bind(t), t
                }

                return i(n, e), g(n, [{
                    key: "componentWillReceiveProps", value: function (e) {
                        var n = this.props.path, t = e.path.length > n.length;
                        this.setState({transition: t ? E.a : E.b})
                    }
                }, {
                    key: "componentDidMount", value: function () {
                        document.querySelector("[data-explorer-menu-item]").classList.add("submenu-active"), document.body.classList.add("explorer-open"), document.addEventListener("mousedown", this.clickOutside), document.addEventListener("touchend", this.clickOutside)
                    }
                }, {
                    key: "componentWillUnmount", value: function () {
                        document.querySelector("[data-explorer-menu-item]").classList.remove("submenu-active"), document.body.classList.remove("explorer-open"), document.removeEventListener("mousedown", this.clickOutside), document.removeEventListener("touchend", this.clickOutside)
                    }
                }, {
                    key: "clickOutside", value: function (e) {
                        var n = this.props.onClose, t = document.querySelector("[data-explorer-menu]"),
                            a = document.querySelector("[data-explorer-menu-item]");
                        t.contains(e.target) || a.contains(e.target) || n(), a.contains(e.target) && this.setState({paused: !0})
                    }
                }, {
                    key: "onItemClick", value: function (e, n) {
                        var t = this.props.pushPage;
                        n.preventDefault(), n.stopPropagation(), t(e)
                    }
                }, {
                    key: "onHeaderClick", value: function (e) {
                        var n = this.props, t = n.path, a = n.popPage;
                        t.length > 1 && (e.preventDefault(), e.stopPropagation(), a())
                    }
                }, {
                    key: "renderChildren", value: function () {
                        var e = this, n = this.props, t = n.page, a = n.nodes, r = void 0;
                        return r = t.isFetching || t.children.items ? u.a.createElement("div", {key: "children"}, t.children.items.map(function (n) {
                            return u.a.createElement(v.a, {key: n, item: a[n], onClick: e.onItemClick.bind(null, n)})
                        })) : u.a.createElement("div", {
                            key: "empty",
                            className: "c-explorer__placeholder"
                        }, p.c.NO_RESULTS), u.a.createElement("div", {className: "c-explorer__drawer"}, r, t.isFetching ? u.a.createElement("div", {
                            key: "fetching",
                            className: "c-explorer__placeholder"
                        }, u.a.createElement(m.a, null)) : null, t.isError ? u.a.createElement("div", {
                            key: "error",
                            className: "c-explorer__placeholder"
                        }, p.c.SERVER_ERROR) : null)
                    }
                }, {
                    key: "render", value: function () {
                        var e = this.props, n = e.page, t = e.onClose, a = e.path, r = this.state, i = r.transition,
                            o = r.paused;
                        return u.a.createElement(d.a, {
                            tag: "nav",
                            className: "explorer",
                            paused: o || !n || n.isFetching,
                            focusTrapOptions: {initialFocus: ".c-explorer__close", onDeactivate: t}
                        }, u.a.createElement(f.a, {
                            className: "c-explorer__close u-hidden",
                            onClick: t
                        }, p.c.CLOSE_EXPLORER), u.a.createElement(E.c, {
                            name: i,
                            className: "c-explorer"
                        }, u.a.createElement("div", {
                            key: a.length,
                            className: "c-transition-group"
                        }, u.a.createElement(h.a, {
                            depth: a.length,
                            page: n,
                            onClick: this.onHeaderClick
                        }), this.renderChildren(), n.isError || n.children.items && n.children.count > p.a ? u.a.createElement(_.a, {page: n}) : null)))
                    }
                }]), n
            }(u.a.Component);
        b.propTypes = {
            nodes: c.a.object.isRequired,
            path: c.a.array.isRequired,
            page: c.a.shape({
                isFetching: c.a.bool,
                children: c.a.shape({count: c.a.number, items: c.a.array})
            }).isRequired,
            onClose: c.a.func.isRequired,
            popPage: c.a.func.isRequired,
            pushPage: c.a.func.isRequired
        }, n.a = b
    }, 114: function (e, n, t) {
        "use strict";
        var a = t(6), r = t.n(a), i = t(5), o = t.n(i), c = t(52), s = t(54), u = t(21), l = function (e) {
            var n = e.children, t = e.onToggle;
            return o.a.createElement(u.a, {icon: ["folder-open-inverse", "arrow-right-after"], onClick: t}, n)
        };
        l.propTypes = {onToggle: r.a.func.isRequired, children: r.a.node.isRequired};
        var d = function () {
            return {}
        }, p = function (e) {
            return {
                onToggle: function (n) {
                    return e(s.d(n))
                }
            }
        }, f = function (e, n, t) {
            return {children: t.children, onToggle: n.onToggle.bind(null, t.startPage)}
        };
        n.a = t.i(c.b)(d, p, f)(l)
    }, 115: function (e, n, t) {
        "use strict";
        var a = t(6), r = t.n(a), i = t(5), o = t.n(i), c = t(13), s = t(22), u = function (e) {
            var n = e.page, t = n.children.count;
            return o.a.createElement("a", {
                href: "" + c.d.PAGES + n.id + "/",
                className: "c-explorer__see-more",
                tabIndex: 0
            }, c.c.SEE_ALL, o.a.createElement("span", null, " " + t + " " + (1 === t ? c.c.PAGE.toLowerCase() : c.c.PAGES.toLowerCase())), o.a.createElement(s.a, {name: "arrow-right"}))
        };
        u.propTypes = {page: r.a.object.isRequired}, n.a = u
    }, 116: function (e, n, t) {
        "use strict";
        t.d(n, "a", function () {
            return E
        });
        var a = t(5), r = t.n(a), i = t(65), o = t.n(i), c = t(52), s = t(101), u = t(250), l = t.n(u), d = t(110),
            p = t(114), f = t(117), m = t(118), E = function (e, n) {
                var a = t.i(s.a)({explorer: f.a, nodes: m.a}), i = [l.a],
                    u = t.i(s.b)(a, {}, t.i(s.c)(s.d.apply(void 0, i), window.devToolsExtension ? window.devToolsExtension() : function (e) {
                        return e
                    })), E = parseInt(n.getAttribute("data-explorer-start-page"), 10);
                o.a.render(r.a.createElement(c.a, {store: u}, r.a.createElement(p.a, {startPage: E}, n.textContent)), n.parentNode), o.a.render(r.a.createElement(c.a, {store: u}, r.a.createElement(d.a, null)), e)
            };
        d.a
    }, 117: function (e, n, t) {
        "use strict";

        function a() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r, n = arguments[1], t = n.type,
                a = n.payload;
            switch (t) {
                case"OPEN_EXPLORER":
                    return {isVisible: !0, path: [a.id]};
                case"CLOSE_EXPLORER":
                    return r;
                case"PUSH_PAGE":
                    return {isVisible: e.isVisible, path: e.path.concat([a.id])};
                case"POP_PAGE":
                    return {isVisible: e.isVisible, path: e.path.slice(0, -1)};
                default:
                    return e
            }
        }

        n.a = a;
        var r = {isVisible: !1, path: []}
    }, 118: function (e, n, t) {
        "use strict";

        function a(e, n, t) {
            return n in e ? Object.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[n] = t, e
        }

        function r() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c, n = arguments[1], t = n.type,
                r = n.payload;
            switch (t) {
                case"OPEN_EXPLORER":
                case"GET_PAGE_SUCCESS":
                case"GET_CHILDREN_START":
                case"GET_PAGE_FAILURE":
                case"GET_CHILDREN_FAILURE":
                    return Object.assign({}, e, a({}, r.id, o(e[r.id], {type: t, payload: r})));
                case"GET_CHILDREN_SUCCESS":
                    var s = Object.assign({}, e, a({}, r.id, o(e[r.id], {type: t, payload: r})));
                    return r.items.forEach(function (e) {
                        s[e.id] = Object.assign({}, i, e)
                    }), s;
                default:
                    return e
            }
        }

        n.a = r;
        var i = {isFetching: !1, isError: !1, children: {items: [], count: 0}, meta: {children: {}}}, o = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i, n = arguments[1], t = n.type,
                a = n.payload;
            switch (t) {
                case"OPEN_EXPLORER":
                    return e || i;
                case"GET_PAGE_SUCCESS":
                    return Object.assign({}, e, a.data, {isError: !1});
                case"GET_CHILDREN_START":
                    return Object.assign({}, e, {isFetching: !0});
                case"GET_CHILDREN_SUCCESS":
                    return Object.assign({}, e, {
                        isFetching: !1,
                        isError: !1,
                        children: {
                            items: e.children.items.slice().concat(a.items.map(function (e) {
                                return e.id
                            })), count: a.meta.total_count
                        }
                    });
                case"GET_PAGE_FAILURE":
                case"GET_CHILDREN_FAILURE":
                    return Object.assign({}, e, {isFetching: !1, isError: !0});
                default:
                    return e
            }
        }, c = {}
    }, 119: function (e, n, t) {
        "use strict";

        function a(e, n, t) {
            var a = "function" == typeof n ? n : r;
            return function () {
                var n = {type: e, payload: a.apply(void 0, arguments)};
                return n.payload instanceof Error && (n.error = !0), "function" == typeof t && (n.meta = t.apply(void 0, arguments)), n
            }
        }

        n.a = a;
        var r = function (e) {
            return e
        }
    }, 120: function (e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        var a = t(106);
        document.addEventListener("DOMContentLoaded", function () {
            var e = document.querySelector("[data-explorer-menu]"),
                n = document.querySelector("[data-explorer-start-page]");
            e && n && t.i(a.a)(e, n)
        })
    }, 13: function (e, n, t) {
        "use strict";
        (function (e) {
            t.d(n, "b", function () {
                return a
            }), t.d(n, "c", function () {
                return r
            }), t.d(n, "d", function () {
                return i
            }), t.d(n, "a", function () {
                return o
            });
            var a = e.wagtailConfig.ADMIN_API, r = e.wagtailConfig.STRINGS, i = e.wagtailConfig.ADMIN_URLS, o = 200
        }).call(n, t(15))
    }, 21: function (e, n, t) {
        "use strict";
        var a = t(6), r = t.n(a), i = t(5), o = t.n(i), c = function (e, n) {
            var t = "" !== n, a = "";
            return t && (a = "string" == typeof n ? " icon-" + n : n.map(function (e) {
                return " icon-" + e
            }).join("")), e + " " + (t ? "icon" : "") + a
        }, s = function (e, n, t, a) {
            t && "#" === e && (a.preventDefault(), a.stopPropagation()), n && n(a)
        }, u = function (e) {
            var n = e.className, t = e.icon, a = e.children, r = e.accessibleLabel, i = e.isLoading, u = e.href,
                l = e.target, d = e.preventDefault, p = e.onClick, f = null !== a, m = i ? "spinner" : t,
                E = r ? o.a.createElement("span", {className: "visuallyhidden"}, r) : null;
            return o.a.createElement("a", {
                className: c(n, m),
                onClick: s.bind(null, u, p, d),
                rel: "_blank" === l ? "noopener noreferrer" : null,
                href: u,
                target: l
            }, f ? a : E)
        };
        u.propTypes = {
            href: r.a.string,
            className: r.a.string,
            icon: r.a.oneOfType([r.a.string, r.a.arrayOf(r.a.string)]),
            target: r.a.string,
            children: r.a.node,
            accessibleLabel: r.a.string,
            onClick: r.a.func,
            isLoading: r.a.bool,
            preventDefault: r.a.bool
        }, u.defaultProps = {
            href: "#",
            className: "",
            icon: "",
            target: null,
            children: null,
            accessibleLabel: null,
            onClick: null,
            isLoading: !1,
            preventDefault: !0
        }, n.a = u
    }, 22: function (e, n, t) {
        "use strict";
        var a = t(6), r = t.n(a), i = t(5), o = t.n(i), c = function (e) {
            var n = e.name, t = e.className, a = e.title;
            return o.a.createElement("span", null, o.a.createElement("span", {
                className: "icon icon-" + n + " " + (t || ""),
                "aria-hidden": !0
            }), a ? o.a.createElement("span", {className: "visuallyhidden"}, a) : null)
        };
        c.propTypes = {
            name: r.a.string.isRequired,
            className: r.a.string,
            title: r.a.string
        }, c.defaultProps = {className: null, title: null}, n.a = c
    }, 54: function (e, n, t) {
        "use strict";

        function a(e) {
            return function (n) {
                return n(l(e)), c.a(e).then(function (t) {
                    n(d(e, t))
                }, function (t) {
                    n(p(e, t))
                })
            }
        }

        function r(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return function (t) {
                return t(f(e)), c.b(e, {offset: n}).then(function (a) {
                    var i = a.items, o = a.meta, c = n + i.length;
                    t(m(e, i, o)), c < o.total_count && c < u.a && t(r(e, c))
                }, function (n) {
                    t(E(e, n))
                })
            }
        }

        function i(e) {
            return function (n, t) {
                var i = t(), o = i.explorer, c = i.nodes;
                if (o.isVisible) n(v()); else {
                    var s = c[e];
                    n(h(e)), s || n(r(e));
                    1 !== e && n(a(e))
                }
            }
        }

        function o(e) {
            return function (n, t) {
                var a = t(), i = a.nodes, o = i[e];
                n(g(e)), o && !o.isFetching && !o.children.count > 0 && n(r(e))
            }
        }

        t.d(n, "c", function () {
            return v
        }), n.d = i, t.d(n, "b", function () {
            return _
        }), n.a = o;
        var c = t(108), s = t(119), u = t(13), l = t.i(s.a)("GET_PAGE_START"),
            d = t.i(s.a)("GET_PAGE_SUCCESS", function (e, n) {
                return {id: e, data: n}
            }), p = t.i(s.a)("GET_PAGE_FAILURE", function (e, n) {
                return {id: e, error: n}
            }), f = t.i(s.a)("GET_CHILDREN_START", function (e) {
                return {id: e}
            }), m = t.i(s.a)("GET_CHILDREN_SUCCESS", function (e, n, t) {
                return {id: e, items: n, meta: t}
            }), E = t.i(s.a)("GET_CHILDREN_FAILURE", function (e, n) {
                return {id: e, error: n}
            }), h = t.i(s.a)("OPEN_EXPLORER", function (e) {
                return {id: e}
            }), v = t.i(s.a)("CLOSE_EXPLORER"), _ = t.i(s.a)("POP_PAGE"), g = t.i(s.a)("PUSH_PAGE", function (e) {
                return {id: e}
            })
    }, 55: function (e, n, t) {
        "use strict";
        var a = t(5), r = t.n(a), i = t(13), o = t(22), c = function () {
            return r.a.createElement("span", null, r.a.createElement(o.a, {
                name: "spinner",
                className: "c-spinner"
            }), " " + i.c.LOADING)
        };
        n.a = c
    }, 56: function (e, n, t) {
        "use strict";
        var a = t(6), r = t.n(a), i = t(5), o = t.n(i), c = function (e) {
            var n = e.status;
            return o.a.createElement("span", {className: "o-pill c-status" + (n.live ? " c-status--live" : "")}, n.status)
        };
        c.propTypes = {
            status: r.a.shape({
                live: r.a.bool.isRequired,
                status: r.a.string.isRequired
            }).isRequired
        }, n.a = c
    }, 57: function (e, n, t) {
        "use strict";
        t.d(n, "a", function () {
            return u
        }), t.d(n, "b", function () {
            return l
        });
        var a = t(6), r = t.n(a), i = t(5), o = t.n(i), c = t(227), s = t.n(c), u = "push", l = "pop",
            d = function (e) {
                var n = e.name, t = e.component, a = e.className, r = e.duration, i = e.children;
                return o.a.createElement(s.a, {
                    component: t,
                    transitionEnterTimeout: r,
                    transitionLeaveTimeout: r,
                    transitionName: "c-transition-" + n,
                    className: a
                }, i)
            };
        d.propTypes = {
            name: r.a.oneOf([u, l]).isRequired,
            component: r.a.string,
            className: r.a.string,
            duration: r.a.number,
            children: r.a.node
        }, d.defaultProps = {component: "div", children: null, className: null, duration: 210}, n.c = d
    }
}, [120]);
