/*==============================================================================
 * Function Call load Xml /SQL to Java Array
 * ============================================================================= */
/* global _saveDesign */

var _jacketObject, _pantObject, _vestObject;

function loadXml(obj, callback) {
    _jacketObject = obj["jacket"];
    _pantObject = obj["pant"];
    _vestObject = obj["vest"];
    callback();
}

function loadObjArr(obj) {
    designObject.faceMask = obj["FACEMASK"];
    designObject.category = obj["CATEGORY"];
    designObject.fabric = obj["FABRIC"];
    designObject.priceProfile = obj["PRICEPROFILE"];
    designObject.extraPantArr = obj["EXTRA_PANT"];
    designObject.extraPriceList = obj["PRICEEXTRALIST"];
}

function setDefault(arr) {
    designObject.fabricMenu = arr["fabricMenu"];
    iTailorObject.fabricGroup = arr["fabricGroup"];
    iTailorObject.fabricGroupName = arr["fabricGroupName"];
    iTailorObject.fabricGroupNameStr = arr["fabricGroupName"];
    iTailorObject.fabricType = arr["fabricType"];
    iTailorObject.extraFabricStr = arr["extraFabricStr"];
    iTailorObject.fabricWeight = arr["fabricWeight"];
    iTailorObject.fabric = arr["fabric"];
    iTailorObject.fabricName = arr["fabricName"];
    iTailorObject.fabricPrice = arr["fabricPrice"];
    iTailorObject.fabricRegular = arr["fabricPrice"];
    iTailorObject.monogramPrice = arr["monogramPrice"];
}

var logs = {
    monogramActive: false/*status monogram select first*/
};

var vdoObject = {
    CHEST: "mxE_E2wq_nw",
    WAIST: "26YwJQo5PCk",
    HIP: "L7TlcuTrdeU",
    SHOULDER: "qbr7X6fCthM",
    SLEEVE: "WlrL_8EQbyI",
    LENGTH: "9V1RkGcnkRg",
    PantWaist: "kh0wb347Ls0",
    PantHip: "8zOOpeA1Rck",
    PantCrotch: "wx-0GZz8JIA",
    PantThigh: "rL66QEanivc",
    PantLength: "vBr6530IomU",
    VestLength: "EKfGC-IprGE"
};
/*Public function design 3D */
var dataObject = {
    button: []
};

var designObject = {
    project: "",
    menuMain: "menu-fabric",
    subMenuMain: "",
    productMenu: "jacket",
    subStyle: "",
    menuLast: false,
    designView: "front", /*front,back*/
    category: "",
    fabric: "",
    priceProfile: "",
    contrast: "",
    lapel: "", /*laple fabric array*/
    lining: "5",
    piping: "Grey",
    backcollar: "",
    categoeyPromotion: "PROMOTION",
    fabricWeekArr: "",
    priceMonogram: "",
    fabricMenu: "", /*val test*/
    fabricType: "", /*val test*/
    extraPantArr: [], /*val test*/
    extraPrice: 0.00, /*val test*/
    extraPriceList: "",
    extraPantStatus: false, /*val test*/
    size: "",
    curr: "",
    sign: "",
    language: "",
    imgMissing: "webroot/img/missing.png",
    customer: [],
    log: {
        productMenu: ""
    }
};
/*variable contrast array object*/
//var contrastObject = {
//    contrast: "",
//    button: "",
//    buttonStyle: "",
//    buttonHole: "",
//    monogram: ""
//};

