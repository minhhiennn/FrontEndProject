/* global designObject, iTailorObject, logs, publicObject, jacketObject, pantObject, vestObject, Base64 */

$(document).ready(function () {
    $('#menu-l :checkbox').prop('checked', false); /*re set all checkbox for design*/
    $('li.ListMenuMain').menuMain();
    $(".sub-menu-main li").EventsubMenuMain();
    $('.btn-step').buttonStep();
    $('.sub-menu-fabric li').EvetClickSubFabric();
    $('#menu-s-button,#menu-s-last-button-hole,#menu-s-slide,#menu-s-monogram,#menu-s-hand-top-stitching,#menu-l-list-lining').EventItem();
    $(':input[type="checkbox"],:input[type="radio"]').EventOption();
    $('.toggle-view').toggleFrontBack();
    $('#box-view-design li').EventToggleProduct();
    $('input.monogram-input').monogramKeyDown();
    $('.btnbackMeasurements').EventbuttonBackMeasurements();
    $('.checkbox-extra-pent').ExtraPant();

    if (pantObject.contrastPantTab == "Y") {
        $('#menu-l-checkbox-contrastPantTab').prop('checked', true);
    }

    /*==========================================================================
     * Evnt Click Sub Main STYLE (P)
     * =========================================================================*/
    $(".sub-menu-main").delegate(".style-product", "click", function () {
        var a = $(this).data('product');
        designObject.productMenu = a;

        $(this).parents('ul').find('ul').slideUp();
        $(this).parent().find('ul').slideDown();

        if (designObject.menuLast) {
            $(this).parent().find('ul').slideDown().find('li:last').click();
            designObject.menuLast = false;
        } else {
            $(this).parent().find('ul').slideDown().find('li:first').click();
        }

        /*-------------------------------------
         * CONDITION PRODUCT MENU CREATE LOG
         *-------------------------------------*/
        var logMenuProduct = designObject.log.productMenu;
        if (logMenuProduct !== a) {
            designObject.log.productMenu = a;
//            $('#main-3design li:visible img').hide();
            setTimeout(function () {
                callDesign();
            }, 500);
        }

    });
    /*==========================================================================
     * Evnt Click Sub Main STYLE (LI)
     * =========================================================================*/
    $(".sub-menu-style ul").delegate("li", "click", function () {
        var a = $(this).data('style');
        var b = 'sub-menu-active';
        $(this).parent().find('.' + b).removeClass(b);
        $(this).addClass(b);
        designObject.subMenuMain = a;
        callMenu();
    });

    /*preloading 3d main*/
    var degree = 1;
    setInterval(rotateDiv, 150);
    function rotateDiv() {
        if (degree >= 8) {
            degree = 1;
        }
        var position = (degree++ * -45) + 'px 0';
        var obj1 = $('#preloadingDesign');
        obj1.css({'background-position': position});
    }

    jacketlastHButton(jacketObject.sleeveBtnStyle);

    (function () {
        window.history.pushState(null, "", window.location.href);

        window.onpopstate = function () {
            if (designObject.menuMain === "menu-fabric") {
                window.history.back();
            } else {
                window.history.pushState(null, "", window.location.href);
                $("#btn-back-step").trigger("click");
            }
        };
    })();
});

function jacketlastHButton(sleeveStyle) {
    var lastHButtonEl = $("#menu-contrast-last-button-hole");

    if (lastHButtonEl.length > 0) {
        if (sleeveStyle === "Standard") {
            iTailorObject.lastHButtonOption = false;
            lastHButtonEl.hide();
        } else {
            iTailorObject.lastHButtonOption = true;
            lastHButtonEl.show();
        }
    }
}

