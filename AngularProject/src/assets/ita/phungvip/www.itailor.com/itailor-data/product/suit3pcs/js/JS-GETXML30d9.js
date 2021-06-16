var categoryObj = function (x) {
    var obj = designObject.category;
    var id = x ? x : iTailorObject.fabricGroup;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['PKEY']) {
            designObject.fabricMenu = arr['fabricMenu'] = a['PKEY'];
            designObject.fabricType = arr['fabricType'] = a['TYPECATEGORY_STR'];
            return arr;
        }
    }
};
var fabricObj = function (x) {
    var obj = designObject.fabric;
    var id = x ? x : iTailorObject.fabric;
    var arr = [];
    for (var i in obj) {
        var a = obj[i];
        if (id === a['ITEMID']) {
            iTailorObject.fabric = arr['fabric'] = a['ITEMID'];
            iTailorObject.fabricName = arr['fabricName'] = a['ITEMNAME'];
            iTailorObject.fabricGroup = arr['fabricGroup'] = a['CATEGORYID'];
            iTailorObject.fabricGroupName = arr['fabricGroupName'] = a['CATEGORYNAME'];
            iTailorObject.fabricGroupNameStr = arr['fabricGroupNameStr'] = a['FABRICGROUP_NAME'];
            iTailorObject.extraFabricStr = arr['extraFabricStr'] = a['EXTRATYPEFABRIC'];
            iTailorObject.fabricWeight = arr['fabricWeight'] = a['FABRICWEIGHT'];
            iTailorObject.fabricType = arr['fabricType'] = a['TYPECATEGORY_STR'];

            var objectPrice;
            if ((a['PRICEPROFILE_CODE'] != null && a['PRICEPROFILE_CODE'].toLowerCase() == 'none') || typeof a['PRICEPROFILE_CODE'] == 'undefined') {
                objectPrice = getCategoryPrice(a['CATEGORYID']);
                iTailorObject.fabricPrice = objectPrice['fabricPrice'];
                iTailorObject.fabricRegular = objectPrice['fabricRegular'];
            }
            else {
                objectPrice = getFabricPriceByProfile(a['PRICEPROFILE_CODE']);
                iTailorObject.fabricPrice = objectPrice['PRICE'];
                iTailorObject.fabricRegular = objectPrice['REGULAR'];
            }

            designObject.fabricMenu = a['CATEGORYID'];
            designObject.fabricType = a['TYPECATEGORY_STR'];
            return arr;
        }
    }
};
var getCategoryPrice = function (key) {
    var data = designObject.category;
    var _return = [];
    if (key) {
        for (var i in data) {
            var arr = data[i];
            if (key === arr['PKEY']) {
                _return['fabricPrice'] = arr['PRICE'];
                _return['fabricRegular'] = arr['REGULAR'];
            }
        }
    }
    return _return;
};

var getFabricPriceByProfile = function (code) {
    var objPriceProfile = designObject.priceProfile;
    return  getArr(objPriceProfile, "PRICEPROFILE_CODE", code);
}

var getArr = function (objArr, key, id) {
    for (var i in objArr) {
        if (objArr[i][key] === id) {
            return objArr[i];
        }
    }
}

