function jacketDesign(option, callback) {
    var root = "../images/";
    var defaults = {type: false, path: "", view: "front", iTailorObject: "", jacketObject: ""};
    option = $.extend(defaults, option);
    var it = option.iTailorObject ? option.iTailorObject : iTailorObject;
    var jk = option.jacketObject ? option.jacketObject : jacketObject;
    var frontArr = [], backArr = [];
    var fb = it.fabric + ".png";
    var Btn = it.buttonColor + ".png";
    var HBtn = it.HButton + ".png";
    var lining = it.lining + ".png";
    var ct = it.contrast + ".png";

    var cloudFront = "https://d2dffx7j4kisga.cloudfront.net/";
    var rLocal = root + "Models/SuitWeb/Suit/MainBody/";
    var rLocalMix = root + "Models/SuitWeb/Suit/Mix/";
    var rAWS = cloudFront + "Suit/MainBody/";
    var rAWSMix = cloudFront + "Suit/Mix/";
    var r = rAWS;
    var rMix = rAWSMix;
    
    var button = jk.buttonCount.replace('D', '');
    var handTopStitching = it.handTopStitchingColor + ".png";

    frontArr['front'] = r + "Front/" + jk.bottom + "/" + fb;
    frontArr['pkc'] = r + "Pocket/PKC/" + button + "/" + fb;

    if (["Lapel", "FullBody"].indexOf(it.handTopStitching) > -1) {
        if (it.handTopStitching === "FullBody") {
            frontArr["handTopStitchingFullBody"] = r + "Front/TopStitching/" + jk.bottom + "/" + handTopStitching;
        }

        if (jk.breastPocket === "N") {
            frontArr["handTopStitchingBreastPocket"] = r + "Pocket/TopStitching/PKC/" + handTopStitching;
        }
    }
    
    frontArr['lining'] = r + "Lining/" + jk.button + "/" + lining;
    if (jk.liningStyle != null && jk.liningStyle.toLowerCase() == 'unlined') {
        delete frontArr['lining'];
    }

    frontArr['collar'] = r + "Collar/" + jk.lapel + "/" + jk.button + "/" + fb;
    frontArr['HButton'] = r + "HButton/Front/" + jk.buttonSty + "/" + jk.button + "/" + HBtn;
    frontArr['button'] = r + "Button/Front/" + jk.buttonSty + "/" + jk.button + "/" + Btn;
    frontArr['lapel'] = r + "HButtonLapel/" + jk.lapel + "/OpenB/" + HBtn;
    frontArr['pocket'] = r + "Pocket/" + jk.pocket + "/" + fb;
    frontArr['sleeveBtn'] = r + "Button/Sleeve/" + jk.sleeveBtn + "/" + jk.sleeveBtnStyle + "/" + Btn;
    frontArr['callIn'] = r + "ColorCombo/CollarIn/" + fb;

    backArr['backMain'] = r + "Back/" + jk.back + "/" + fb;
    backArr['backCollar'] = r + "ColorCombo/BackCollar/" + fb;

    /*==========================================================================
     * condtion Mix
     * =========================================================================*/
    if (jk.lapelUpper === "Y") {
        if (jk.lapel !== "CL4")
            frontArr['lapelUpper'] = rMix + "Upper/" + jk.lapel + "/" + jk.buttonCount + "/" + ct;
        backArr['backCollar'] = r + "ColorCombo/BackCollar/" + ct;
        frontArr['callIn'] = r + "ColorCombo/CollarIn/" + ct;
    } else {
        if (jk.lapel !== "CL4")
            frontArr['lapelUpper'] = rMix + "Upper/" + jk.lapel + "/" + jk.buttonCount + "/" + fb;
        backArr['backCollar'] = r + "ColorCombo/BackCollar/" + fb;
        frontArr['callIn'] = r + "ColorCombo/CollarIn/" + fb;
    }

    if (jk.lapelLower === "Y") {
        if (jk.lapel === "CL4") {
            frontArr['collar'] = r + "Collar/" + jk.lapel + "/" + jk.button + "/" + ct;
        } else {
            frontArr['collar'] = rMix + "Lower/" + jk.lapel + "/" + jk.buttonCount + "/" + ct;
        }
    } else {
        if (jk.lapel === "CL4") {
            frontArr['collar'] = r + "Collar/" + jk.lapel + "/" + jk.button + "/" + fb;
        } else {
            frontArr['collar'] = rMix + "Lower/" + jk.lapel + "/" + jk.buttonCount + "/" + fb;
        }
    }

    if (jk.contrastPocket === "Y") {
        frontArr['pocket'] = r + "Pocket/" + jk.pocket + "/" + ct;
    }
    if (jk.contrastChest === "Y") {
        frontArr['pkc'] = r + "Pocket/PKC/" + button + "/" + ct;
    }
    if (jk.contrastElbow === "Y") {
        backArr['elbow'] = r + "ColorCombo/Elbow/" + ct;
    }
    /*==========================================================================
     * condtion
     * =========================================================================*/
    if (jk.buttonCount !== "1Button" && jk.buttonCount !== "2Button" && jk.buttonCount !== "3Button" && jk.buttonCount !== "4Button") {
        var btn = (jk.buttonCount).replace('D', '');
        frontArr['front'] = cloudFront + "DoubleBreasted/MainBody/Front/" + fb;
        frontArr['lining'] = cloudFront + "DoubleBreasted/MainBody/Lining1/" + btn + "/" + lining;
        frontArr['collar'] = cloudFront + "DoubleBreasted/MainBody/Collar/" + jk.lapel + "/" + btn + "/" + fb;

        if (jk.lapelUpper === "Y") {
            if (jk.lapel === "CL4") {
                frontArr['lapelUpper'] = cloudFront + "DoubleBreasted/MainBody/Collar/" + jk.lapel + "/" + btn + "/" + ct;
            } else {
                frontArr['lapelUpper'] = cloudFront + "DoubleBreasted/Mix/Upper/" + jk.lapel + "/" + btn + "/" + ct;
            }
        }
        if (jk.lapelLower === "Y") {
            frontArr['lapelLower'] = cloudFront + "DoubleBreasted/Mix/Lower/" + jk.lapel + "/" + btn + "/" + ct;
        }
    }
    if (jk.lapelBtnHole === "No Button Hole") {
        delete frontArr['lapel'];
    }

    if (jk.breastPocket === "Y") {
        delete frontArr['pkc'];
    }

    /*##########################################################################
     * option product Tuxdo
     *##########################################################################*/
    if (jk.contrastTrimming === "Y") {
        var btn = (jk.buttonCount).replace('D', '');
        if (jk.lapel === "CL4") {
            frontArr['collar'] = r + "Collar/" + jk.lapel + "/" + jk.button + "/" + fb;
            frontArr['trimming'] = "../images/models/suitweb/tuxedo/mix/collar/CL4/" + btn + "/" + ct;
        } else {
            frontArr['collar'] = rMix + "Lower/" + jk.lapel + "/" + jk.buttonCount + "/" + fb;
            frontArr['lapelUpper'] = rMix + "Upper/" + jk.lapel + "/" + jk.buttonCount + "/" + fb;
            if (jk.lapelUpper === "Y") {
                frontArr['trimmingUpper'] = "../images/models/suitweb/tuxedo/mix/upper/" + jk.lapel + "/" + btn + "/" + ct;
            }

            if (jk.lapelLower === "Y") {
                frontArr['trimmingLower'] = "../images/models/suitweb/tuxedo/mix/Lower/" + jk.lapel + "/" + btn + "/" + ct;
            }
        }
    }
    //
    if (["Lapel", "FullBody"].indexOf(it.handTopStitching) > -1) {
        frontArr["handTopStitchingLapel"] = r + "Collar/TopStitching/" + jk.lapel + "/" + jk.button + "/" + handTopStitching;

        if (jk.breastPocket === "N") {
            frontArr["handTopStitchingPocket"] = r + "Pocket/TopStitching/" + jk.pocket + "/" + handTopStitching;
        }
    }

    var arr = [];
    if (option.view === "front") {
        arr = frontArr;
    } else {
        arr = backArr;
    }
    canvasDesignMain(option.view, 'jacket', arr, function (dataURL) {
        if (callback) {
            callback(dataURL);
        }
    });
}
function pantDesign(option, callback) {
    var defaults = {type: false, path: "", view: "front", iTailorObject: "", pantObject: ""};
    option = $.extend(defaults, option);
    var it = option.iTailorObject ? option.iTailorObject : iTailorObject;
    var pt = option.pantObject ? option.pantObject : pantObject;
    var frontArr = [], backArr = [];
    var fb = it.fabric + ".png";
    var Btn = it.buttonColor + ".png";
    var HBtn = it.HButton + ".png";
    var lining = it.lining + ".png";
    var rLocal = "../images/Models/SuitWeb/Pant/MainBody/";
    var rAWS = "https://d2dffx7j4kisga.cloudfront.net/Pant/MainBody/";
    var r = rAWS;
    var ct = it.contrast + ".png";

    var frontStyle = ((pt.style === "Dave") ? "Slim.png" : (pt.style === "Normal") ? "Normal.png" : '');
    frontArr['front'] = r + "Front/" + fb;/**/
    frontArr['cuffMain'] = r + "Cuff/Cuff/" + fb;
    frontArr['cuff'] = r + "Cuff/" + pt.cuff + "/" + fb;
    frontArr['buttonCuff'] = r + "Button/Cuff/" + pt.cuff + "/" + Btn;
    frontArr['frontStyle'] = r + frontStyle;
    frontArr['pleats'] = r + "Pleats/" + ((pt.pleats === "BoxPleats") ? "BoxPleats/" + fb : pt.pleats + ".png");
    frontArr['pocket'] = r + "Pocket/" + pt.pocket + "/" + fb;
    frontArr['waisband'] = r + "EdgeTrousers/" + pt.waisband + "/" + fb; /*waisband or EdgeTrousers*/
    frontArr['buttonWaisband'] = r + "Button/EdgeTrousers/" + Btn;
    frontArr['beltLoop'] = r + "BeltLoops/" + pt.beltLoop + "/" + ((pt.contrastBelt === "Y") ? ct : fb);
    frontArr['PantTab'] = "../images/Models/SuitWeb/Tuxedo/Mix/Tab/" + ct;/*product tuxedo*/

    backArr['back'] = r + "Back/" + fb;
    backArr['backCuffMain'] = r + "BackCuff/cuff/" + fb;
    backArr['backCuff'] = r + "BackCuff/" + pt.cuff + "/" + fb;
    backArr['BackBeltLoop'] = r + "BackBeltLoops/" + pt.beltLoop + "/" + ((pt.contrastBelt === "Y") ? ct : fb);

    /*defaults button left or right*/
    backArr['BackPocket'] = r + "BackPocket/" + pt.backPocketOption + "/" + pt.backPocket + "/" + ((pt.contrastBackPocket === "Y") ? ct : fb);
    backArr['button'] = r + "Button/BackPocket/" + pt.backPocketOption + "/" + Btn;

    /*button both not pocket left or right*/
    backArr['BackPocketLeft'] = r + "BackPocket/Left/" + pt.backPocket + "/" + ((pt.contrastBackPocket === "Y") ? ct : fb);
    backArr['BackPocketRight'] = r + "BackPocket/Right/" + pt.backPocket + "/" + ((pt.contrastBackPocket === "Y") ? ct : fb);
    backArr['BackPocketLeftButton'] = r + "Button/BackPocket/Left/" + Btn;
    backArr['BackPocketRigthButton'] = r + "Button/BackPocket/Right/" + Btn;

    var pocketOption = pt.backPocketOption;
    if (pocketOption === "Left" || pocketOption === "Right") {
        delete backArr['BackPocketLeft'];
        delete backArr['BackPocketRight'];
        delete backArr['BackPocketLeftButton'];
        delete backArr['BackPocketRigthButton'];
    } else if (pocketOption === "Both") {
        delete backArr['BackPocket'];
        delete backArr['button'];
    }

    if (pt.beltLoop === "ButtonSideAdjusters" || pt.beltLoop === "BuckleSideAdjusters") {
        delete backArr['BackBeltLoop'];
    }

    if (pt.backPocket === "Single" || pt.backPocket === "Double") {
        delete backArr['button'];
        delete backArr['BackPocketLeftButton'];
        delete backArr['BackPocketRigthButton'];
    }

    if (pt.waisband === "Normal") {
        delete frontArr['buttonWaisband'];
    }

    if (option.type) {
        delete(frontArr['frontStyle']);
    }

    if (!frontStyle) {
        delete(frontArr['frontStyle']);
    }

    if (pt.cuff === "None") {
        delete backArr['backCuff'];
        delete backArr['backCuffMain'];
        delete frontArr['cuffMain'];
        delete frontArr['cuff'];
        delete frontArr['buttonCuff'];
    }
    if (pt.pocket === "None") {
        delete frontArr['pocket'];
    }
    if (pt.pleats === "NoPleats") {
        delete frontArr['pleats'];
    }
    if (pt.beltLoop === "None") {
        delete frontArr['beltLoop'];
        delete backArr['BackBeltLoop'];
    }

    /*----------------------------
     * option product Tuxdo
     *----------------------------*/
    if (pt.contrastPantTab !== "Y") {
        delete frontArr['PantTab'];
    }

    var main, arr = [];
    if (option.view === "front") {
        arr = frontArr;
    } else {
        arr = backArr;
    }
    canvasDesignMain(option.view, 'pant', arr, function (dataURL) {
        if (callback) {
            callback(dataURL);
        }
    });
}
function vestDesign(option, callback) {
    var defaults = {type: false, path: "", view: "front", iTailorObject: "", vestObject: ""};
    option = $.extend(defaults, option);
    var it = option.iTailorObject ? option.iTailorObject : iTailorObject;
    var vt = option.vestObject ? option.vestObject : vestObject;
    var frontArr = [], backArr = [];
    var fb = it.fabric + ".png";
    var Btn = it.buttonColor + ".png";
    var HBtn = it.HButton + ".png";
    var lining = it.lining + ".png";
    var rLocal = "../images/Models/SuitWeb/Vest/MainBody/";
    var rAWS = "https://d2dffx7j4kisga.cloudfront.net/Vest/MainBody/";
    var r = rAWS;
    var ct = it.contrast + ".png";

    frontArr['front'] = r + "Front/" + vt.bottom + "/" + fb;
    frontArr['HButton'] = r + "HButton/" + vt.button + "/" + HBtn;
    frontArr['button'] = r + "Button/" + vt.button + "/" + Btn;
    frontArr['pocket'] = r + "Pocket/" + vt.pocket + "/" + fb;
    frontArr['lining'] = r + "Lining/" + vt.button + "/" + lining;
    frontArr['lapel'] = r + "Lapel/" + vt.neckline + "/" + vt.button + "/" + fb;
    frontArr['LiningAngleCut'] = r + "Lining/AngleCut/" + lining;

    backArr['back'] = r + "Back/" + fb;
    backArr['belt'] = r + "ColorCombo/Belt/" + fb;
    backArr['LiningAngleCut'] = r + "Lining/Back/" + lining;

    /*==========================================================================
     * condtion Mix
     * =========================================================================*/
    if (vt.contrastVestPocket === "Y") {
        frontArr['pocket'] = r + "Pocket/" + vt.pocket + "/" + ct;
    }
    if (vt.contrastVestLapel === "Y") {
        frontArr['lapel'] = r + "Lapel/" + vt.neckline + "/" + vt.button + "/" + ct;
    }

    /*==========================================================================
     * condtion
     * =========================================================================*/
    if (vt.bottom !== "AngleCut") {
        delete frontArr['LiningAngleCut'];
    }
    if (vt.back !== "Belt") {
        delete backArr['belt'];
    }
    if (vt.neckline === "VNeck") {
        delete frontArr['lapel'];
    }

    var arr = [];
    if (option.view === "front") {
        arr = frontArr;
    } else {
        arr = backArr;
    }
    canvasDesignMain(option.view, 'vest', arr, function (dataURL) {
        if (callback) {
            callback(dataURL);
        }
    });
}
function liningDesign(option, callback) {
    var defaults = {type: false, path: "", view: "li", iTailorObject: "", jk: jacketObject};
    option = $.extend(defaults, option);
    var it = option.iTailorObject ? option.iTailorObject : iTailorObject;
    var trimming = defaults.jk.contrastTrimming;
    var frontArr = [], vestArr = [];
    var lining = it.lining + ".png";
    var fb = it.fabric + ".png";
    var ct = it.contrast + ".png";
    var piping = it.piping + ".png";
    var rLocal = "../images/Models/SuitWeb/Suit/Mix/Lining/";
    var rAWS = "https://d2dffx7j4kisga.cloudfront.net/Suit/Mix/Lining/";
    var r = rAWS;
    var view = 'front';

    //
    var newLiningLocal = "../images/Models/SuitWeb/Suit/Mix/NewLining/";
    var newLiningAWS = "https://d2dffx7j4kisga.cloudfront.net/Suit/Mix/NewLining/";
    var newLining = newLiningAWS;
    frontArr['main'] = newLining + "Main/" + ((jacketObject.lapelLower === "Y") ? ct : fb);
    frontArr['lining'] = newLining + "Lining/" + (jacketObject.liningStyle || "FullyLined") + "/" + ((jacketObject.liningStyle === "Unlined") ? fb : lining);
    frontArr['piping'] = newLining + "Piping/" + piping;

    /*
     frontArr['main'] = r + "Main/" + ((jacketObject.lapelLower === "Y") ? ct : fb);
     frontArr['lining'] = r + "Lining/" + lining;
     frontArr['piping'] = r + "Piping/" + piping;
     */
    /*---------------------------
     * Condition contrastTrimming product TUXEDO
     *--------------------------*/
    if (trimming === "Y") {
        frontArr['main'] = r + "Main/" + fb;
    }

    /*vest lining*/
    rLocalVest = "../images/Models/SuitWeb/Vest/Mix/";
    rAWSVest = "https://d2dffx7j4kisga.cloudfront.net/Vest/Mix/";
    r = rAWSVest;
    vestArr['main'] = r + "Main/" + fb;
    vestArr['lining'] = r + "Lining/" + lining;
    vestArr['piping'] = r + "Piping/" + piping;
    if (designObject.project === "vest") {/*condtion project vest*/
        frontArr = vestArr;
    }

    canvasDesignMain(view, 'lining', frontArr, function (dataURL) {
        if (callback) {
            callback(dataURL);
        }
    });
}

