function menuLDesign() {
    menuLDesigns.call();
}
var menuLDesigns = {
    defaults: {
        it: [], jk: [], pt: [], vt: [],
        jkFront: "", jkBack: "", ptFront: "", ptBack: "", vtFront: "", vtBack: "", lining: "",
        pathJK: "../images/Models/SuitWeb/Suit/",
        pathPT: "../images/Models/SuitWeb/Pant/",
        imgClass: "image-menu-l",
        menuMain: "",
        subMenuMenu: "",
        productMenu: "",
        pipingObject: [],
        root: "../images/",
        cloudFront: "https://d2dffx7j4kisga.cloudfront.net/",
        log: {
            fabric: "",
            sleevebtn: "",
            sleeveBtnStyle: "",
            HButton: "",
            buttonColor: "",
            backcollar: "",
            contrast: ""
        }
    },
    set: function () {
        this.defaults.it = iTailorObject;
        this.defaults.jk = jacketObject;
        this.defaults.pt = pantObject;
        this.defaults.vt = vestObject;
        this.defaults.pipingObject = designObject.piping;
        this.defaults.jkFront = $('.main-3design #jacket-front img:last');
        this.defaults.jkBack = $('.main-3design #jacket-back img:last');
        this.defaults.ptFront = $('.main-3design #pant-front img:last');
        this.defaults.ptBack = $('.main-3design #pant-back img:last');
        this.defaults.vtFront = $('.main-3design #vest-front img:last');
        this.defaults.vtBack = $('.main-3design #vest-back img:last');
        this.defaults.lining = $('.main-3design #lining-front img:last');

        this.defaults.menuMain = designObject.menuMain;
        this.defaults.subMenuMenu = designObject.subMenuMain.replace("menu-contrast-", "");
        this.defaults.productMenu = designObject.productMenu;
    },
    call: function () {
        var self = this;
        self.set();
        var defaults = this.defaults;
        var menuMain = defaults.menuMain;
        var subMenuMenu = defaults.subMenuMenu;
        var menuProduct = defaults.productMenu;

        if (menuMain === "menu-fabric") {
            this.Fabric();

            switch (menuProduct) {
                case "pant":
                    self.Pant();
                    break;
                case "vest":
                    self.Vest();
                    break;
                default :
                    self.Jacket();
                    break;
            }
        } else if (menuMain === "menu-color-contrast") {

        } else {
            switch (menuProduct) {
                case "pant":
                    self.Pant();
                    break;
                case "vest":
                    self.Vest();
                    break;
                default :
                    self.Jacket();
                    break;
            }
        }
        self.createPiping();
        self.Contrast();
        self.sleeveButton();
        self.Monogram();
    },
    Jacket: function () {
        var self = this;
        var defaults = self.defaults;
        var pathJK = defaults.pathJK;
        var it = defaults.it;
        var jk = defaults.jk;
        var arrFront = [], arrBack = [];
        var jkFront = defaults.jkFront;
        var jkBack = defaults.jkBack;
        var imgClass = defaults.imgClass;

        //        $('#menu-l-style-jacket .image-menu-l').remove();
        arrFront[0] = ({src: jkFront.attr('src'), class: imgClass});
        arrBack[0] = ({src: jkBack.attr('src'), class: imgClass});

        MethodsGalbal.AppendImg('#menu-l-style-jacket #sub-menu-l-button', arrFront);
        MethodsGalbal.AppendImg('#menu-l-style-jacket #sub-menu-l-lapel', arrFront);
        MethodsGalbal.AppendImg('#menu-l-style-jacket #sub-menu-l-bottom', arrFront);
        MethodsGalbal.AppendImg('#menu-l-style-jacket #sub-menu-l-pocket', arrFront);
        MethodsGalbal.AppendImg('#menu-l-style-jacket #sub-menu-l-back', arrBack);

        /*Detail Menu L*/
        var main = $('#menu-l-style-jacket');
        main.find('#jk-button-str').text(jk.buttonStr);
        main.find('#jk-button-model').text(jk.buttonModel);
        main.find('#jk-lapel-srt').text(jk.lapelStr);
        main.find('#jk-laple-model').text(jk.lapelModel);
        main.find('#jk-buttom-str').text(jk.bottomStr);
        main.find('#jk-pocket-str').text(jk.pocketStr);
        main.find('#jk-sleeve-str').text(jk.sleeveBtnStr);
        main.find('#jk-sleeve-model').text(jk.sleeveBtnModel);
        main.find('#jk-back-str').text(jk.backStr);
        main.find('#jk-back-model').text(jk.backModel);
    },
    Pant: function () {
        var self = this;
        var defaults = self.defaults;
        var it = defaults.it;
        var pt = defaults.pt;
        var pathPT = defaults.pathPT;
        var imgClass = defaults.imgClass;
        var ptBack = defaults.ptBack;
        var frontArr = [], backArr = [];

        var fb = it.fabric + ".png";
        var Btn = it.buttonColor + ".png";
        var HBtn = it.HButton + ".png";
        var lining = it.lining + ".png";
        var r = pathPT + "MainBody/";
        var ct = it.contrast + ".png";

        //$('#menu-l-style-pant li img').remove();

        var arr = [];
        arr['main'] = ({src: pathPT + "Menu/Style/" + pt.style + "/" + fb});
        arr['edge'] = ({src: pathPT + "Menu/Style/EdgeTrousers/" + pt.waisband + "/" + fb});
        arr['beltLoops'] = ({src: pathPT + "Menu/Style/BeltLoops/" + pt.beltLoop + "/" + ((pt.contrastBelt === "N") ? fb : ct)});
        arr['pocket'] = ({src: pathPT + "Menu/Style/Pocket/" + pt.pocket + "/" + fb});
        arr['button'] = ({src: pathPT + "Menu/Button/Style/" + it.buttonColor + ".png"});
        if (pt.pocket === "None") {
            delete(arr['pocket']);
        }

        if (pt.beltLoop === "None") {
            delete(arr['beltLoops']);
        }
        if (pt.waisband === "Normal") {
            delete arr['button'];
        }

        MethodsGalbal.AppendImg('#menu-l-style-pant #sub-menu-l-style', arr);

        /*----------------------------------------------------
         * Load Image menu sub-menu-l-pleats *****
         * ---------------------------------------------------*/
        var arrFront = [];
        arrFront['main'] = ({src: pathPT + "Menu/Front/" + fb});
        arrFront['Pleats'] = ({src: pathPT + "Menu/Pleats/" + ((pt.pleats === "BoxPleats") ? "BoxPleats/" + fb : pt.pleats + ".png")});
        arrFront['Pocket'] = ({src: pathPT + "Menu/Pocket/" + pt.pocket + "/" + fb});
        arrFront['Edge'] = ({src: pathPT + "Menu/EdgeTrousers/" + pt.waisband + "/" + fb});
        arrFront['BeltLoops'] = ({src: pathPT + "Menu/BeltLoops/" + pt.beltLoop + "/" + fb});
        arrFront['Button'] = ({src: pathPT + "Menu/Button/EdgeTrousers/" + it.buttonColor + ".png"});
        arrFront['ButtonLoop'] = ({src: pathPT + "Menu/Button/BeltLoops/ButtonSideAdjusters/" + it.buttonColor + ".png"});

        if (pt.pocket === "None") {
            delete(arr['pocket']);
        }

        if (pt.pleats === "NoPleats") {
            delete(arrFront['Pleats']);
        }

        if (pt.contrastBelt === "Y") {
            arrFront['BeltLoops'] = ({src: pathPT + "Menu/BeltLoops/" + pt.beltLoop + "/" + ct});
        }

        if (pt.beltLoop === "None") {
            delete(arrFront['BeltLoops']);
        }

        if (pt.waisband === "Normal") {
            delete arrFront['Button'];
        }
        if (pt.beltLoop !== "ButtonSideAdjusters") {
            delete arrFront['ButtonLoop'];
        }

        MethodsGalbal.AppendImg('#menu-l-style-pant #sub-menu-l-pleats', arrFront);
        MethodsGalbal.AppendImg('#menu-l-style-pant #sub-menu-l-pocket', arrFront);
        MethodsGalbal.AppendImg('#menu-l-style-pant #sub-menu-l-beltloops', arrFront);

        /*-----------------------------------------------------
         * Load Image Cuff sub-menu-l-cuff *****
         * ----------------------------------------------------*/
        var arrCuff = [];
        arrCuff['main'] = ({src: pathPT + "Menu/Cuff/Main/" + fb});
        arrCuff['bootCuff'] = ({src: pathPT + "Menu/Cuff/Cuff/BootCut/" + fb});
        arrCuff['tab'] = ({src: pathPT + "Menu/Cuff/Cuff/" + pt.cuff + "/" + fb});
        arrCuff['button'] = ({src: pathPT + "Menu/Button/Cuff/" + pt.cuff + "/" + it.buttonColor + ".png"});

        if (pt.cuff === "Cuff") {
            delete arrCuff['button'];
            delete arrCuff['tab'];
        }
        if (pt.cuff === "None") {
            delete arrCuff['tab'];
            delete arrCuff['button'];
            delete arrCuff['bootCuff'];
        }
        MethodsGalbal.AppendImg('#menu-l-style-pant #sub-menu-l-cuff', arrCuff);

        var arr = [];
        arr['backSrc'] = ({src: ptBack.attr('src'), class: imgClass});
        MethodsGalbal.AppendImg('#menu-l-style-pant #sub-menu-l-backPocket', arr);

        /*Detail Menu L*/
        var main = $('#menu-l-style-pant');
        main.find('#pt-style-str').text(pt.styleSrt);
        main.find('#pt-style-model').text(pt.styleModel);
        main.find('#pt-pleat-str').text(pt.pleatStr);
        main.find('#pt-pleat-model').text(pt.pleatModel);
        main.find('#pt-pocket-str').text(pt.pocketStr);
        main.find('#pt-pocket-model').text(pt.pocketModel);
        main.find('#pt-backPocket-model').text(pt.backPocketStr);
        main.find('#pt-beltLoop-str').text(pt.beltLoopStr);
        main.find('#pt-cuff-str').text(pt.cuffStr);
    },
    Vest: function () {
        var self = this;
        var defaults = self.defaults;
        var imgClass = defaults.imgClass;
        var vt = defaults.vt;
        var vtFront = defaults.vtFront;
        var vtBack = defaults.vtBack;
        var arrFront = [], arrBack = [];

        arrFront[0] = ({src: vtFront.attr('src'), class: imgClass});
        arrBack[0] = ({src: vtBack.attr('src'), class: imgClass});

        //$('#menu-l-style-vest .image-menu-l').remove();
        MethodsGalbal.AppendImg('#menu-l-style-vest #sub-menu-l-neckline', arrFront);
        MethodsGalbal.AppendImg('#menu-l-style-vest #sub-menu-l-button', arrFront);
        MethodsGalbal.AppendImg('#menu-l-style-vest #sub-menu-l-pocket', arrFront);
        MethodsGalbal.AppendImg('#menu-l-style-vest #sub-menu-l-bottom', arrFront);
        MethodsGalbal.AppendImg('#menu-l-style-vest #sub-menu-l-back', arrBack);

        /*Detail Menu L*/
        var main = $('#menu-l-style-vest');
        main.find('#vt-neck-str').text(vt.necklineStr);
        main.find('#vt-button-str').text(vt.buttonStr);
        main.find('#vt-pocket-str').text(vt.pocketStr);
        main.find('#vt-bottom-str').text(vt.bottomStr);
        main.find('#vt-back-str').text(vt.backStr);
    },
    Fabric: function () {
        var defaults = this.defaults;
        var pathJK = defaults.cloudFront + 'Suit/Fabric/LL/';
        var it = defaults.it;

        var src = pathJK + it.fabric + ".jpg";

        $('#menu-l-fabric img#menu-l-fabric-img').attr('src', src);
        $('.fabric-property').text("High Quality " + it.extraFabricStr);
        this.extraPantImgMeasurement(it.fabric);
    },
    Contrast: function () {
        var self = this;
        var defaults = self.defaults;
        var log = defaults.log;
        var it = defaults.it;
        var jk = defaults.jk;
        var pathJK = defaults.pathJK;
        var imgClass = defaults.imgClass;
        var jkFront = defaults.jkFront;
        var jkBack = defaults.jkBack;
        var ptBack = defaults.ptBack;
        var vtFront = defaults.vtFront;
        var lining = defaults.lining;
        var project = designObject.project;
        var jkFrontSrc = [], jkBackSrc = [], ptBackSrc = [], vtFrontSrc = [], liningSrc = [];
        //$('#menu-l-contrast .image-menu-l').remove();

        jkFrontSrc[0] = ({src: jkFront.attr('src'), class: imgClass});
        jkBackSrc[0] = ({src: jkBack.attr('src'), class: imgClass});
        ptBackSrc[0] = ({src: ptBack.attr('src'), class: imgClass});
        vtFrontSrc[0] = ({src: vtFront.attr('src'), class: imgClass});
        liningSrc[0] = ({src: lining.attr('src'), class: imgClass});

        MethodsGalbal.AppendImg("#menu-l-contrast #sub-menu-l-contrast-jacket", jkFrontSrc);
        MethodsGalbal.AppendImg("#menu-l-contrast #sub-menu-l-contrast-pant", ptBackSrc);
        MethodsGalbal.AppendImg("#menu-l-contrast #sub-menu-l-contrast-vest", vtFrontSrc);
        MethodsGalbal.AppendImg("#menu-l-contrast #sub-menu-l-contrast-monogram", liningSrc);

        if (project === "vest") {
            MethodsGalbal.AppendImg("#sub-menu-l-contrast-button-hole", vtFrontSrc);
        }
        if (project === "pant") {
            //$('#sub-menu-l-pleats img').clone().appendTo('#sub-menu-l-contrast-button-hole');/* condition designObject.project = 'vest'*/
        }

        /*----------------------------------
         * back collar product jacket
         *----------------------------------*/
        var backcollar = it.backcollar;
        var contrast = it.contrast;
        var fabric = it.fabric;

        if (project !== "vest" && project !== "pant") {
            if (backcollar !== log.backcollar || contrast !== log.contrast || fabric !== log.fabric) {
                jkBackSrc[1] = ({src: pathJK + "Mix/Flannel/Flannel/" + backcollar + ".png", class: "image-menu-l-backCollar"});
                MethodsGalbal.AppendImg("#menu-l-contrast #sub-menu-l-contrast-back-color", jkBackSrc);

                /*------------------------
                 * set new log
                 *------------------------*/
                self.defaults.log.backcollar = backcollar;
                self.defaults.log.contrast = contrast;
            }
        }

        /*Detail Menu L*/
        $('#sub-menu-l-contrast-button-hole #contrast-button-str').text(it.buttonColorStr);
    },
    sleeveButton: function () {
        var self = this;
        var defaults = self.defaults;
        var project = designObject.project;
        var log = defaults.log;
        var it = defaults.it;
        var jk = defaults.jk;
        var fabric = it.fabric;
        var HButton = it.HButton;
        var lastHButton = it.lastHButton;
        var buttonColor = it.buttonColor;
        var sleevebtn = jk.sleeveBtn;
        var sleeveBtnStyle = jk.sleeveBtnStyle;
        var pathJK = defaults.cloudFront + 'Suit/';

        var arr = [];

        arr[0] = ({src: pathJK + "Menu/SleeveButton/Main/" + fabric + ".png"});/*main*/
        arr[1] = ({src: pathJK + "Menu/SleeveButton/HButton/" + sleevebtn + "/" + sleeveBtnStyle + "/" + HButton + ".png"});/*HButton*/
        arr[2] = ({src: pathJK + "Menu/LastButtonHole/HButton/" + sleevebtn + "/" + sleeveBtnStyle + "/" + lastHButton + ".png"});
        arr[3] = ({src: pathJK + "Menu/SleeveButton/Button/" + sleevebtn + "/" + sleeveBtnStyle + "/" + buttonColor + ".png"});/*button*/
        arr[4] = ({src: pathJK + "Menu/SleeveButton/XButton/" + sleevebtn + "/" + sleeveBtnStyle + "/" + HButton + ".png"});/*XButton*/

        if ((designObject.project).toLowerCase() !== "tuxedo" && lastHButton.toLowerCase() == 'none') {
            delete(arr[2]);
        }

        if ((designObject.project).toLowerCase() === "tuxedo") {
            delete(arr[2]);
            delete(arr[4]);
        }
        /*------------------------------------------
         * condition button sleeve Standard
         *-----------------------------------------*/
        if (jk.sleeveBtnStyle === "Standard") {
            delete(arr[1]);
        }

        if (fabric !== log.fabric || sleevebtn !== log.sleevebtn || sleeveBtnStyle !== log.sleeveBtnStyle || HButton !== log.HButton || lastHButton !== log.lastHButton || buttonColor !== log.buttonColor) {
            if (project !== "vest") {
                MethodsGalbal.AppendImg("#sub-menu-l-sleeve", [({src: pathJK + "Menu/NewSleeveButton/" + sleevebtn + "/" + sleeveBtnStyle + ".jpg"})]);
                MethodsGalbal.AppendImg("#sub-menu-l-contrast-button-hole", arr);
                MethodsGalbal.AppendImg("#menu-l-style-jacket #jk-sleeve-main", arr);

                if ((designObject.project).toLowerCase() !== "tuxedo") {
                    MethodsGalbal.AppendImg("#sub-menu-l-contrast-last-button-hole", arr);
                }
            }

            /*------------------------
             * set new log
             *------------------------*/
            self.defaults.log.fabric = fabric;
            self.defaults.log.sleevebtn = sleevebtn;
            self.defaults.log.sleeveBtnStyle = sleeveBtnStyle;
            self.defaults.log.HButton = HButton;
            self.defaults.log.lastHButton = lastHButton;
            self.defaults.log.buttonColor = buttonColor;
        }
    },
    Monogram: function () {
        var it = this.defaults.it;
        $('p.monogram-txt-str,p.monogram-spc-for').css({'color': it.monogramHoleCode});
        $('.monogram-hole-color-str').text(it.monogramHoleStr);
    },
    createPiping: function () {
        var self = this;
        var defaults = self.defaults;
        var r = defaults.cloudFront + "Suit/Fabric/FabricPiping/";
        var data = defaults.pipingObject;
        var main = $("#sub-menu-l-contrast-lining #menu-l-list-lining");
        var length = main.find('li').length;
        if (length <= 0) {
            for (var i in data) {
                var arr = data[i];
                var id = arr['ITEMID'];
                var name = arr['ITEMNAME'];

                var li = $('<li>').attr({id: "Lining-" + id, title: name});
                var img = [];
                img[0] = ({src: r + id + ".jpg"});
                li.appendTo(main);

                MethodsGalbal.AppendImg(li, img);
            }
        }
    },
    extraPantImgMeasurement: function (fabric) {
        if (fabric) {
            $('.layout-box-extra-pant img').attr("src", "../images/Models/SuitWeb/Suit/Fabric/S/" + fabric + ".jpg");
        }
    }
};