$.fn.menuMain = function () {
    $(this).click(function () {
        var mv = validationMonogram();

        if (mv === false) {
            return false;
        }

        var a = $(this);
        var b = $('.sub-menu-main');
        var c = "menu-active";
        var e = "menu-measurement";
        var f = "menu-fabric";
        var g = $('.bg-sub-menu-main');
        var h = 'sub-menu-active';
        var j = 'menu-style';
        var subMenu = a.attr('id').replace('menu-', 'sub-menu-');
        if (!a.hasClass(c) || a.attr('id') === "menu-measurement") {
            a.parents('ul').find('.' + c).removeClass(c);
            b.find('ul').hide();
            b.find('.' + h).removeClass(h);
            b.find('.' + subMenu).show();
            g.css("width", 0);
            b.css("left", "-100%");
            b.stop(true, true).animate({'left': 0}, 1000);
            g.stop(true, true).animate({'width': "100%"}, 1000);

            designObject.menuMain = $(this).addClass(c).attr('id');
            if (designObject.menuMain === f) {
                var li = "#menu-fabric-" + iTailorObject.fabricGroup;
                b.find('.' + subMenu).find(li).click();
                designObject.menuLast = false;
            } else if (designObject.menuMain === j) {
                if (designObject.menuLast) {
                    b.find('.' + subMenu).find('p:last').click();
                } else {
                    b.find('.' + subMenu).find('p:first').click();
                }
                designObject.menuLast = false;
            } else if (designObject.menuMain === e) {
                designObject.subMenuMain = false; /* click menu measurement set value = false*/
                tabmeasurements();
                callMenu();
            } else {
                if (designObject.menuLast) {
                    b.find('.' + subMenu).find('li:visible:last').trigger('click');
                    designObject.menuLast = false;
                } else {
                    b.find('.' + subMenu).find('li:visible:first').trigger('click');
                }
            }
        }

        var mainMenu = a.attr('id').replace('menu-', '');
        if (mainMenu == 'fabric' && a.hasClass('menu-active')) {
            $('#logo-top').addClass('hidden');
            $('#banner-top').removeClass('hidden');
        } else {
            $('#logo-top').removeClass('hidden');
            $('#banner-top').addClass('hidden');
        }
    });
};
$.fn.EventsubMenuMain = function () {
    $(this).click(function () {
        var mv = validationMonogram();

        if (mv === false) {
            return false;
        }

        $("#menu-s,#menu-l").removeClass("lining-options");

        var _this = $(this);
        var _class = 'sub-menu-active';
        var id = $(this).attr('id');
        var menuMain = designObject.menuMain;

        if (!_this.hasClass(_class) && menuMain !== "menu-style") {
            designObject.subMenuMain = id;
            switch (menuMain) {
                case "menu-fabric":
                    categoryObj(id.replace('menu-fabric-', ''));
                    break;
                case "menu-color-contrast":
                    switch (id) {
                        case "menu-contrast-monogram":
                            callDesign();
                            logs.monogramActive = true;
                            break;
                        case "menu-contrast-jacket":
                            callDesign();
                            break;
                        case "menu-contrast-pant":
                            callDesign();
                            break;
                        case "menu-contrast-vest":
                            callDesign();
                            break;
                        case "menu-contrast-lining":
                            callDesign();
                            break;
                        case "menu-contrast-back-color":
                            break;
                        case "menu-contrast-button-hole":
                            break;
                        case "menu-contrast-hand-top-stitching":
                            callDesign();
                            break;
                    }
                    break;
                default :

                    break;
            }
            _this.parents('ul').find('.' + _class).removeClass(_class);
            _this.addClass(_class);
            tabmeasurements();
            callMenu();
        }
    });
};
$.fn.buttonStep = function () {
    $(this).click(function (e) {
        var mv = validationMonogram();

        if (mv === false) {
            return false;
        }

        var i = $(this).attr('id');
        var a = $('li.sub-menu-active');
        var b = $('li.menu-active');
        var c = 'menu-active';
        var d = 'sub-menu-active';

        if (i === 'btn-next-step') {
            if (a.next(':visible').is(':visible')) {
                if (designObject.menuMain === 'menu-fabric') {
                    b.removeClass(c).next().click().addClass(c);
                } else {
                    if (a.is('li:visible:last')) {
                        if (!b.is('li:last-child')) {
                            b.removeClass(c).next().click().addClass(c);
                        }
                    } else {
                        a.removeClass(d).next().click().addClass(d);
                    }
                }
            } else {
                if (designObject.menuMain === 'menu-style') {
                    if (!$('li.sub-menu-active').parents('li').is('li:last-child')) {
                        $('li.sub-menu-active').removeClass(d).parents('li').next().find('p').click().find('ul').slideDown().find('li:first').click();
                    } else {
                        b.removeClass(c).next().click().addClass(c);
                    }
                } else {
                    if (a.next().length > 0) {
                        if (!a.next().is('li:last-child')) {
                            a.nextAll(":visible").first().click();
                        } else {
                            b.removeClass(c).next().click().addClass(c);
                        }
                    } else {
                        b.removeClass(c).next().click().addClass(c);
                    }
                }
            }
        } else {
            if (designObject.menuMain === 'menu-fabric') {
                /*--------*/
            } else if (designObject.menuMain === 'menu-style') {
                if (!$('li.sub-menu-active').is('li:first-child')) {
                    $('li.sub-menu-active').removeClass(d).prev().addClass(d).click();
                } else {
                    if (!$('.sub-menu-style').find('ul:visible').is('.sub-menu-style ul:first')) {
                        designObject.menuLast = true;
                        $('li.sub-menu-active').removeClass(d).parents('li').prev().find('p').click().find('ul').slideDown().find('li:first').click();
                    } else {
                        b.removeClass(c).prev().click().addClass(c);
                    }
                }
            } else {
                if (a.is('li:first-child')) {
                    if (!b.is('li:first-child')) {
                        designObject.menuLast = true;
                        b.removeClass(c).prev().click().addClass(c);
                    }
                    a.removeClass(d).prev().click().addClass(d);
                } else {
                    if (a.prev(':visible').is(':visible')) {
                        a.removeClass(d).prev().click().addClass(d);
                    } else {
                        a.removeClass(d).prevAll(":visible").first().click().addClass(d);
                    }
                }
            }
        }
    });
};
$.fn.EvetClickSubFabric = function () {
    $(this).click(function () {
        designObject.fabricMenu = $(this).attr('id').replace('menu-fabric-', '');
    });
};