function canvasDesignMain(view, pd, arr, callback) {
    var x = "convas-" + pd + "-" + view;
    var w = 313, h = 421;
    var _random = 'design-' + parseInt(Math.random(10000000) * 100000);
    $('.' + x).remove();
    $('<canvas>').attr({'id': _random, 'class': x, 'width': w, 'height': h}).css('display', 'none').appendTo('body');
    var canvas = document.getElementById(_random);
    var context = canvas.getContext('2d');

    loadImage(_random, arr, view, function (images) {
        for (i in images) {
            context.drawImage(images[i], 0, 0, w, h);
        }
        var dataURL = canvas.toDataURL();
        if (callback) {
            callback(dataURL);
        }
    });
}
function loadImage(id, sources, view, callback) {
    var canvas = document.getElementById(id);
    
    var context = canvas.getContext('2d');
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        
        images[src] = new Image();
        
        images[src].crossOrigin = "anonymous";
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
        $(images[src]).error(function () {
            $(this).attr('src', "../itailor-data/webroot/img/missing.png");
        });
    }
    
}
function appendImage(option, callback) {
    var pd = option.pd;
    var path = option.path;
    var view = option.view;
    var mainId = '#' + pd + "-" + view;
    var Main = $('.main-3design ' + mainId);
    var img = [];
    img[0] = ({src: path});
    MethodsGalbal.AppendImg(Main, img);
    console.log(mainId)
    localStorage.setItem(mainId, path);

    
    if (callback) {
        callback();
    }
}