$(document).ready(function () {
    $('.button-slide-menuS').EventClickSlideMenuS();
});
var slideSObject = {'arr': [], 'length': 0, 'pageAll': 0, 'pageActive': 0, 'statusButton': false, 'click': 0, 'showItem': 9, 'button': ".button-slide-menuS", 'root': "../images/Models/SuitWeb/", 'fabric': "", 'fabricImg': ""};

function loadContrastHandTopStitching() {
    var target = $("#menu-s-hand-top-stitching");

    if (["Lapel", "FullBody"].indexOf(iTailorObject.handTopStitching) > -1) {
        if (target.hasClass("menu-usage")) {
            target.show();

            return false;
        }

        processMenuS.call({main: "#menu-s-hand-top-stitching [data-main='handTopStitchingColor']", sty: "buttonHole"});
        processMenuS.animateSlide(target);
        target.addClass("menu-usage");
    } else {
        target.hide();
        target.removeClass("menu-usage");
    }
}

$.fn.menuS = function () {
    var menuS = $('#menu-s'), menuContrast = $('#menu-s-contrast'), menuMain = designObject.menuMain;
    $(slideSObject.button).hide();
    slideSObject.arr = [];
    slideSObject.click = 0;
    slideSObject.pageAll = 0;
    slideSObject.length = 0;
    slideSObject.fabric = iTailorObject.fabric;
    slideSObject.fabricImg = slideSObject.fabric + ".jpg";

    $('#menu-s-slide ul').Animation({transition: 0, translateX: "0px"});
    $('.page-of').text('').hide();
    $('.tab-menu-s').hide();
    menuContrast.hide();
    $('#menu-s-slide ul li').remove();

    var pdView = $("#main-3design li:visible").attr('id').replace('-front', '').replace('-back', '');
    var lang = publicObject.languageObj;
    switch (menuMain) {
        case "menu-fabric":
            loadFabric(function () {
                animateSlide($('#menu-s'));
            });
            $('#menu-s #menu-s-title').attr("data-lang", "choose-your-fabric").text(lang['choose-your-fabric']);
            break;
        case "menu-style":
            $('#menu-s #menu-s-title').attr("data-lang", "choose-" + pdView + '-' + designObject.subMenuMain).text(lang["choose-" + pdView + '-' + designObject.subMenuMain]);
            loadStyle();
            break;
        case "menu-color-contrast":
            $('#menu-s #menu-s-title').attr("data-lang", "choose-your-" + designObject.subMenuMain).text(lang["choose-your-" + designObject.subMenuMain]);
            loadContrast();
            break;
        default :
            /***/
            break;
    }
    function loadFabric(callback) {
        $('#menu-s-slide li').remove();
        pushLi(function () {
            /*loop append tag li to ul*/
            var length = slideSObject.length = slideSObject.arr.length;
            var itemShow = slideSObject.showItem = 9;
            slideSObject.pageAll = Math.ceil(length / itemShow);
            for (var i = 0; i < (slideSObject.showItem * 2); i++) {
                appendLi(i);
            }
            callback();
        });
        function pushLi(callback) {
            var fabric = designObject.fabric;
            var fabricMenu = designObject.fabricMenu;
            var _fabricType = (designObject.fabricType).toUpperCase();
            var countPromotion = 0;
            for (var i in fabric) {
                var arr = [], fabricType, fabricId = '', fabricName = '';
                var fabricType = (fabric[i]['TYPECATEGORY_STR']).toUpperCase();
                var fabricPromotion = (fabric[i]['FABRIC_PROMOTION']).toUpperCase();/*fabric promotion not fabric of the week*/

                var _type = "";

                if (_fabricType === "SOLID COLOR") {
                    if (fabricType === "SOLID COLOR" || fabricType === "PROMOTION" || fabricPromotion === "1") {
                        fabricId = fabric[i]['ITEMID'];
                    }
                } else if (_fabricType === fabricType) {
                    fabricId = fabric[i]['ITEMID'];
                }
                
                if (fabricId) {
                    arr['ITEMID'] = fabricId;
                    arr['ITEMNAME'] = fabric[i]['ITEMNAME'];
                    arr['FABRIC_TYPR_STR'] = fabric[i]['TYPECATEGORY_STR'];
                    arr['PRICE'] = fabric[i]['PRICE'];
                    arr['CATEGORYID'] = fabric[i]['CATEGORYID'];
                    arr['FABRICGROUP_NAME'] = fabric[i]['FABRICGROUP_NAME'];
                    arr['NEW_STATUS'] = fabric[i]['NEW_STATUS'];
                    arr['PRICEPROFILE_CODE'] = fabric[i]['PRICEPROFILE_CODE'];
                    if (fabricType === "PROMOTION") {
                        countPromotion++;
                        slideSObject.arr.unshift(arr);
                    } else if (fabricPromotion === "1") {
                        slideSObject.arr.splice(countPromotion, 0, arr);
                    } else {
                        slideSObject.arr.push(arr);
                    }
                }
            }
            callback();
        }
    }
    function loadStyle() {
        var pd = designObject.productMenu;
        var sty = designObject.subMenuMain;
        switch (pd) {
            case "jacket":
                var obj = _jacketObject[sty];
                jacketTag(sty, obj, function () {
                    animateSlide($('#menu-s'));
                });
                break;
            case "pant":
                var obj = _pantObject[sty];
                pantTag(sty, obj, function () {
                    animateSlide($('#menu-s'));
                });
                break;
            case "vest":
                var obj = _vestObject[sty];
                vestTag(sty, obj, function () {
                    animateSlide($('#menu-s'));
                });
                break;
        }
    }
    function loadContrast() {
        var menu = designObject.subMenuMain;
        switch (menu) {
            case "menu-contrast-lining" :
                processMenuS.call({main: "#menu-s-slide [data-main='lining']", sty: "lining"});
                processMenuS.animateSlide('#menu-s');
                break;
            case "menu-contrast-back-color" :
                processMenuS.call({main: "#menu-s-slide [data-main='backcollar']", sty: "backcollar"});
                processMenuS.animateSlide('#menu-s');
                break;
            case "menu-contrast-button-hole" :
                processMenuS.call({main: "#menu-s-button [data-main='button']", sty: "button"});
                processMenuS.call({main: "#menu-s-button [data-main='HButton']", sty: "buttonHole"});
                processMenuS.animateSlide('#menu-s-button');
                break;
            case "menu-contrast-last-button-hole" :
                processMenuS.call({main: "#menu-s-last-button-hole [data-main='lastHButton']", sty: "lastHButton"});
                processMenuS.animateSlide('#menu-s-last-button-hole');
                break;
            case "menu-contrast-monogram" :
                processMenuS.call({main: ".monogram-slide-menuS [data-main='monogramHole']", sty: "buttonHole"});
                processMenuS.animateSlide('#menu-s-monogram');
                break;
            case "menu-contrast-hand-top-stitching" :
                loadContrastHandTopStitching();

                break;
            default :
                processMenuS.call({main: "#menu-s-slide [data-main='contrast']", sty: "contrast"});
                processMenuS.animateSlide('#menu-s');
                break;
        }
    }
};
$.fn.EventClickSlideMenuS = function () {
    $(this).click(function () {
        var _this = $(this);
        var id = _this.attr('id');
        var _slideWidth = ($('#menu-s-slide li').width() + parseInt($('#menu-s-slide li').css('margin-left').replace('xp', ''))) * slideSObject.showItem;
        var tagSlide = $('#menu-s-slide ul');
        if (id === 'button-next') {
            if (slideSObject.click < (slideSObject.pageAll - 1)) {
                slideSObject.click++;
                var lastChild = $('#menu-s-slide li:last').index() + 1;
                if (lastChild < slideSObject.length) {
                    var m = $('#menu-s-slide ul');
                    for (var i = lastChild; i < (lastChild + slideSObject.showItem); i++) {
                        appendLi(i);
                    }
                }
            }
        } else {
            if (slideSObject.click > 0) {
                slideSObject.click--;
            }
        }
        tagSlide.Animation({transition: 1, translateX: ((_slideWidth * slideSObject.click) * -1) + "px"});
        checkItemMenuS();
        pageOf();
    });
};
function appendLi(i) {
    var cloudFront = "https://d2dffx7j4kisga.cloudfront.net/";
    var m = $('#menu-s-slide ul').removeAttr('class').addClass('menu-s-fabric').attr('data-main', 'fabric');
    var li = slideSObject.arr[i];
    if (li) {
        var statusNew = li['NEW_STATUS'];
        var pk = li['ITEMID'];
        var n = li['ITEMNAME'];
        var p = getCategoryPrice(li['CATEGORYID'])['fabricPrice'];
        var priceProfile = li['PRICEPROFILE_CODE'];
        p = (priceProfile != null && priceProfile.toLowerCase() == 'none') ? p : getFabricPriceByProfile(priceProfile);
        var fabricGrpName = li["FABRICGROUP_NAME"];
        var t = li['FABRIC_TYPR_STR'].toUpperCase();
        var li = $('<li>').attr({'id': pk, 'data-name': n});
        var src = cloudFront + "Suit/Fabric/S/" + pk + '.jpg';
        var img = $("<img>").attr({'src': src, 'title': n + ' No.' + pk});
        /*condition show price*/
        var price = "", strType = "";
        var statusTag = '';
        
        if (t === "PROMOTION") {
            price = $("<p>").html(p + " " + designObject.sign).attr('class', 'fabric-price-menu-s');
        }
        
        if (fabricGrpName) {
            if (fabricGrpName.toUpperCase() === "WINTER") {
                strType = $("<p>").html(fabricGrpName).attr('class', 'fabric-type-menu-s');
            }
        }
        
        if (priceProfile != null && priceProfile.toLowerCase() != 'none') {
            price = price = $('<p>').html(p['PRICE'] + ' ' + designObject.sign).attr('class', 'fabric-price-menu-s price-profile').data('price-profile', priceProfile);
        }
        
        if (statusNew == '1') {
            statusTag = '<p class="status-new" data-lang="status-new">New</p>';

        }
        li.append(img);
        li.append(price);
        li.append(strType);
        li.append(statusTag);
        li.appendTo(m);
    }
}
function animateSlide(object) {
    /*animate slide menu s*/
    var menu = object;
    var w = menu.width();

    /* eff ele iage load complete */
    $('#menu-s-slide img').hide();
    $('#menu-s-slide  li').each(function () {
        var li = $(this);
        li.find('img').load(function () {
            $(this).fadeIn(500);
        });
    });
    $(menu).css({'display': 'block'});
    $(menu).Animation({transition: 0, translateX: "-100%", opacity: 0});
    setTimeout(function () {
        $(menu).Animation({transition: 1, translateX: "-0%", opacity: 1});
    }, 100);

    pageOf();
    imageError();
    checkItemMenuS();
}
function pageOf() {
    /*Chang Text Page Of*/
    var txt = ' (' + (parseFloat(slideSObject.click) + 1) + ' of ' + slideSObject.pageAll + ")";
    if (slideSObject.pageAll > 1) {
        $('.page-of').text(txt).fadeIn();
    }

    /*show hide button slide*/
    if (slideSObject.length > slideSObject.showItem) {
        $(slideSObject.button).fadeIn();
    }
}
function jacketTag(style, arr, callback) {
    $('#menu-s-slide').removeAttr('class').addClass('pd-jacket');
    var m = $('#menu-s-slide ul').attr('data-main', style).removeAttr('class').addClass("set-vector");
    var r = slideSObject.root + "Suit/MenuS/";
    var v = slideSObject.root + "Suit/MenuSVector/";
    var fb = slideSObject.fabricImg;
    var btnColor = iTailorObject.buttonColor + '.png';
    var jk = jacketObject;

    for (i in arr) {
        var a = arr[i];
        var i = a['id'];
        var n = a['name'];
        var p = a['path'];
        var btn = a['button'];
        var sty = a['style'];

        if (style !== "sleeve") {
            var li = $('<li>').attr({'id': i, 'data-name': n, 'title': n});
        } else {
            var li = $('<li>').attr({'id': i + '-' + sty, 'data-name': n, 'title': n});
        }

        switch (style) {
            case "bottom":

                if (jk.button === "1Button" || jk.button === "2Button" || jk.button === "3Button" || jk.button === "4Button") {
                    li.append($("<img>").addClass("vector").attr('src', v + "Bottom/" + i + ".png"));

                    li.append($("<img>").attr('src', r + "Bottom/" + i + "/" + fb));

                    if (!jacketObject.firstLoad) {
                        jacketObject.firstLoad = true;
                        jacketBottom('Curved'); /*set df*/
                    }

                    if (hasSaveDesign()) {
                        jacketBottom(jacketObject.bottom);
                    }
                } else {
                    if (i === "Straight") {
                        li.append($("<img>").addClass("vector").attr('src', v + "Bottom/" + i + ".png"));

                        li.append($("<img>").attr('src', r + "Bottom/" + i + "/" + fb));
                        jacketBottom('Straight'); /*set df*/
                    }
                }

                break;
            case "pocket":
                li.append($("<img>").addClass("vector").attr('src', v + "pocket/" + i + ".png"));

                li.append($("<img>").attr('src', r + "pocket/" + i + "/" + fb));
                break;
            case "back":
                li.append($("<img>").addClass("vector").attr('src', v + "back/" + i + ".png"));

                li.append($("<img>").attr('src', r + "back/" + i + "/" + fb));
                break;
            case "lapel":
                li.append($("<img>").addClass("vector").attr('src', v + "lapel/" + i + ".png"));

                li.append($("<img>").attr('src', r + "lapel/" + i + "/" + fb));
                break;
            case "button":
                li.append($("<img>").addClass("vector").attr('src', v + "Style/" + i + ".png"));

                li.append($("<img>").attr('src', r + "style/" + btn + "/" + fb));
                li.append($("<img>").attr('src', r + "ButtonStyle/" + i + "/" + btnColor));
                break;
            case "sleeve":
                li.append($("<img>").addClass("vector").attr('src', v + "ButtonSleeve/" + i + '/' + sty + '.png'));

                li.append($("<img>").attr('src', r + "sleeve/" + fb));
                li.append($("<img>").attr('src', r + "ButtonSleeve/" + i + '/' + sty + '/' + btnColor));
                break;
        }
        slideSObject.arr.push(li);
    }
    for (var i = 0; i < (slideSObject.showItem * 2); i++) {
        var li = slideSObject.arr[i];
        if (li) {

            if ("popular" in arr[i]) {
                li.append('<span class="marquee"><span>' + arr[i]["popular"] + '</span></span>');
            }

            li.appendTo(m);
        }
    }
    callback();
}
function pantTag(style, arr, callback) {
    $('#menu-s-slide').removeAttr('class').addClass('pd-pant');
    var m = $('#menu-s-slide ul').attr('data-main', style).removeAttr('class').addClass("set-vector");
    var r = slideSObject.root + "Pant/MenuS/";
    var v = slideSObject.root + "Pant/MenuSVector/";
    var fb = slideSObject.fabricImg;
    for (i in arr) {
        var a = arr[i];
        var i = a['id'];
        var n = a['name'];
        var p = a['path'];
        var sty = a['style'];
        var li = $('<li>').attr({'id': i, 'data-name': n, 'title': n});
        switch (style) {
            case "pleats":
                if (pantObject.pocket === "ModernCurved" || pantObject.pocket === "Jeans") {
                    if (i === 'none') {
                        li.append($("<img>").addClass("vector").attr('src', v + style + "/" + i + ".png"));

                        li.append($("<img>").attr('src', r + style + "/" + i + "/" + fb));
                    }
                } else {
                    if (i !== "BoxPleats") {
                        if (i === "NoPleats") {
                            li.append($("<img>").addClass("vector").attr('src', v + "Pleats/None.png"));

                            li.append($("<img>").attr('src', r + "Pleats/None/" + fb));
                        } else {
                            li.append($("<img>").addClass("vector").attr('src', v + style + "/" + i + ".png"));

                            li.append($("<img>").attr('src', r + "Pleats/None/" + fb));
                            li.append($("<img>").attr('src', r + style + "/" + i + ".png"));
                        }


                    } else {
                        li.append($("<img>").addClass("vector").attr('src', v + style + "/" + i + ".png"));

                        li.append($("<img>").attr('src', r + style + "/" + i + "/" + fb));
                    }
                }
                break;
            case "pocket":
                if (pantObject.pleats !== "NoPleats" && (i === "ModernCurved" || i === "Jeans")) {
                    /** 
                     */
                } else {
                    li.append($("<img>").addClass("vector").attr('src', v + style + "/" + i + ".png"));

                    li.append($("<img>").attr('src', r + style + "/" + i + "/" + fb));
                }
                break;
            default :
                li.append($("<img>").addClass("vector").attr('src', v + style + "/" + i + ".png"));

                li.append($("<img>").attr('src', r + style + "/" + i + "/" + fb));
                break;
        }
        if (li.find('img').length > 0) {
            slideSObject.arr.push(li);
        }
    }
    for (var i = 0; i < (slideSObject.showItem * 2); i++) {
        var li = slideSObject.arr[i];
        if (li) {
            if ("popular" in arr[i]) {
                li.append('<span class="marquee"><span>' + arr[i]["popular"] + '</span></span>');
            }

            li.appendTo(m);
        }
    }
    callback();
}
function vestTag(style, arr, callback) {
    $('#menu-s-slide').removeAttr('class').addClass('pd-vest');
    var m = $('#menu-s-slide ul').attr('data-main', style).removeAttr('class').addClass("set-vector");
    var r = slideSObject.root + "Vest/MenuS/";
    var v = slideSObject.root + "Vest/MenuSVector/";
    var fb = slideSObject.fabricImg;
    var btnColor = iTailorObject.buttonColor + '.png';
    for (i in arr) {
        var a = arr[i];
        var i = a['id'];
        var n = a['name'];
        var p = a['path'];
        var sty = a['style'];
        var li = $('<li>').attr({'id': i, 'data-name': n, 'title': n});

        if (style === "button") {
            li.append($("<img>").addClass("vector").attr('src', v + "/FrontButton/" + i + ".png"));
        } else {
            li.append($("<img>").addClass("vector").attr('src', v + "/" + style + "/" + i + ".png"));
        }

        li.append($("<img>").attr('src', r + "/" + style + "/" + i + "/" + fb));

        if (style === "button") {
            li.append($("<img>").attr('src', r + "FrontButton/" + i + "/" + btnColor));
        }

        slideSObject.arr.push(li);
    }
    for (var i = 0; i < (slideSObject.showItem * 2); i++) {
        var li = slideSObject.arr[i];
        if (li) {
            if ("popular" in arr[i]) {
                li.append('<span class="marquee"><span>' + arr[i]["popular"] + '</span></span>');
            }

            li.appendTo(m);
        }
    }
    callback();
}
function _loadContrast(sty, arr, callback) {
    var m = $('#menu-s-slide ul').removeAttr('class').addClass('contrast').attr('data-main', sty);
    if (arr) {
        for (var i in arr) {
            var a = arr[i];
            var pk = a['ITEMID'];
            var n = a['ITEMNAME'];
            var li = $('<li>').attr({'id': pk, 'data-name': n});
            var src = '';
            if (sty === "lining") {
                src = "../images/Models/SuitWeb/Suit/Fabric/Lining/" + pk + '.jpg';
            } else if (sty === "backcollar") {
                src = "../images/Models/SuitWeb/Suit/Fabric/Sakarad/" + pk + '.jpg';
            } else {
                src = "../images/Models/SuitWeb/Suit/Fabric/SS/" + pk + '.jpg';
            }
            var img = $("<img>").attr({'src': src, 'title': n + ' No.' + pk});
            li.append(img);
            li.appendTo(m);
        }
        callback();
    }
}