var iTailorObject = {
    fabric: getSaveDesign("JACKET", "fabric", "887-18"),
    fabricName: getSaveDesign("JACKET", "fabric", "887-18"),
    fabricPrice: "",
    fabricRegular: "",
    monogramPrice: "",
    fabricGroup: "",
    fabricGroupName: "",
    fabricGroupNameStr: "", /*Solid Pattern*/
    extraFabricStr: "", /*Solid Pattern*/
    fabricWeight: "", /*Solid Pattern*/
    fabricType: "",
//  btnStr: "",
    contrast: getSaveDesign("JACKET", "contrast", "3799-2"),
    contrastSrt: getSaveDesign("JACKET", "contrast", "3799-2"),
    lining: getSaveDesign("JACKET", "lining", "5"), /*val test*/
    liningStr: getSaveDesign("JACKET", "lining", "Grey"), /*val test*/
    backcollar: getSaveDesign("JACKET", "backcollar", "001"),
    backcollarStr: getSaveDesign("JACKET", "backcollar", "Black"),
    buttonColor: getSaveDesign("JACKET", "buttonColor", "S8"),
    buttonColorStr: getSaveDesign("JACKET", "buttonColorStr", "S8 (Black)"),
    HButton: getSaveDesign("JACKET", "HButton", "A6"),
    HButtonStr: getSaveDesign("JACKET", "HButtonStr", "A1"),
    monogram: getSaveDesign("JACKET", "monogram", "Y"),
    monogramFor: getSaveDesign("JACKET", "monogramFor", "Y"), /*specially Tailor for*/
    monogramTxt: getSaveDesign("JACKET", "monogramTxt", ""),
    monogramHole: getSaveDesign("JACKET", "monogramHole", "A8"),
    monogramHoleStr: getSaveDesign("JACKET", "monogramHoleStr", "White"),
    monogramHoleCode: getSaveDesign("JACKET", "monogramHoleCode", "#FFFFFF"),
    piping: getSaveDesign("JACKET", "piping", "A1"),
    pipingStr: getSaveDesign("JACKET", "piping", "A1"),

    handTopStitching: getSaveDesign("JACKET", "handTopStitching", "No"),
    handTopStitchingStr: getSaveDesign("JACKET", "handTopStitchingStr", "No"),
    handTopStitchingColor: getSaveDesign("JACKET", "handTopStitchingColor", "A00"),
    handTopStitchingColorStr: getSaveDesign("JACKET", "handTopStitchingColorStr", "Transparent"),
    handTopStitchingColorCode: getSaveDesign("JACKET", "handTopStitchingColorCode", "transparent"),
    handTopStitchingOpt: getSaveDesign("JACKET", "handTopStitchingOpt", "1"),

    lastHButton: getSaveDesign("JACKET", "lastHButton", "None"),
    lastHButtonStr: getSaveDesign("JACKET", "lastHButtonStr", "None"),
    faceMask: false,
    faceMaskQty: 0
};

var jacketObject = {
    back: getSaveDesign("JACKET", "back", "NoVent"),
    backStr: getSaveDesign("JACKET", "back", "No Vent"),
    button: getSaveDesign("JACKET", "buttonCount", "2Button"),
    buttonSty: getSaveDesign("JACKET", "buttonSty", "Single"), /*count button*/
    buttonStr: getSaveDesign("JACKET", "buttonStr", "2 Buttons, Single Breasted"),
    buttonCount: getSaveDesign("JACKET", "buttonCount", "2button"),
    sleeveBtn: getSaveDesign("JACKET", "sleeveBtn", "4Button"),
    sleeveBtnStyle: getSaveDesign("JACKET", "sleeveBtnStyle", "Working"),
    sleeveBtnStr: getSaveDesign("JACKET", "sleeveBtnStr", "4 Working Buttons"),
    sleeveBtnModel: "Bespoke/High Fashion/All Time",
    lapel: getSaveDesign("JACKET", "lapel", "CL2"),
    lapelStr: getSaveDesign("JACKET", "lapelStr", "Notch Lapel"),
    bottom: getSaveDesign("JACKET", "bottom", "Curved"),
    bottomStr: getSaveDesign("JACKET", "bottomStr", "Curved Bottom"),
    pocket: getSaveDesign("JACKET", "pocket", "PK-1"),
    pocketStr: getSaveDesign("JACKET", "pocketStr", "2 Straight Pockets"),
    lining: getSaveDesign("JACKET", "lining", "5"),
    liningStr: getSaveDesign("JACKET", "lining", "Grey"),
    /*option*/
    lapelBtnHole: getSaveDesign("JACKET", "lapelBtnHole", "No Button Hole"), /*radio*/
    breastPocket: getSaveDesign("JACKET", "breastPocket", "N"), /*checkbox*/

    lapelUpper: getSaveDesign("JACKET", "lapelUpper", "N"),
    lapelLower: getSaveDesign("JACKET", "lapelLower", "N"),
    contrastPocket: getSaveDesign("JACKET", "contrastPocket", "N"),
    contrastChest: getSaveDesign("JACKET", "contrastChest", "N"),
    contrastElbow: getSaveDesign("JACKET", "contrastElbow", "N"),

    liningStyle: getSaveDesign("JACKET", "liningStyle", "FullyLined"),
    liningStyleStr: getSaveDesign("JACKET", "liningStyleStr", "Fully Lined"),

    lapelWidthOption: getSaveDesign("JACKET", "lapelWidthOption", "Regular"),
    lapelWidthOptionStr: getSaveDesign("JACKET", "lapelWidthOptionStr", "Regular")
};

