$(document).ready(function () {
    $(window).setSizeBody();
    /*==========================================================================
     * Event before Load Page Get Id UEL TO Click Menu
     * =========================================================================*/
    var url = $(location).attr('href');
    if (url.indexOf('#') >= 0) {
        url = url.split('#');
        url = url[url.length - 1].replace('Shirt-iTailor-', 'menu-');
        if (url) {
            $('li#' + url).trigger('click');
            /*$('li#menu-fabric').trigger('click');*/
        } else {
            $('li#menu-fabric').trigger('click');
        }
    } else {
        $('li#menu-fabric').trigger('click');
    }
    /*==========================================================================
     * Preload All Container
     *==========================================================================*/
    var $holder = $('#container');
    $holder.imagesLoaded({
        progress: function (isBroken, $images, $proper, $broken) {
            var percent = 0;
            percent = Math.round((($proper.length + $broken.length) * 100) / $images.length) + "%";
            $('.percent-bar-preload').css('width', percent);
            $('.percent-txt-preload').html(percent);
        },
        always: function () {
            $('.preload-main').fadeOut();
            $('.preload').fadeOut(2000);
        },
        fail: function() {
            $('.preload-main').fadeOut(function() {
                $('.preload').fadeOut(2000);
            });
        }
    });
});

$.fn.setSizeBody = function () {
    var winWidth = $(window).width();
    var winHeight = $(window).height();

    /*Pocation Preloading Resize*/
    $('.preload .preload-main').css({'top': (winHeight / 2) - ((winHeight / 2) / 3)});
    $('.preload').css({'width': $(document).width(), 'height': $(document).height()});

    /*loading set size body*/
    if (winHeight < 800) {
        $('body').css({height: 860});
    }

    /*windown set size body*/
    $(this).resize(function () {
        var winHeight = $(window).height();
        var winHeight = $(window).height();

        if (winHeight < 800) {
            $('body').css({height: 860});
        } else {
            $('body').css({height: '100%'});
        }
        /*Pocation Preloading Resize*/
        $('.preload .preload-main').css({'top': (winHeight / 2) - ((winHeight / 2) / 3)});
        $('.preload').css({'width': $(window).width(), 'height': $(document).height()});
    });
};