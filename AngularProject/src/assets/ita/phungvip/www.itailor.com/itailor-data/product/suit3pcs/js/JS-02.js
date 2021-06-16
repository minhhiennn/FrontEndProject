/* global iTailorObject, designObject */

$(document).ready(function () {
    $('#menu-fabric-all').fabricAll();
    $('.zoom-fabric').zoomFabric();
    $('.face-mask-info').faceMaskInfo();
    $('#slide-vdo').slideVDO();
//    $('.btnAdd-to-cart,.bannerMenuL img').glowShadow({type: "box"});
//    $('#btn-next-step,.link-checkout').glowShadow({type: 'text'});
    $('img').error(function () {
        imageError();
    });
    /*==========================================================================
     * Event Menu Measurements
     *==========================================================================*/
    $('.img-link-size').click(function () {
        var id = $(this).attr('data-id');
        if ($('#menu').find('#' + id).hasClass('sub-menu-active')) {
            designObject.subMenuMain = id;
            tab();
            tabmeasurements();
        } else {
            $('#' + id).trigger('click');
        }
    });
    //
    $('#lapel-width-option').lapelOption();
    $('.lining-hover').liningHover();

    $('.model-view').click(function (e) {
        e.preventDefault();

        messages({file: 'fabric-model-view', typeMessage: 'suit3pcs', marginTop: '4.5%'});
    });

    $('.vdo-view').click(function (e) {
        e.preventDefault();

        messages({file: 'fabric-vdo-view', typeMessage: 'suit3pcs', marginTop: '4.5%'});
    });

    /*SET MASK*/
    $(".add-face-mask").on("change", function () {
        $(".add-face-mask").prop("checked", this.checked);

        if (iTailorObject.faceMaskQty === 0) {
            $(".face-mask-addon").find('input[name="face-mask-pack-body"]').first().prop("checked", true).trigger("change");
            $(".face-mask-addon").find('input[name="face-mask-pack-standard"]').first().prop("checked", true).trigger("change");
        } else {
            if (this.checked === false) {
                iTailorObject.faceMaskQty = 0;

                $(".face-mask-addon").find('input[name="face-mask-pack-body"]').prop("checked", false);
                $(".face-mask-addon").find('input[name="face-mask-pack-standard"]').prop("checked", false);
            }
        }

        iTailorObject.faceMask = this.checked;
        setPrice();
    });

    $('input[name="face-mask-pack-body"]').on("change", function () {
        var qty = window.parseInt($(this).val());

        if (window.isNaN(qty) === false) {
            $(".add-face-mask").prop("checked", true);
            $(".mask-select-box").removeClass("mask-selectd");

            $('input[name="face-mask-pack-standard"]').each(function () {
                var standardQty = window.parseInt($(this).val());

                if (standardQty === qty) {
                    $(this).prop("checked", true);

                    return false;
                }
            });

            iTailorObject.faceMask = true;
            iTailorObject.faceMaskQty = qty;
            setPrice();
        }
    });

    $('input[name="face-mask-pack-standard"]').on("change", function () {
        var qty = window.parseInt($(this).val());

        if (window.isNaN(qty) === false) {
            $(".add-face-mask").prop("checked", true);
            $(".mask-select-box").removeClass("mask-selectd");

            $('input[name="face-mask-pack-body"]').each(function () {
                var standardQty = window.parseInt($(this).val());

                if (standardQty === qty) {
                    $(this).prop("checked", true);

                    return false;
                }
            });

            iTailorObject.faceMask = true;
            iTailorObject.faceMaskQty = qty;
            setPrice();
        }
    });

    $(".mask-select-box").on("change", "select", function () {
        var instance = this;
        var qty = window.parseInt(this.value);

        if (window.isNaN(qty) === false) {
            $(".add-face-mask").prop("checked", true);

            $(".mask-select-box").addClass("mask-selectd").find("select").is(function () {
                var target = $(this);

                if ((target.is(instance) === false) && (window.parseInt(this.value) !== qty)) {
                    target.siblings(".boxList").find(".mCustomScrollbar .mCSB_container li").each(function () {
                        var el = $(this);
                        var val = window.parseInt(el.data("val"));

                        if (val === qty) {
                            el.trigger("click");

                            return false;
                        }
                    });
                }
            });

            $('input[name="face-mask-pack-body"]').prop("checked", false);
            $('input[name="face-mask-pack-standard"]').prop("checked", false);

            iTailorObject.faceMask = true;
            iTailorObject.faceMaskQty = qty;
            setPrice();
        }
    });
});
function callMenu() {
    tab();
    menuL();
    toggleViewProduct();
    toggleOptionMenuL();
    shiftTab();
    chkFabricWhite();
    if (designObject.subMenuMain && designObject.menuMain !== "menu-measurement") {
        $('#menu-s-slide').menuS();
    }
}
function tab() {
    var a = $('.tab-main'), b = $('#tab-measurement-box li'), c = $('.tab-measurement-detail'), d = $('#strGreatMeasurements');
    if (designObject.menuMain !== 'menu-measurement') {
        a.hide();
        $('#design-main').show();
    } else {
        a.hide();
        d.show();
        $('#tab-measurement').fadeIn();
        /*======================================================================
         * Condition Show Sub tab measurement
         * =====================================================================*/
        if (designObject.subMenuMain) {
            b.hide();
            $('.' + designObject.subMenuMain.replace('menu-', 'tab-')).stop().fadeIn();
        } else {
            b.hide();
            c.show();
        }
        if (designObject.subMenuMain === "menu-body-size" || designObject.subMenuMain === "menu-standard-size") {
            d.hide();
        }
    }
}
function shiftTab() {
    /*shiftTabSrt condition submenu == 	"menu-contrast-lining" */
    var titleLining = $('.str-title-lining');
    var ProductAndView = $('#str-product-dtl,#box-toggle-view');
    if (designObject.subMenuMain === "menu-contrast-lining") {
        if (titleLining.is(':hidden')) {
            ProductAndView.hide();
            titleLining.show();
        }
    } else {
        if (ProductAndView.is(':hidden')) {
            titleLining.hide();
            ProductAndView.show();
        }
    }
}
function menuL() {
    var ul = $('#menu-l ul');
    var menuMain = designObject.menuMain;
    var subMenu = designObject.subMenuMain;
    var pdMenu = designObject.productMenu;
    ul.hide();
    ul.find('li').hide();
    switch (menuMain) {
        case "menu-fabric":
            $('#menu-l-fabric').show().find('li').show();

            /*condtion fabric all or fabric promotion*/
            var tag = $('.sub-tab-fabric');
            tag.hide();
            var imageUrl = "../images/Models/SuitWeb/Suit/MenuL/" + iTailorObject.fabric + ".jpg";
            if ((iTailorObject.fabricType).toUpperCase() === designObject.categoeyPromotion) {
                tag.eq(0).show().css('background-image', 'url(' + imageUrl + ')');
            } else {
                var superId = iTailorObject.fabric.slice(0, 3);
                if (superId.toLowerCase() == '213') {
                    tag.find('.block-super').removeClass('hidden');
                }
                else {
                    tag.find('.block-super').addClass('hidden');
                }
                
                tag.eq(1).show();
            }

            var fabricModelView = $('.fabric-model-view');
            var imageUrlModel = "../images/models/suitweb/suit/fabric/photoshoot/" + iTailorObject.fabric + ".jpg";
            $.get(imageUrlModel, function () {
                //200
                fabricModelView.addClass('fabric-model-view-active');
            }).fail(function () {
                //404
                fabricModelView.removeClass('fabric-model-view-active');
            });

            var fabricVDOView = $('.fabric-vdo-view');
            var vdoUrlModel = "../images/VDO/" + iTailorObject.fabric + "/" + iTailorObject.fabric + ".mp4";
            $.get(vdoUrlModel, function () {
                //200
                if (vdoUrlModel.indexOf(iTailorObject.fabric) > -1) {
                    fabricVDOView.addClass('fabric-vdo-view-active');
                } else {
                    fabricVDOView.removeClass('fabric-vdo-view-active');
                }
            }).fail(function () {
                //404
                fabricVDOView.removeClass('fabric-vdo-view-active');
            });
            break;
        case "menu-style":
            $('#menu-l-style-' + pdMenu).show().find('#sub-menu-l-' + subMenu).show();//.fadeIn(1500);
            break;
        case "menu-measurement":
            break;
        default :
            $('#menu-l-contrast').show().find($(subMenu.replace('menu-', '#sub-menu-l-'))).show();//.fadeIn(1500);

            if (subMenu === "menu-contrast-lining") {
                $('#menu-l-list-lining').show();
                $('#menu-l-list-lining li').show();
            }
            break;
    }
}
function imageError() {
    $('img').each(function () {
        $(this).error(function () {
            $(this).attr('src', '../iTailor-data/webroot/img/missing.png');
        });
    });
}
function chkFabricWhite() {
    var arr = ["3799-2", "887-11", "2011-25"];
    if (designObject.subMenuMain === "menu-contrast-lining") {
        if (arr.indexOf(iTailorObject.fabric) >= 0) {
            messages({file: "lining", typeMessage: "suit3pcs"});
        }
    }
}
var slideAllFacbric = {
    'click': 0,
    'fabric': ''
};
$.fn.fabricAll = function () {
    $(this).click(function () {
        slideAllFacbric.click = 0;
        messages({file: "view-fabric-all", typeMessage: "suit3pcs"}, function () {
            createFabric();
            changeImageFabric();
            /*Evenr click button slide view all fabric*/
            $('.button-slide-all').click(function () {
                var id = $(this).attr('id');
                var slideLenth = $('.slide-fabric-all ul').length;
                if (id === "button-next-all") {
                    if ((slideLenth - 1) > slideAllFacbric.click) {
                        ++slideAllFacbric.click;
                    }
                } else {
                    if (slideAllFacbric.click > 0) {
                        --slideAllFacbric.click;
                    }
                }
                slideAnimate();
                $('#page-active-fabric-all').text(slideAllFacbric.click + 1);
            });
            var slide = $('.slide-fabric-all');
            function slideAnimate() {
                var slideWidth = parseInt($('.slide-fabric-all ul').width());
                slide.animate({
                    'marginLeft': ((slideAllFacbric.click) * slideWidth) * -1
                }, 700);
            }
            /*Event SELECT FABRIC INTO FABRIC VIEW ALl*/
            $('.slide-fabric-all li').click(function () {
                slideAllFacbric.fabric = id = $(this).attr('id');
                changeImageFabric(id);
            });

            /*Event Click choose Design View All*/
            $('.choose-fabric-all').click(function () {
                if (!slideAllFacbric.fabric) {
                    slideAllFacbric.fabric = iTailorObject.fabric;
                }
                iTailorObject.fabric = slideAllFacbric.fabric;
                fabricObj(); /*get value*/
                $('.closes').click();
                $('#menu-fabric-' + iTailorObject.fabricGroup).click();
                setTimeout(function () {
                    callDesign();
                }, 1000);
            });
            $('#button-close-all-fabric').click(function () {
                $('.closes').click();
                $('#menu-fabric-' + iTailorObject.fabricGroup).click();
            });
        });

        function changeImageFabric(fabric) {
            if (!fabric)
                fabric = iTailorObject.fabric;

            var faricArr = [];
            faricArr = viewfabricAllObj(fabric);

            /*change detail and img*/
            fabric = fabric + ".jpg";
            var srcLarge = "../images/Models/SuitWeb/Suit/Fabric/LL/" + fabric;
            var srcSmall = "../images/Models/SuitWeb/Suit/Fabric/s/" + fabric;
            $('.view-all #fabricLarge').attr({'src': srcLarge});
            $('.view-all #fabricSmall').attr({'src': srcSmall});
            $('.view-all #all-fabric-id').text(faricArr.fabric);
            $('.view-all #all-fabric-cagegory').text(faricArr.fabricGroupName);
            $('.view-all #all-fabric-name').text(faricArr.fabricName);
            $('.view-all #all-fabric-price').text(faricArr.fabricPrice);
            $('.view-all #fabric-poperty').text(faricArr.extraFabricStr);
            $('.view-all #fabricWeight').text(faricArr.fabricWeight + " G");
        }

        function createFabric() {
            var data = designObject.fabric;
            var main = $('.slide-fabric-all');
            var count = 0;
            $('#page-fabric-all').text(Math.ceil(data.length / 35) - 1);
            for (var i in data) {
                var arr = data[i];
                var id = arr['ITEMID'];
                var name = arr['ITEMNAME'];

                if (count <= 0) {
                    var tag = $("<ul>");
                }
                var li = $("<li>").attr({id: id, title: name + " No." + id});
                var img = $("<img>").attr({src: "../images/Models/SuitWeb/Suit/Fabric/S/" + id + ".jpg"});
                img.appendTo(li);
                li.appendTo(tag);
                count++;
                if (count > 35) {
                    count = 0;
                    tag.appendTo(main);
                }
            }
        }
    });
};

