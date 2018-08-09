$(function () {
    $('.nav-main .areas-submenu-trigger, .nav-main .submenu-trigger').on('click', function () {
        if ($(this).closest('li').find('.areas-nav-submenu, .nav-submenu').length) {
            if (!$(this).hasClass('custom')) {
                $('.areas-nav-submenu').removeClass('active')
            }
            // Close other active submenus first, if any
            if ($('.submenu-active').length && !$(this).closest('li').hasClass('submenu-active') && !$(this).hasClass('custom')) {
                $('.nav-main .submenu-active, .nav-wrapper, .areas-nav-submenu').removeClass('submenu-active active');

            }

            $(this).closest('li').toggleClass('submenu-active');

            return false;
        }
    });
    $(document).on('keydown click', function (e) {
        if ($('.menu-item.submenu-active').length && (e.keyCode === 27 || !e.keyCode)) {
            $('.nav-main .submenu-active, .nav-wrapper, .areas-nav-submenu').removeClass('submenu-active active');
        }
    });
    $('.areas-submenu-trigger.custom').on('click', function () {
        $('.areas-nav-submenu').find('li.menu-item').removeClass('submenu-active');
        if($('.areas-nav-submenu.active').attr('data-id')!=$(this).text()){
            $('.areas-nav-submenu.active').removeClass('active').attr('data-id', '');
        }

       $(this).closest('li.menu-item').addClass('submenu-active');
       $(this).closest('.areas-nav-submenu').toggleClass('active').attr('data-id', $(this).text());
    });
});

// $(function () {
//     $('.nav-main .submenu-trigger').on('click', function () {
//         if ($(this).closest('li').find('.nav-submenu').length) {
//
//             // Close other active submenus first, if any
//             if ($('.nav-wrapper.submenu-active').length && !$(this).closest('li').hasClass('submenu-active')) {
//                 $('.nav-main .submenu-active, .nav-wrapper').removeClass('submenu-active');
//             }
//
//             $(this).closest('li').toggleClass('submenu-active');
//             $('.nav-wrapper').toggleClass('submenu-active');
//             return false;
//         }
//     });
//
//     $(document).on('keydown click', function (e) {
//         if ($('.nav-wrapper.submenu-active').length && (e.keyCode === 27 || !e.keyCode)) {
//             $('.nav-main .submenu-active, .nav-wrapper').removeClass('submenu-active');
//         }
//     });
// $('.custom').on('click', function () {
//     $(this).closest('.areas-nav-submenu').toggleClass('active');
//     $(this).siblings('.areas-nav-submenu').toggleClass('active');
// });
// });