$.fn.EventItem = function () {
    $(this).delegate("li", "click", function () {
        if ($(this).find('.icon-check-item').length > 0) {
            /*break double call design*/
            return false;
        }

        var id = $(this).attr('id');
        var main = $(this).parents('ul').attr('data-main');
        var menuMain = designObject.menuMain;
        var pd = designObject.productMenu;

        if (menuMain === "menu-color-contrast" && main === "handTopStitchingColor") {
            if ($("#handTopStitching-Opt1").prop("checked")) {
                return false;
            }
        }

        switch (menuMain) {
            case "menu-fabric":
                fabricObj(id);
                $('.sub-menu-main').find('.sub-menu-active').removeClass('sub-menu-active');
                $('.sub-menu-main ul:first-child').find('#menu-fabric-' + iTailorObject.fabricGroup).addClass('sub-menu-active');
                if ((publicObject.project).toLowerCase() === "tuxedo") {
                    setMixFabric(id);
                }
                menuL(); /*toggle menu L fabric promotion and all*/
                break;
            case "menu-style":
                switch (pd) {
                    case "jacket":
                        styleJacket(id);
                        break;
                    case "pant":
                        stylePant(id);
                        break;
                    case "vest":
                        styleVest(id);
                        break;
                }
                break;
            case "menu-color-contrast":
                switch (main) {
                    case "contrast":
                        logs['contrastBefor'] = iTailorObject.contrast; /*logs*/
                        contrastObj(id);
                        break;
                    case "piping":
                        id = id.replace("Lining-", '');
                        pipingObj(id);
                        break;
                    case "lining":
                        liningObj(id);
                        break;
                    case "backcollar":
                        backcollarObj(id);
                        break;
                    case "button":
                        buttonObj(id);
                        break;
                    case "HButton":
                        HButtonObj(id);
                        break;
                    case "lastHButton":
                        lastHButtonObj(id);
                        break;
                    case "monogramHole":
                        monogramHoleObj(id);
                        break;
                    case "handTopStitchingColor":
                        handTopStitchingColorObj(id);
                        break;
                }
                break;
            default :/***/
                break;
        }
        toggleOptionMenuL();
        checkItemMenuS();
        callDesign();
    });

    function styleJacket(id) {
        var subMenu = designObject.subMenuMain;
        switch (subMenu) {
            case "button":
                jacketButton(id);
                var buttonArr = ["1Button", "2Button", "3Button", "4Button"];
                if (buttonArr.indexOf(id) > -1) {
                    jacketBottom('Curved');/*set df*/
                } else {
                    jacketBottom('Straight');/*set df*/
                }
                break;
            case "lapel":
                if (id === "CL4") {
                    $('#menu-l-checkbox-lapelBtnHole-1[value="No Button Hole"]').prop('checked', true);
                    jacketObject.lapelBtnHole = "No Button Hole";

                    $('.tag-laple-option').hide();

                    if (jacketObject.lapelUpper === "Y" || jacketObject.lapelLower === "Y") {
                        jacketObject.lapelUpper = "Y";
                        jacketObject.lapelLower = "Y";
                        $('#menu-l-checkbox-lapelLower,#menu-l-checkbox-lapelUpper').prop('checked', true);
                    } else {
                        jacketObject.lapelUpper = "N";
                        jacketObject.lapelLower = "N";
                        $('#menu-l-checkbox-lapelLower,#menu-l-checkbox-lapelUpper').prop('checked', false);
                    }
                } else {
                    $('.tag-laple-option').show();
                }
                jacketLapel(id);
                break;
            case "bottom":
                jacketBottom(id);
                break;
            case "pocket":
                jacketPocket(id);
                break;
            case "sleeve":
                var sleeve = jacketSleeve(id);

                jacketlastHButton(sleeve.style);

                break;
            case "back":
                jacketBack(id);
                break;
        }
    }
    function stylePant(id) {
        var subMenu = designObject.subMenuMain;
        switch (subMenu) {
            case "style":
                pantStyle(id);
                break;
            case "pleats":
                pantPleats(id);
                break;
            case "pocket":
                pantPocket(id);
                /*condition PoPcket -->Pleats*/
                if (pantObject.pocket === "ModernCurved" || pantObject.pocket === "Jeans") {
                    pantPleats("none");
                }
                break;
            case "backPocket":
                pantBackPocket(id);
                break;
            case "beltloops":
                pantBeltloops(id);
                break;
            case "cuff":
                pantCuff(id);
                break;
        }
    }
    function styleVest(id) {
        var subMenu = designObject.subMenuMain;
        switch (subMenu) {
            case "neckline":
                vestNeckLine(id);
                break;
            case "button":
                vestButton(id);
                break;
            case "pocket":
                vestPocket(id);
                break;
            case "bottom":
                vestBottom(id);
                break;
            case "back":
                vestBack(id);
                break;
        }
    }
};