var processMenuS = {
    defaults: {
        buttonColor: [],
        buttonHole: [],
        backCollar: [],
        lining: [],
        contrast: [],
        root: "../images/",
        cloudFront: "https://d2dffx7j4kisga.cloudfront.net/",
        sty: "",
        main: ""
    },
    set: function () {
        this.defaults.buttonColor = _jacketObject.buttonColor;
        this.defaults.buttonHole = _jacketObject.HButton;
        this.defaults.backCollar = designObject.backcollar;
        this.defaults.lining = designObject.lining;
        this.defaults.contrast = designObject.contrast;
    },
    call: function (option) {
        this.set();
        this.defaults = option = $.extend(this.defaults, option);
        this.create.condition(this);
    },
    create: {
        condition: function (self) {
            var defaults = self.defaults;
            var sty = defaults.sty;
            switch (sty) {
                case "button":
                    var data = defaults.buttonColor;
                    this.createList(data, "Models/SuitWeb/Suit/MenuS/Button/");
                    break;
                case "buttonHole":
                    var data = defaults.buttonHole;
                    this.createList(data, "Web/ThreadColor/");
                    break;
                case "lastHButton":
                    var data = defaults.buttonHole.slice();

                    data.unshift({
                        id: "None",
                        name: "None"
                    });

                    this.createList(data, "Web/ThreadColor/");
                    break;
                case "backcollar":
                    var data = this.converArr(defaults.backCollar);
                    this.createList2(data, "Suit/Fabric/Sakarad/", ".jpg");
                    break;
                case "lining":
                    var data = this.converArr(defaults.lining);
                    this.createList2(data, "Suit/Fabric/Lining/", ".jpg");
                    break;
                case "contrast":
                    var data = this.converArr(defaults.contrast);
                    this.createList2(data, "Suit/Fabric/SS/", ".jpg");
                    break;
            }
        },
        createList: function (data, _root, type) {
            var defaults = processMenuS.defaults;
            var main = defaults.main;
            var sty = defaults.sty;
            var r = defaults.root + _root;
            var length = $(main).find('li').length;

            if (length <= 0) {
                $('#menu-s-slide ul').removeAttr('class').addClass('contrast').attr('data-main', sty);
                $("#title").attr('data-main', sty);

                for (var i in data) {
                    var arr = data[i];
                    var id = arr['id'];
                    var name = arr['name'];
                    var li = $('<li>').attr({id: id, title: name});
                    var img = [];
                    img[0] = ({src: r + id + (type ? type : ".png")});
                    li.appendTo(main);
                    MethodsGalbal.AppendImg(li, img);
                }
            }

        },
        createList2: function (data, _root, type) {
            var defaults = processMenuS.defaults;
            var main = defaults.main;
            var sty = defaults.sty;
            var r = defaults.cloudFront + _root;
            var length = $(main).find('li').length;

            if (length <= 0) {
                $('#menu-s-slide ul').removeAttr('class').addClass('contrast').attr('data-main', sty);
                $("#title").attr('data-main', sty);

                for (var i in data) {
                    var arr = data[i];
                    var id = arr['id'];
                    var name = arr['name'];
                    var li = $('<li>').attr({id: id, title: name});
                    var img = [];
                    img[0] = ({src: r + id + (type ? type : ".png")});
                    li.appendTo(main);
                    MethodsGalbal.AppendImg(li, img);
                }
            }

        },
        converArr: function (data) {
            if (data) {
                var _return = [];
                var count = 0;
                for (var i in data) {
                    var object = [];
                    object['id'] = data[i]['ID'];
                    object['name'] = data[i]['NAME'];
                    _return.push(object);
                }
                return _return;
            }
        }
    },
    complete: function () {
        pageOf();
        imageError();
        checkItemMenuS();
    },
    animateSlide: function (main) {
        var w = $(main).width();
        $(main).css({'display': 'block'}).siblings().removeClass("menu-usage");
        $(main).Animation({transition: 0, translateX: "-100%", opacity: 0});
        setTimeout(function () {
            $(main).Animation({transition: 1, translateX: "-0%", opacity: 1});
        }, 100);
        setTimeout(function () {
            processMenuS.complete();
        }, 500);
    }
};