$.fn.zoomFabric = function () {
    $(this).click(function () {
        /*
         if ((iTailorObject.fabricType).toUpperCase() === designObject.categoeyPromotion) {
         messages({file: 'zoom-fabric-promotion', typeMessage: "suit3pcs"});
         } else {
         messages({file: "zoom-fabric", typeMessage: "suit3pcs"});
         }
         */
        messages({file: "zoom-fabric", typeMessage: "suit3pcs"}, null, function (status) {
            if (status) {
                $(".fnd-info").appendTo(".fnd-popup .popup-wp");
            } else {
                $(".fnd-info").appendTo("body");
            }
        });
    });
};

$.fn.faceMaskInfo = function () {
    $(this).click(function () {
        $(this).popupMaya({url: "../iTailor-data/product/suit3pcs/popup/face-mask-info.php", transparent: true, run: true, width: 1024, subEleHeight: "100%"});
    });
};

$.fn.slideVDO = function () {
    setInterval(function () {
        $('#slide-vdo img').show();
        $('#slide-vdo img:first').fadeOut(2000).delay(2000).appendTo($('#slide-vdo:last'));
    }, 4000);
    $(this).click(function () {
        messages({file: "video"});
    });
};

$.fn.lapelOption = function () {
    $(this).click(function () {
        var lapelWidthOptionCurrent = jacketObject.lapelWidthOption;

        $(this).popupMaya({url: "../iTailor-data/product/suit3pcs/option/lapel-width-option.php", run: true}, function (option, eleData) {
            eleData.find('[name="lapelWidthOption"]').each(function () {
                var value = $(this).val();

                $(this).siblings().find("img").attr("src", "../images/Models/Suitweb/Suit/MenuS/LapelWidth/" + jacketObject.lapel + "/" + value + ".jpg");
            });

            eleData.find("#lapel-width-option-main").attr("src", "../images/Models/Suitweb/Suit/Menu/LapelWidth/Main/Main.png");
            eleData.find("#lapel-width-option-value").attr("src", "../images/Models/Suitweb/Suit/Menu/LapelWidth/" + jacketObject.lapel + "/" + lapelWidthOptionCurrent + ".png");

            eleData.find("#lapel-width-option-" + lapelWidthOptionCurrent).prop("checked", "true");
            eleData.find(".btnClose:not(.btnDone)").click(function () {
                jacketObject.lapelWidthOption = lapelWidthOptionCurrent;
                jacketObject.lapelWidthOptionStr = lapelWidthOptionCurrent;
            });
        });
    });
};

$.fn.liningHover = function () {
    var timeOut;

    $(this).mouseenter(function () {
        var value, image, el;

        clearTimeout(timeOut);

        value = $(this).find("input").val();
        image = $("<img>").attr("src", "../images/Models/Suitweb/Suit/Menu/NewLining/" + value + ".png");

        if ($(".lining-hover-pop").length > 0) {
            $(".lining-hover-pop").empty().append(image);
        } else {
            el = $("<div>").addClass("lining-hover-pop").css({
                position: "absolute",
                zIndex: 1000,
                top: 90,
                left: 0,
                width: 400,
                height: 350,
                display: "none"
            }).append(image);

            $("#design-main").append(el);
        }
    }).mouseleave(function () {
        clearTimeout(timeOut);

        timeOut = setTimeout(function () {
            $(".lining-hover-pop").remove();
        }, 300);
    }).click(function () {
        clearTimeout(timeOut);
        $(".lining-hover-pop").remove();
    });
};