$.fn.EventOption = function () {
    $("body").delegate('input[type="checkbox"], input[type="radio"]', "click", function (e) {
        var _type = $(this).attr('type');
        var _pd = $(this).attr('data-pd');
        var _id = $(this).attr('id').replace('menu-l-checkbox-', '');
        var _name = $(this).attr('name');
        var _val = $(this).val();
        var _status = '';
        var _strPkey = '';
        var _strVal = '';
        var _strPkeyNameStr = $(this).attr("data-nameStr");
        if (_type === "checkbox") {
            _strPkey = _id;
            if ($(this).is(':checked')) {
                _strVal = 'Y';
            } else {
                _strVal = 'N';
            }
        } else {
            _strPkey = _name;
            _strVal = _val;
        }
        switch (_pd) {
            case "jacket":
                jacketObject[_strPkey] = _strVal;

                if ((_strPkey + "Str") in jacketObject) {
                    jacketObject[_strPkey + "Str"] = (_strPkeyNameStr || "");
                }

                break;
            case "pant":
                pantObject[_strPkey] = _strVal;
                break;
            case "vest":
                vestObject[_strPkey] = _strVal;
                break;
            default :
                if ($("#handTopStitching-Opt1").prop("checked")) {
                    handTopStitchingColorObj("A00");
                } else {
                    var img = $('<img>').attr({'src': "../itailor-data/webroot/img/icon/checkmarkblue.png", 'class': 'icon-check-item'});

                    $("#menu-s-hand-top-stitching > ul").find(".icon-check-item").remove();
                    img.appendTo($("#menu-s-hand-top-stitching").find("#" + iTailorObject.handTopStitchingColor));

                    if (iTailorObject.handTopStitchingColor === "A00") {
                        handTopStitchingColorObj("A1");
                        img.appendTo($("#menu-s-hand-top-stitching").find("#A1"));
                    }
                }

                iTailorObject[_strPkey] = _strVal;

                if ((_strPkey + "Str") in iTailorObject) {
                    iTailorObject[_strPkey + "Str"] = (_strPkeyNameStr || "");
                }

                break;
        }

        if (_strPkey === "liningStyle") {
            liningStyleChk();
        }

        if (_strPkey === "lapelWidthOption") {
            $("#lapel-width-option-value").attr("src", "../images/Models/Suitweb/Suit/Menu/LapelWidth/" + jacketObject.lapel + "/" + _strVal + ".png");
        }

        if (jacketObject.lapel === "CL4" && (_id === "lapelUpper" || _id === "lapelLower")) {
            if (_strVal === "Y") {
                jacketObject.lapelUpper = "Y";
                jacketObject.lapelLower = "Y";
                $('#menu-l-checkbox-lapelLower,#menu-l-checkbox-lapelUpper').prop('checked', true);
            } else {
                jacketObject.lapelUpper = "N";
                jacketObject.lapelLower = "N";
                $('#menu-l-checkbox-lapelLower,#menu-l-checkbox-lapelUpper').prop('checked', false);
            }
        }
        if (_name !== "monogram" && _name !== "monogramFor" && designObject.menuMain !== "menu-measurement") {
            /*name == monogram stop event design*/
            callDesign();
        }

        /*Event Toggle Product Front Back*/
        if (_id === "contrastElbow" || _name === "backPocketOption" || _id === "contrastBackPocket" || _id === "contrastBelt") {
            toggleFrontBack("front");
        } else {
            toggleFrontBack("back");
        }
        monogramToggle();
        toggleOptionMenuL();
    });
};
$.fn.toggleFrontBack = function () {
    $(this).click(function () {
        toggleFrontBack();
    });
};
$.fn.EventToggleProduct = function () {
    $(this).click(function () {
        var pd = $(this).attr('data-viewProduct');
        if (designObject.productMenu !== pd) {
            $('#menu-style').click();
            $("[data-product='" + pd + "']").click();
            toggleFrontBack('back');
        }
    });
};
$.fn.monogramKeyDown = function () {
    $(this).keyup(function () {
        var val = $(this).val();
        var regex = /[\0\sa-zA-Z0-9. ]$/;
        if (val) {
            if (regex.test(val)) {
                iTailorObject.monogramTxt = val;
            }
        } else {
            iTailorObject.monogramTxt = '';
        }
        $(this).val(iTailorObject.monogramTxt);
        $('p.monogram-txt-str').text(iTailorObject.monogramTxt);
        encodeDesign();
    });
};
$.fn.EventbuttonBackMeasurements = function () {
    $(this).click(function () {
        designObject.subMenuMain = false;
        tabmeasurements();
        tab();
    });
};
$.fn.ExtraPant = function () {
    $(this).change(function () {
        setPrice();
    });
};
function setMixFabric(id) {
    var contrast, button;
    switch (id) {
        case "887-11":
            contrast = "Satin37";
            break;
        case "887-18":
            contrast = "Satin23";
            break;
        case "3799-13":
            contrast = "Satin44";
            break;
        case "3799-20":
            contrast = "Satin25";
            break;
        case "3799-22":
            contrast = "Satin30";
            break;
        case "887-22":
            contrast = "Satin30";
            break;
    }
    buttonObj(contrast);
    contrastObj(contrast);
}
function toggleViewProduct(pd) {
    var pd = '';

    /*view product main contrast*/
    if (designObject.menuMain === "menu-fabric") {
        if (designObject.project === 'pant') {
            pd = "pant";
        } else if (designObject.project === 'vest') {
            pd = "vest";
        } else {
            pd = "jacket";
        }
    } else if (designObject.menuMain === "menu-color-contrast") {
        switch (designObject.subMenuMain) {
            case "menu-contrast-pant":
                pd = "pant";
                break;
            case "menu-contrast-vest":
                pd = "vest";
                break;
            case "menu-contrast-lining":
                pd = "lining";
                liningStyleChk(true);
                break;
            case "menu-contrast-button-hole":
                if (designObject.project === "vest") {
                    pd = "vest";
                } else if (designObject.project === "pant") {
                    pd = "pant";
                } else {
                    pd = "jacket";
                }
                break;
            default :
                pd = "jacket";
                break;
        }
    }
    pd = pd ? pd : designObject.productMenu;
    $('.main-3design li').hide();

    /*Event Toggle Product Front Back*/
    var subMenuArr = ["back", "backPocket", "cuff", "menu-contrast-pant"];
    if (subMenuArr.indexOf(designObject.subMenuMain) > -1) {
        $('.main-3design #' + pd + "-back").show();
    } else {
        $('.main-3design #' + pd + "-front").show();
    }

}