var viewfabricAllObj = function (x) {
    var obj = designObject.fabric;
    var id = x ? x : iTailorObject.fabric;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['ITEMID']) {
            arr['fabric'] = a['ITEMID'];
            arr['fabricName'] = a['ITEMNAME'];
            arr['fabricGroup'] = a['CATEGORYID'];
            arr['fabricGroupName'] = a['CATEGORYNAME'];
            arr['extraFabricStr'] = a['CATEGORYNAME'];
            arr['fabricWeight'] = a['FABRICWEIGHT'];
            arr['fabricType'] = a['TYPECATEGORY_STR'];
            arr['fabricPrice'] = getCategoryPrice(a['CATEGORYID'])['fabricPrice'];//a['PRICE'];
            return arr;
        }
    }
};
var extraPantObj = function (x) {
    var obj = designObject.extraPantArr;
    var id = x ? x : iTailorObject.fabricGroup;
    var curr = designObject.curr;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['CATEGORYID'] && a['CURRENCY'] === curr) {
            var price = a['PRICE'];
            designObject.extraPrice = price;
            return arr;
        }
    }
};
var contrastObj = function (x) {
    var obj = designObject.contrast;
    var id = x ? x : iTailorObject.contrast;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['ITEMID']) {
            iTailorObject.contrast = arr['id'] = a['ITEMID'];
            iTailorObject.contrastSrt = arr['name'] = a['ITEMNAME'];
            return arr;
        }
    }
};
var liningObj = function (x) {
    var obj = designObject.lining;
    var id = x ? x : iTailorObject.lining;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['ITEMID']) {
            iTailorObject.lining = arr['id'] = a['ITEMID'];
            iTailorObject.liningStr = arr['name'] = a['ITEMNAME'];
            return arr;
        }
    }
};
var pipingObj = function (x) {
    var obj = designObject.piping;
    var id = x ? x : iTailorObject.piping;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['ITEMID']) {
            iTailorObject.piping = arr['id'] = a['ITEMID'];
            iTailorObject.pipingStr = arr['name'] = a['ITEMNAME'];
            return arr;
        }
    }
};
var backcollarObj = function (x) {
    var obj = designObject.backcollar;
    var id = x ? x : iTailorObject.backcollar;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['ITEMID']) {
            iTailorObject.backcollar = arr['id'] = a['ITEMID'];
            iTailorObject.backcollarStr = arr['name'] = a['ITEMNAME'];
            return arr;
        }
    }
};
var buttonObj = function (x) {
    var obj = _jacketObject.buttonColor;
    var id = x ? x : iTailorObject.buttonColor;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            iTailorObject.buttonColor = arr['id'] = a['id'];
            iTailorObject.buttonColorStr = arr['name'] = a['name'];
            return arr;
        }
    }
};
var HButtonObj = function (x) {
    var obj = _jacketObject.HButton;
    var id = x ? x : iTailorObject.HButton;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            iTailorObject.HButton = arr['id'] = a['id'];
            iTailorObject.HButtonStr = arr['name'] = a['name'];
            return arr;
        }
    }
};
var lastHButtonObj = function (x) {
    var obj = _jacketObject.HButton.slice();
    var id = x ? x : iTailorObject.lastHButton;
    var arr = [];

    obj.unshift({
        id: "None",
        name: "None"
    });

    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            iTailorObject.lastHButton = arr['id'] = a['id'];
            iTailorObject.lastHButtonStr = arr['name'] = a['name'];

            return arr;
        }
    }
};
var handTopStitchingColorObj = function (x) {
    var obj = _jacketObject.HButton;
    var id = x ? x : iTailorObject.handTopStitchingColor;
    var arr = [];

    if (x === "A00") {
        iTailorObject.handTopStitchingColor = "A00";
        iTailorObject.handTopStitchingColorStr = "Transparent";
        iTailorObject.handTopStitchingColorCode = "transparent";
        return arr;
    }

    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            iTailorObject.handTopStitchingColor = arr['id'] = a['id'];
            iTailorObject.handTopStitchingColorStr = arr['name'] = a['name'];
            iTailorObject.handTopStitchingColorCode = arr['code'] = a['code'];
            return arr;
        }
    }
};
var monogramHoleObj = function (x) {
    var obj = _jacketObject.HButton;
    var id = x ? x : iTailorObject.monogramHole;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            iTailorObject.monogramHole = arr['id'] = a['id'];
            iTailorObject.monogramHoleStr = arr['name'] = a['name'];
            iTailorObject.monogramHoleCode = arr['code'] = a['code'];
            return arr;
        }
    }
};
var jacketButton = function (x) {
    var obj = _jacketObject.button;
    var id = x ? x : jacketObject.button;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            jacketObject.button = arr['id'] = a['id'];
            jacketObject.buttonStr = arr['name'] = a['name'];
            jacketObject.buttonSty = arr['style'] = a['style'];
            jacketObject.buttonCount = arr['button'] = a['button'];
            jacketObject.buttonModel = arr['model'] = a['model'];
            jacketObject.buttonCode = arr['code'] = a['code'];/*add after*/
            return arr;
        }
    }
};
var jacketLapel = function (x) {
    var obj = _jacketObject.lapel;
    var id = x ? x : jacketObject.lapel;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            jacketObject.lapel = arr['id'] = a['id'];
            jacketObject.lapelStr = arr['name'] = a['name'];
            jacketObject.lapelModel = arr['model'] = a['model'];
//            jacketObject.lapelBtn = arr['style'] = a['style'];
            return arr;
        }
    }
};
var jacketBottom = function (x) {
    var obj = _jacketObject.bottom;
    var id = x ? x : jacketObject.bottom;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            jacketObject.bottom = arr['id'] = a['id'];
            jacketObject.bottomStr = arr['name'] = a['name'];
            jacketObject.bottomModel = arr['model'] = a['model'];
            return arr;
        }
    }
};
var jacketPocket = function (x) {
    var obj = _jacketObject.pocket;
    var id = x ? x : jacketObject.pocket;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            jacketObject.pocket = arr['id'] = a['id'];
            jacketObject.pocketStr = arr['name'] = a['name'];
//            jacketObject.pocketModel = arr['model'] = a['model'];
            return arr;
        }
    }
};
var jacketSleeve = function (x) {
    var id = x ? x : jacketObject.sleeveBtn;
    var obj = _jacketObject.sleeve;
    var x = id.split("-");
    id = x[0];
    var sty = x[1];
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id'] && a['style'] === sty) {
            jacketObject.sleeveBtn = arr['id'] = a['id'];
            jacketObject.sleeveBtnStyle = arr['style'] = a['style'];
            jacketObject.sleeveBtnStr = arr['name'] = a['name'];
            jacketObject.sleeveBtnModel = arr['model'] = a['model'];
            return arr;
        }
    }
};
var jacketBack = function (x) {
    var obj = _jacketObject.back;
    var id = x ? x : jacketObject.back;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            jacketObject.back = arr['id'] = a['id'];
            jacketObject.backStr = arr['name'] = a['name'];
            jacketObject.backModel = arr['model'] = a['model'];
            return arr;
        }
    }
};
var pantStyle = function (x) {
    var obj = _pantObject.style;
    var id = x ? x : pantObject.style;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            pantObject.style = arr['id'] = a['id'];
            pantObject.styleSrt = arr['name'] = a['name'];
            pantObject.styleModel = arr['model'] = a['model'];
            return arr;
        }
    }
};
var pantPleats = function (x) {
    var obj = _pantObject.pleats;
    var id = x ? x : pantObject.pleats;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            pantObject.pleats = arr['id'] = a['id'];
            pantObject.pleatStr = arr['name'] = a['name'];
            pantObject.pleatModel = arr['model'] = a['model'];
            return arr;
        }
    }
};
var pantPocket = function (x) {
    var obj = _pantObject.pocket;
    var id = x ? x : pantObject.pocket;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            pantObject.pocket = arr['id'] = a['id'];
            pantObject.pocketStr = arr['name'] = a['name'];
            pantObject.pocketModel = arr['model'] = a['model'];
            return arr;
        }
    }
};
var pantBackPocket = function (x) {
    var obj = _pantObject.backPocket;
    var id = x ? x : pantObject.backPocket;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            pantObject.backPocket = arr['id'] = a['id'];
            pantObject.backPocketStr = arr['name'] = a['name'];
            pantObject.backPocketModel = arr['model'] = a['model'];
            return arr;
        }
    }
};
var pantBeltloops = function (x) {
    var obj = _pantObject.beltloops;
    var id = x ? x : pantObject.beltLoop;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            pantObject.beltLoop = arr['id'] = a['id'];
            pantObject.beltLoopStr = arr['name'] = a['name'];
            pantObject.beltLoopModel = arr['model'] = a['model'];
            return arr;
        }
    }
};
var pantCuff = function (x) {
    var obj = _pantObject.cuff;
    var id = x ? x : pantObject.cuff;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            pantObject.cuff = arr['id'] = a['id'];
            pantObject.cuffStr = arr['name'] = a['name'];
            return arr;
        }
    }
};
var vestNeckLine = function (x) {
    var obj = _vestObject.neckline;
    var id = x ? x : vestObject.neckline;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            vestObject.neckline = arr['id'] = a['id'];
            vestObject.necklineStr = arr['name'] = a['name'];
            vestObject.necklineFolder = arr['folder'] = a['folder'];
            return arr;
        }
    }
};
var vestButton = function (x) {
    var obj = _vestObject.button;
    var id = x ? x : vestObject.button;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            vestObject.button = arr['id'] = a['id'];
            vestObject.buttonStr = arr['name'] = a['name'];
            return arr;
        }
    }
};
var vestPocket = function (x) {
    var obj = _vestObject.pocket;
    var id = x ? x : vestObject.pocket;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            vestObject.pocket = arr['id'] = a['id'];
            vestObject.pocketStr = arr['name'] = a['name'];
            return arr;
        }
    }
};
var vestBottom = function (x) {
    var obj = _vestObject.bottom;
    var id = x ? x : vestObject.bottom;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            vestObject.bottom = arr['id'] = a['id'];
            vestObject.bottomStr = arr['name'] = a['name'];
            return arr;
        }
    }
};
var vestBack = function (x) {
    var obj = _vestObject.back;
    var id = x ? x : vestObject.back;
    var arr = [];
    for (i in obj) {
        var a = obj[i];
        if (id === a['id']) {
            vestObject.back = arr['id'] = a['id'];
            vestObject.backStr = arr['name'] = a['name'];
            return arr;
        }
    }
};
function setDefaultValue() {
    fabricObj();
    contrastObj();
    liningObj();
    pipingObj();
    backcollarObj();
    buttonObj();
    HButtonObj();
    handTopStitchingColorObj();
    monogramHoleObj();

    jacketButton();
    jacketLapel();
    jacketBottom();
    jacketPocket();
    jacketSleeve();
    jacketSleeve();
    jacketBack();

    pantStyle();
    pantPleats();
    pantPocket();
    pantBackPocket();
    pantBeltloops();
    pantCuff();

    vestNeckLine();
    vestButton();
    vestPocket();
    vestBottom();
    vestBack();
}