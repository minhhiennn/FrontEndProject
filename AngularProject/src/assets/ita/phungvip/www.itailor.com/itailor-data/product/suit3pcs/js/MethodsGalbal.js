
/*------------------------------------------------------------------------------
 * PROCESS GET STYLE GOBAL
 *------------------------------------------------------------------------------*/

var MethodsGalbal = {
    AppendImg: function (main, arr) {
        /* src | css | class | id */
        if (!main || !arr) {
            return false;
        }

        var tag = $("div");
        var random = "IMG" + Math.floor((Math.random() * 10000) + 1);
        var count = 0;
        var length = this._getLengthArr(arr);

        for (var i in arr) {
            var img = new Image();
            var data = arr[i];

            if (data['src'] === undefined) {
                return true;
            }

            img.src = data['src'];
            img.crossOrigin = "anonymous";

            if (typeof data['class'] !== 'undefined') {
                var _class = data['class'] + " ";
                $(img).attr({class: _class});
            }

            $(img).attr('data-imageLog', random).css({display: ''});
            $(img).appendTo(main);
            $(img).bind('load', function () {
                count++;

                if (count >= length) {
                    loadImg();
                }
            }).error(function () {
                count++;

                if (count >= length) {
                    loadImg();
                }

                $(this).remove();
            });

            function loadImg() {
                var mainEl, tag, product;

                mainEl = $(main);
                tag = mainEl.find('img:not([data-imageLog="' + random + '"])');
				product = mainEl.attr("id").toLowerCase();

                mainEl.find('[data-imageLog="' + random + '"]').stop(true, true).fadeIn(function () {
                    tag.stop(true, true).fadeOut(function () {
                        if (mainEl.closest(".main-3design").length > 0) {
                            mainEl.find("[data-imageLog]").last().css({display: ""}).addClass("prd-glow").siblings("[data-imageLog]").remove();
							
							if (product.indexOf("pant") > -1) {
								mainEl.find("[data-imageLog]").last().removeClass("prd-glow")
							}
                        } else {
                            tag.remove();
                            //mainEl.find('img:hidden').remove();
                        }
                    });
                });
            }
        }
    },
    _getLengthArr: function (arr) {
        var count = 0;

        for (var i in arr) {
            count++;
        }

        return count;
    }
};