var menuLLiningOptTimeout;

function callDesign() {
    setPrice();
    encodeDesign();
    preloadMainDesign();
    monogramToggle();
    var menuMain = designObject.menuMain;
    var productMenu = designObject.productMenu;
    var project = designObject.project;

    switch (menuMain) {
        case "menu-fabric":
            switch (project) {
                case "jacket":
                    _suit();
                    break;
                case "pant":
                    _pant();
                    break;
                case "vest":
                    _vest();
                    break;
                default :
                    _suit();
                    break;
            }
            break;
        case "menu-style":
            switch (productMenu) {
                case "jacket":
                    _suit();
                    break;
                case "pant":
                    _pant();
                    break;
                case "vest":
                    _vest();
                    break;
            }
            break;
        case "menu-color-contrast":
            switch (designObject.subMenuMain) {
                case "menu-contrast-jacket":
                    _suit();
                    break;
                case "menu-contrast-pant":
                    _pant();
                    break;
                case "menu-contrast-vest":
                    _vest();
                    break;
                case "menu-contrast-lining":
                    clearTimeout(menuLLiningOptTimeout);

                    menuLLiningOptTimeout = setTimeout(function () {
                        $("#menu-l").addClass("lining-options");
                    }, 100);

                    $("#menu-s").addClass("lining-options");
                    _lining();
                    _suit();
                    _vest();
                    break;
                case "menu-contrast-back-color":
                    menuLDesign();
                    break;
                case "menu-contrast-button-hole":
                    var project = (designObject.project).toLowerCase();
                    if (project === "vest") {
                        _vest();
                    } else {
                        _suit();
                    }
                    break;
                case "menu-contrast-last-button-hole":
                    _suit();
                    break;
                case "menu-contrast-monogram":
                    var existMonogramL = $('#sub-menu-l-contrast-monogram .image-menu-l');
                    if (existMonogramL.length === 0) {
                        _lining();
                    }

                    menuLDesign();
                    break;
                case "menu-contrast-hand-top-stitching":
                    _handTopStitchingColor();
                    _suit();
                    break;
            }
            break;
        default :
            /*****/
            break;
    }
    function _suit() {
        jacketDesign({view: 'front'}, function (path) {
            appendImage({pd: "jacket", path: path, view: "front"});
            jacketDesign({view: 'back'}, function (path) {
                appendImage({pd: "jacket", path: path, view: "back"});
                menuLDesign();

                $(".face-mask-preview img").attr("src", "../images/Models/Mask/Mask/" + iTailorObject.fabric + ".png");
            });
        });
    }
    function _pant() {
        pantDesign({view: 'front'}, function (path) {
            appendImage({pd: "pant", path: path, view: "front"});
            pantDesign({view: 'back'}, function (path) {
                appendImage({pd: "pant", path: path, view: "back"});
                menuLDesign();

                $(".face-mask-preview img").attr("src", "../images/Models/Mask/Mask/" + iTailorObject.fabric + ".png");
            });
        });
    }
    function _vest() {
        vestDesign({view: 'front'}, function (path) {
            appendImage({pd: "vest", path: path, view: "front"});
            vestDesign({view: 'back'}, function (path) {
                appendImage({pd: "vest", path: path, view: "back"});
                menuLDesign();

                $(".face-mask-preview img").attr("src", "../images/Models/Mask/Mask/" + iTailorObject.fabric + ".png");
            });
        });
    }
    function _lining() {
        liningDesign({view: 'front', jk: jacketObject}, function (path) {
            appendImage({pd: "lining", path: path, view: "front"});
            menuLDesign();
        });
    }
    function _handTopStitchingColor() {
        loadContrastHandTopStitching();
        menuLDesign();
    }
    function preloadMainDesign() {
        return false;
        var tag = $('#preloadingDesign');
        if (tag.is(':hidden')) {
            tag.stop(true, true).show();
        } else {
            tag.stop(true, true).fadeOut();
        }
    }
}
function preloadFadeout() {
    $('#preloadingDesign').stop(true, true).fadeOut();
}
function toggleOptionMenuL() {
    /* -------------- contrastVestLapel --------------*/
    var contrastVestLapel = $('#menu-l-checkbox-contrastVestLapel').parents('p');
    if (vestObject.neckline !== "VNeck") {
        contrastVestLapel.show();
    } else {
        contrastVestLapel.hide();
        vestObject.contrastVestLapel = 'N';
    }
    /* -------------- Pant Cuff Detail Event Show / Hide --------------*/
    var cuffDetail = $('#pant-cuffs-detail');
    if (pantObject.cuff === "None") {
        cuffDetail.hide();
    } else {
        cuffDetail.stop().fadeIn();
    }
    /* --------------  Jacket Contrast --> Option Chest Pocket Event Show / Hide --------------*/
    var contrastChest = $('#menu-l-checkbox-contrastChest').parents('p');
    if ((jacketObject.breastPocket).toUpperCase() === "Y") {
        contrastChest.hide();
    } else {
        contrastChest.show();
    }
    /* -------------- Timming Product Tuxedo Show / Hide --------------*/
    var tag = $('#menu-l-checkbox-contrastTrimming').parents('p');
    if (jacketObject.lapelUpper === "Y" || jacketObject.lapelLower === "Y") {
        tag.show();
    } else {
        tag.hide();
        jacketObject.contrastTrimming = 'N';
        tag.find('input').prop('checked', false);
    }
}
function monogramToggle() {
    var tag = $('.monogram-tab,.monogram-tab-main');
    var monogramTag = $('.monogram-slide-menuS');
    var monoSpcFor = $('p.monogram-spc-for');
    var status = iTailorObject.monogram;
    var left = 0;
    if (status === "Y") {
        tag.stop().fadeIn();
        left = "0";
    } else {
        tag.hide();
        left = "-500px";
    }

    setMonogramDefault();

    if (iTailorObject.monogramFor === "Y") {
        monoSpcFor.stop().fadeIn();
    } else {
        monoSpcFor.hide();
    }

    /*slide monogram in / out*/
    monogramTag.stop(true, true).delay(30).animate({
        'marginLeft': left
    }, 500);

    function setMonogramDefault() {
        var value = "";

        if (hasSaveDesign()) {
            value = iTailorObject.monogramTxt;

            $('input#menu-l-checkbox-monogramFor').prop("checked", false);

            if (iTailorObject.monogramFor === "Y") {
                $('input#menu-l-checkbox-monogramFor').prop("checked", true);
            }

            if (iTailorObject.monogram === "Y") {
                $('#menu-l-checkbox-monogram-2').prop("checked", true);
            } else {
                $('#menu-l-checkbox-monogram-1').prop("checked", true);
            }
        } else {
            if (!$('input#menu-l-checkbox-monogramFor').is(':checked')) {
                $('input#menu-l-checkbox-monogramFor').click();
            }
        }

        $('input.monogram-input').val(value);
        $('p.monogram-txt-str').text(value);

        monoSpcFor.show();
    }

    /*condition design.project=="vest"*/
    if (designObject.project === "vest") {
        $(".monogram-tab-main").hide();
    }
}
function validationMonogram(e) {
    /*Alert Enter Desired Monogram/Initials*/
    if (logs.monogramActive && (iTailorObject.monogram !== "N" && iTailorObject.monogramTxt.length <= 0)) {
        messages({file: "monogram", typeMessage: "suit3pcs"});

        return false;
    }
}
function CheckInputNumber(val) {
    var regex = /^-?\d+\.?\d*$/;
    if (val) {
        if (!regex.test(val)) {
            val = '';
        }
    }
    return val;
}
function checkItemMenuS() {
    $('[data-main]').each(function () {
        var tag = $(this).attr('data-main');
        appendItemChk(tag);
    });

    function appendItemChk(tag) {
        var id = '';

        liningStyleChk();

        switch (tag) {
            case "fabric":
                id = iTailorObject.fabric;
                break;
            case "button":
                if (designObject.productMenu === "jacket" && designObject.menuMain !== "menu-color-contrast") {
                    id = jacketObject.button;
                } else if (designObject.productMenu === "vest" && designObject.menuMain !== "menu-color-contrast") {
                    id = vestObject.button;
                } else {
                    /*contrast button*/
                    id = iTailorObject.buttonColor;
                }
                break;
            case "lapel":
                id = jacketObject.lapel;

                (id === "CL4") ? $("#lapel-width-option").hide() : $("#lapel-width-option").show();

                break;
            case "bottom":
                if (designObject.productMenu === "jacket") {
                    id = jacketObject.bottom;
                } else if (designObject.productMenu === "vest") {
                    id = vestObject.bottom;
                } else {
                    /***/
                }
                break;
            case "pocket":
                if (designObject.productMenu === "jacket") {
                    id = jacketObject.pocket;
                } else if (designObject.productMenu === "pant") {
                    id = pantObject.pocket;
                } else if (designObject.productMenu === "vest") {
                    id = vestObject.pocket;
                } else {
                    /**/
                }
                break;
            case "sleeve":
                id = jacketObject.sleeveBtn + '-' + jacketObject.sleeveBtnStyle;
                break;
            case "back":
                if (designObject.productMenu === "jacket") {
                    id = jacketObject.back;
                } else if (designObject.productMenu === "vest") {
                    id = vestObject.back;
                } else {
                    /**/
                }
                break;
            case "handTopStitchingColor":
                id = iTailorObject.handTopStitchingColor;
                break;
                /*======================*/
            case "style":
                id = pantObject.style;
                break;
            case "pleats":
                id = pantObject.pleats;
                break;
            case "backPocket":
                id = pantObject.backPocket;
                break;
            case "beltloops":
                id = pantObject.beltLoop;
                break;
            case "cuff":
                id = pantObject.cuff;
                break;
                /*======================*/
            case "neckline":
                id = vestObject.neckline;
                break;
                /*======================*/
            case "contrast":
                id = iTailorObject.contrast;
                break;
            case "lining":
                id = iTailorObject.lining;
                break;
            case "backcollar":
                id = iTailorObject.backcollar;
                break;
            case "HButton":
                id = iTailorObject.HButton;
                break;
            case "lastHButton":
                id = iTailorObject.lastHButton;
                break;
            case "monogramHole":
                id = iTailorObject.monogramHole;
                break;
            case "piping":
                id = "Lining-" + iTailorObject.piping;
                break;
        }

        if (id) {
            var main = $("ul[data-main='" + tag + "']:visible");

            if (tag === "lining") {
                main = $("ul[data-main='" + tag + "']");
            }

            var img = $('<img>').attr({'src': "../itailor-data/webroot/img/icon/checkmarkblue.png", 'class': 'icon-check-item'});
            var ele = main.find('#' + id);
            main.find('.icon-check-item').remove();
            img.appendTo(ele);
        }
    }
}
function encodeDesign() {
    var base64 = [];
    base64['iTailor'] = get_base64_encode(iTailorObject);
    base64['jacket'] = get_base64_encode(jacketObject);
    base64['pant'] = get_base64_encode(pantObject);
    base64['vest'] = get_base64_encode(vestObject);
    $('.base64').remove();
    for (var i in base64) {
        var frmBodySize = $('#frmBodySize');
        var frmStandardSize = $('#frmStandardSize');
        var input = $('<input>').attr({'value': base64[i], 'name': i + "Object", 'type': 'hidden', 'class': 'base64'});
        var input2 = $('<input>').attr({'value': base64[i], 'name': i + "Object", 'type': 'hidden', 'class': 'base64'});
        input.appendTo(frmBodySize);
        input2.appendTo(frmStandardSize);
    }
}
function setFabric(data) {
    var fabricAll = designObject.fabric;
    var menuCategory = designObject.fabricMenu;
    var menuFabricType = designObject.fabricType;
    var fabricGroup = iTailorObject.fabricGroup;
    if (menuCategory !== fabricGroup && menuFabricType !== "PINSTRIPES") {
        for (var i in fabricAll) {
            var categoryId = fabricAll[i]['CATEGORYID'];
            var fabricId = fabricAll[i]['ITEMID'];
            if (categoryId === menuCategory) {
                fabricObj(fabricId);
                /*condition call set design*/
                if (iTailorObject.fabric !== logs.fabricBefore) {
                    setTimeout(function () { //set delay call design slide not smooth
                        callDesign();
                    }, 700);
                }
                return true;
            }
        }
    }
}
function setPrice(data) {
    /*set new arra fabric*/
    if (data) {
        designObject.category = data.CATEGORY;
        designObject.sign = data.SUM.SIGN;
        designObject.priceProfile = data.PRICEPROFILE;
        
        publicObject.customer = data.PERSONAL;
        publicObject.sum = data.SUM;
        publicObject.sign = data.SUM.SIGN;

        setCategoryPrice();
        sizeCustomDetail();
    }

    fabricObj();
    extraPantObj(); /*get price extaPant*/
    var str = '';
    var sumExtra = '';
    var fabricPrice = parseFloat(iTailorObject.fabricPrice);
    var extraPant = parseFloat(designObject.extraPrice);
    var guaranteed = {USD: 90, GBP: 70, EUR: 80, JPY: 1000};

    /*CONDITION ADD MASK*/
    var faceMaskPrice = 0;

    Array.prototype.forEach.call(designObject.faceMask, function (data) {
        var f, t, p;

        f = window.parseInt(data.FROM_NUMBER);
        t = window.parseInt(data.TO_NUMBER);
        p = window.parseFloat(data.PRICE);

        if ((data.CURRENCY === designObject.curr) && ((iTailorObject.faceMaskQty >= f) && (iTailorObject.faceMaskQty <= t))) {
            //faceMaskPrice = p * iTailorObject.faceMaskQty;
            faceMaskPrice = p;

            return false;
        }
    });

    if (iTailorObject.faceMask === true) {
        fabricPrice += faceMaskPrice;
    }

    $('.face-mask-price').html((faceMaskPrice).toFixed(2) + " " + designObject.sign);
    /**/

    /*set srt and exta pant value*/
    $('form').each(function () {
        var tag = $(this).find('[name="EXTRAPANT"]').prop('checked');
        var tagExtraStr = $(this).find('.str-extra');
        var tagExtraPrice = $(this).find('.extra-price');
        var project = (publicObject.product).toLowerCase();
        if (tag) {
            sumExtra = fabricPrice + extraPant;
            if (project === "suit3pcs") {
                str = "3Piece Suit + 1 Extra Pant : ";
            } else if (project === "suit") {
                str = "1 Suit + 1 Extra Pant : ";
            }
        } else {
            sumExtra = fabricPrice;
            if (project === "suit3pcs") {
                str = "3Piece Suit : ";
            } else if (project === "suit") {
                str = "1 Suit : ";
            } else if (project === "tuxedo") {
                str = "1 Tuxdeo : ";
            }
        }
        tagExtraStr.html(str);
        tagExtraPrice.html(designObject.sign + ' ' + (sumExtra).toFixed(2));

    });

    /*price fabric*/
    var guaranteedNumber = iTailorObject.fabricRegular + parseFloat(guaranteed[designObject.curr]);
    $('.price').html(designObject.sign + ' ' + (fabricPrice).toFixed(2));
    $('.regular-price').html(designObject.sign + ' ' + guaranteedNumber);
    $(".layout-box-extra-pant .extra-pant-price").html(designObject.sign + ' ' + extraPant);
    setPriceMenuSFabric();
    encodeDesign();
}
function setCategoryPrice() {
    var arr = designObject.category;
    var sign = designObject.sign;
    $('#ul-fabric li').each(function (i) {
        var _this = $(this);

        var price = _this.find(".category-price");
        var discount = _this.find(".discount");

        if (arr[i]) {
            price.html(arr[i]['REGULAR'] + ' ' + sign);
            discount.html(arr[i]['PRICE'] + ' ' + sign);
        }
    });
}
function setPriceMenuSFabric() {
    /*function change price fabric promotion and signature event run login mober and call function set price*/
    $('.menu-s-fabric .fabric-price-menu-s').each(function () {
        var id = $(this).parent().attr('id');
        var objFabric = viewfabricAllObj(id);
        var priceProfile = $(this).data('price-profile');
        var price = (typeof priceProfile == 'undefined') ? objFabric['fabricPrice'] : getFabricPriceByProfile(priceProfile)['PRICE'];
        var sign = designObject.sign;
        
        $(this).html(price + " " + sign);
    });
}
function toggleFrontBack(option) {
    if (designObject.menuMain !== "menu-measurement") {
        var id = $('#main-3design li:visible').attr('id');
        var id = id.split("-");
        var pd = id[0];
        var view = id[1];

        if (option) {
            view = option;
        }
        $('.main-3design li').hide();
        $(".toggle-view").text(publicObject.languageObj[view + '-view']);
        view = (view === "front") ? "back" : "front";
        $('#' + pd + '-' + view).show();
    }
}
var get_base64_encode = function (string) {
    /*fucntion convert array javascript >> string >> base64*/
    var a = string;
    var arr = [];
    $.each(a, function (i, v) {
        var str = '"' + i + '":"' + v + '"';
        arr.push(str);
    });
    var en = Base64.encode('{' + arr + '}');
    return  en;
};

function liningStyleChk(beforeChange) {
    $("#menu-s-slide > ul").show();
    $("#menu-s > #title").css("opacity", 1);

    if (jacketObject.liningStyle === "Unlined") {
        $('#menu-s-slide > ul[data-main="lining"]').hide();
        $("#menu-s > #title").css("opacity", 0);

        if (beforeChange) {
            $("#menu-s-slide > ul").hide();
        }

        $("#container").addClass("set-lining-unlined");
    } else {
        $("#container").removeClass("set-lining-unlined");
    }

    if (["suit3pcs", "suit", "jacket"].indexOf(designObject.project) === -1) {
        $("#menu-s").parent().css("overflow", "hidden");
        $("#container").removeClass("set-lining-style");

        $(".lining-options .mix-menu-options").remove();
        $("#menu-s-slide > ul").show();
        $("#menu-s > #title").css("opacity", 1);
        $("#menu-s").addClass("lining-options-deprecated");

        jacketObject.liningStyle = "";
        jacketObject.liningStyleStr = "";
    } else {
        $("#menu-s").parent().css("overflow", "");
        $("#container").addClass("set-lining-style");
    }
}