var pantObject = {
    style: getSaveDesign("PANT", "style", "Normal"),
    styleSrt: getSaveDesign("PANT", "styleSrt", "Normal/straight"),
    back: "",
    backPocket: getSaveDesign("PANT", "backPocket", "Single"),
    backPocketStr: getSaveDesign("PANT", "backPocketStr", "Single"),
    beltLoop: getSaveDesign("PANT", "beltLoop", "Single"),
    beltLoopStr: getSaveDesign("PANT", "beltLoopStr", "Single Pleat"),
    button: "",
    buttonStyle: "",
    buttonStr: "",
    cuff: getSaveDesign("PANT", "cuff", "None"),
    cuffStr: getSaveDesign("PANT", "cuffStr", "Regular"),
    pleats: getSaveDesign("PANT", "pleats", "1Pleats"),
    pleatStr: getSaveDesign("PANT", "pleatStr", "1Pleats"),
    pocket: getSaveDesign("PANT", "pocket", "Slanted"),
    pocketStr: getSaveDesign("PANT", "pocketStr", "Slanted"),
    /*option*/
    backPocketOption: getSaveDesign("PANT", "backPocketOption", "Right"), /*checkbox*/
    waisband: getSaveDesign("PANT", "waisband", "Normal"),
    contrastBelt: getSaveDesign("PANT", "contrastBelt", "N"),
    contrastBackPocket: getSaveDesign("PANT", "contrastBackPocket", "N")

};

var vestObject = {
    neckline: getSaveDesign("VEST", "neckline", "VNeck"),
    necklineStr: getSaveDesign("VEST", "necklineStr", "VNeck"),
    bottom: getSaveDesign("VEST", "bottom", "AngleCut"),
    bottomStr: getSaveDesign("VEST", "bottomStr", "AngleCut"),
    back: getSaveDesign("VEST", "back", "Plain"),
    backStr: getSaveDesign("VEST", "backStr", "Plain"),
    button: getSaveDesign("VEST", "button", "6Button"),
    buttonStr: getSaveDesign("VEST", "buttonStr", "6Button"),
    front: "",
    frontStr: "",
    lining: getSaveDesign("VEST", "lining", "5"),
    liningStr: getSaveDesign("VEST", "lining", "5"),
    pocket: getSaveDesign("VEST", "pocket", "Single"),
    pocketStr: getSaveDesign("VEST", "pocketStr", "Single Opening"),
    /*option contrast*/
    contrastVestPocket: getSaveDesign("VEST", "contrastVestPocket", "N"),
    contrastVestLapel: getSaveDesign("VEST", "contrastVestLapel", "N"),

    piping: getSaveDesign("VEST", "piping", "A1"),
    pipingStr: getSaveDesign("VEST", "piping", "A1"),
    buttonColor: getSaveDesign("VEST", "buttonColor", "S8"),
    buttonColorStr: getSaveDesign("VEST", "buttonColorStr", "S8 (Black)"),
    HButton: getSaveDesign("VEST", "HButton", "A6"),
    HButtonStr: getSaveDesign("VEST", "HButtonStr", "A1")
};