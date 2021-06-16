$(document).ready(function () {
    $('#frmBodySize').FrmMeasurementValidation();
    $('#frmBodySize input[name="unit"]').EventBodySizeRadio(); /*BODY MEASUREMENTS*/

    $('#frmStandardSize .JSselectbox').JsSelectBox(); /*SML MEASUREMENTS*/
    $('#frmStandardSize input[name="unit"]').EventStandardSizeRadio(); /*SML MEASUREMENTS*/
    $('#frmStandardSize').EventInputFocus(); /*SML MEASUREMENTS*/
    $('.zoom-image-size').zoomImageSize();
});
/*==============================================================================
 * SELECT MEASUREMENTS BODY
 * =============================================================================*/
var FrmMeaBodySize = {'unit': 'inch', 'pd': '', 'type': '', 'max': '', 'min': '', '_this': '', 'val': '', status: false};
$.fn.EventBodySizeRadio = function () {
    $(this).change(function () {
        var value = $(this).val();
        FrmMeaBodySize.unit = value;
        $('#frmBodySize .tag-unit').text(value);
    });
};
$.fn.FrmMeasurementValidation = function () {
    var frm = $(this), recommentStatus = false;
    frm.find('input').focus(function () {
        $('#jk-size-detail, #pt-size-detail, #vt-size-detail, #ct-size-detail').text('');

        /*condition recomend size*/
        var name = $(this).attr('data-sizename');
        if (name === "SHOULDER" && !$('#frmBodySize [name="jacket-CHEST"], #frmBodySize [name="vest-CHEST"], #frmBodySize [name="coat-CHEST"]').val()) {
            messages({file: "error-measurement-chest-size", typeMessage: "suit3pcs"});
            $('#frmBodySize [name="jacket-CHEST"], #frmBodySize [name="vest-CHEST"]').focus();
            return false;
        }
        else {
            $(this).checkValue();
            recommentStatus = true;
        }

        if (name === "CROTCH" && !$('#frmBodySize [name="pant-CROTCH"]').val()) {
            messages({file: "error-measurement-chest-size", typeMessage: "suit3pcs"});
            $('#frmBodySize [name="pant-WAIST"]').focus();
            return false;
        } else {
            $(this).checkValue();
            recommentStatus = true;
        }
        
        if (recommentStatus === true) {
            strRecomend();
        }
        else {
            recommentStatus = false;
        }
    });
    frm.find('input').focusout(function () {
        $('#jk-size-detail, #pt-size-detail, #vt-size-detail, #ct-size-detail').text('');
        $(this).checkValue();
        validationError();
    });

    /*Event KeyUp*/
    frm.find('input').keyup(function () {
        var val = $(this).val();
        val = CheckInputNumber(val);
        if (val) {
            $(this).val(val);
            $(this).checkValue();
            validationError();
        }
    });
    /*Event Submit*/
    frm.submit(function () {
        checkFrmSubmit();
        var status = true;
        var length = frm.find('.validationError').length;
        if (length > 0) {
            status = false;
        } else {
            return true;
        }
        if (!status) {
            messages({file: "error-measurements", typeMessage: "suit3pcs"});
            return false;
        }
    });
    $.fn.checkValue = function (event) {
        var _this = $(this);
        var pd = _this.parents('ul').attr('data-sizeProduct');
        var type = _this.attr('data-sizeName');
        var val = _this.val();
        if ((type === 'CHEST' || type === 'WAIST') && event !== "submit") {
            /*set length and sleeve jack size*/
            if ((pd === "jacket" || pd === "coat") && (type === "CHEST")) {
                jackShoulderSize(pd, val);
                jacketLengthAndSleeve(pd, val);
                var size = designObject.measurementSize.body[pd][FrmMeaBodySize.unit].SHOULDER.size;
                if (size) {
                    $("#frmBodySize input[name='" + pd + "-SHOULDER']").val(size);
                }
            } else if (pd === "pant") {
                PantCrotch(val);
                var size = designObject.measurementSize.body.pant[FrmMeaBodySize.unit].CROTCH.size;
                if (size) {
                    $("#frmBodySize input[name='pant-CROTCH']").val(size);
                }

                if (size === 0) {
                    $("#frmBodySize input[name='pant-CROTCH']").val('0');
                }
            } else if (pd === "vest") {
                vestShoulderSize(val);
                var size = designObject.measurementSize.body.vest[FrmMeaBodySize.unit].SHOULDER.size;
                if (size) {
                    $("#frmBodySize input[name='vest-SHOULDER']").val(size);
                }
            }
        }

        /*function edit bug shoulder size after login get size user not length title number*/
        if (type === "SHOULDER" && (pd === "jacket" || pd === "coat")) {
//            var val = $("#frmBodySize input[name='" + pd + "-CHEST']").val();
//            jackShoulderSize(pd, val);
//            jacketLengthAndSleeve(pd, val);
        }

        var data = designObject.measurementSize.body[pd][FrmMeaBodySize.unit][type];
        if (data !== undefined) {
            var min = data.min;
            var max = data.max;
        } else {
            var min = 0;
            var max = 0;
        }
        /*set val*/
        FrmMeaBodySize._this = _this;
        FrmMeaBodySize.pd = pd;
        FrmMeaBodySize.type = type;
        FrmMeaBodySize.val = val;
        FrmMeaBodySize.min = min;
        FrmMeaBodySize.max = max;
    };

    function checkFrmSubmit() {
        frm.find('input[type="text"]').each(function () {
            $(this).checkValue("submit");
            validationError();
        });
    }
    function strRecomend() {
        var sizeType = FrmMeaBodySize.unit;
        var pd = FrmMeaBodySize.pd;
        var type = FrmMeaBodySize.type;
        var min = FrmMeaBodySize.min;
        var max = FrmMeaBodySize.max;
        var val = FrmMeaBodySize.val;
        var _this = FrmMeaBodySize._this;

        var styleTypeStr = publicObject.languageObj[type.toLowerCase()];
        var rangeSizeStr = publicObject.languageObj['size-geneally-range'];
        var toStr = publicObject.languageObj['to'];

        /*Change Recommend Str Size*/
        if (min && max) {
            var str = styleTypeStr + " " + rangeSizeStr + " " + min + " " + toStr + " " + max + " " + sizeType;
            switch (pd) {
                case "jacket":
                    $('#jk-size-detail').text(str);
                    break;
                case "pant":
                    $('#pt-size-detail').text(str);
                    break;
                case "vest":
                    $('#vt-size-detail').text(str);
                    break;
                case "coat":
                    $('#ct-size-detail').text(str);
                    break;
            }
        }
        /*Change Image Recommend*/
        switch (pd + '-' + type) {
            case "jacket-CHEST":
                type = "CHEST";
                break;
            case "jacket-WAIST":
                type = "STOMACH";
                break;
            case "jacket-HIP":
                type = "HIP";
                break;
            case "jacket-SHOULDER":
                type = "SHOULDER";
                break;
            case "jacket-SLEEVE":
                type = "SLEEVE";
                break;
            case "jacket-LENGTH":
                type = "LENGTH";
                break;
            case "pant-WAIST":
                type = "PantWaist";
                break;
            case "pant-HIP":
                type = "PantHip";
                break;
            case "pant-CROTCH":
                type = "PantCrotch";
                break;
            case "pant-THIGH":
                type = "PantThigh";
                break;
            case "pant-LENGTH":
                type = "PantLength";
                break;
            case "vest-LENGTH":
                type = "VestLength";
                break;
            case "coat-LENGTH":
                type = "CoatLength";
                break;
            default :
                break;
        }
        changeMedia(type, pd);
    }
    function validationError() {
        var sizeType = FrmMeaBodySize.unit;
        var pd = FrmMeaBodySize.pd;
        var type = FrmMeaBodySize.type;
        var min = FrmMeaBodySize.min;
        var max = FrmMeaBodySize.max;
        var val = FrmMeaBodySize.val;
        var _this = FrmMeaBodySize._this;
        if (_this) {
            if (!min && !max) {
                /*condition lang pant and vest*/
                if (type === "LENGTH") {
                    if (!val || !(/^-{0,1}\d*\.{0,1}\d+$/).test(val)) {
                        _this.addClass('validationError');
                    } else {
                        _this.removeClass('validationError');
                    }
                }
            } else {
                if (val > max || val < min || !val || !(/^-{0,1}\d*\.{0,1}\d+$/).test(val)) {
                    _this.addClass('validationError');
                } else {
                    _this.removeClass('validationError');
                }
            }
        }
    }
};
function tabmeasurements() {
    if (designObject.subMenuMain === "menu-body-size" || designObject.subMenuMain === "menu-standard-size") {
        $('#menu').css({'width': '14.35%'});
        $('#menu-main').css({'width': '100%'});
    } else {
        $('#menu').css({'width': '28.5%'});
        $('#menu-main').css({'width': '50%'});
    }
}
function jackShoulderSize(pd, a) {
    var a, b = 1, maxInch, minInch, maxCm, minCm, sizeInch, sizeCm;
    if (FrmMeaBodySize.unit === "cm") {
        b = 2.54;
    }

    if (a <= (b * 33.75)) {
        sizeInch = '';
        sizeCm = '';
        minInch = 14;
        maxInch = 27;
        minCm = 35;
        maxCm = 69;
    } else if (a > (b * 33.75) && a <= (b * 35.75)) {
        sizeInch = 16;
        sizeCm = 40.5;
        minInch = 15;
        maxInch = 17;
        minCm = 37.95;
        maxCm = 43;
    } else if (a > (b * 35.75) && a <= (b * 37.75)) {
        sizeInch = 17;
        sizeCm = 43;
        minInch = 16;
        maxInch = 18;
        minCm = 40.5;
        maxCm = 45.5;
    } else if (a > (b * 37.75) && a <= (b * 39.75)) {
        sizeInch = 18;
        sizeCm = 45.75;
        minInch = 17;
        maxInch = 19;
        minCm = 43.2;
        maxCm = 48.3;
    } else if (a > (b * 39.75) && a <= (b * 41.75)) {
        sizeInch = 18.5;
        sizeCm = 47;
        minInch = 17.5;
        maxInch = 19.5;
        minCm = 44.5;
        maxCm = 49.55;
    } else if (a > (b * 41.75) && a <= (b * 43.75)) {
        sizeInch = 19;
        sizeCm = 48.25;
        minInch = 18.5;
        maxInch = 20.5;
        minCm = 45.7;
        maxCm = 50.8;
    } else if (a > (b * 43.75) && a <= (b * 45.75)) {
        sizeInch = 20;
        sizeCm = 51;
        minInch = 19;
        maxInch = 21;
        minCm = 48.45;
        maxCm = 53.55;
    } else if (a > (b * 45.75) && a <= (b * 47.75)) {
        sizeInch = 20.5;
        sizeCm = 52;
        minInch = 19.5;
        maxInch = 21.5;
        minCm = 49.45;
        maxCm = 54.55;
    } else if (a > (b * 47.75) && a <= (b * 49.75)) {
        sizeInch = 21.5;
        sizeCm = 54.5;
        minInch = 20.5;
        maxInch = 22.5;
        minCm = 51.95;
        maxCm = 57.05;
    } else if (a > (b * 49.75) && a <= (b * 51.75)) {
        sizeInch = 21.75;
        sizeCm = 55.25;
        minInch = 20.75;
        maxInch = 22.75;
        minCm = 52.7;
        maxCm = 57.8;
    } else if (a > (b * 51.75) && a <= (b * 53.75)) {
        sizeInch = 22;
        sizeCm = 56;
        minInch = 21;
        maxInch = 23;
        minCm = 53.45;
        maxCm = 58.5;
    } else if (a > (b * 53.75) && a <= (b * 55.75)) {
        sizeInch = 22.25;
        sizeCm = 56.5;
        minInch = 21.25;
        maxInch = 23.25;
        minCm = 53.95;
        maxCm = 59;
    } else if (a > (b * 55.75) && a <= (b * 57.75)) {
        sizeInch = 22.5;
        sizeCm = 57.25;
        minInch = 21.5;
        maxInch = 23.5;
        minCm = 54.7;
        maxCm = 59.8;
    } else if (a > (b * 57.75)) {
        sizeInch = '';
        sizeCm = '';
        minInch = 14;
        maxInch = 27;
        minCm = 35;
        maxCm = 69;
    } else {
        /***/
    }
    designObject.measurementSize.body[pd].cm.SHOULDER.min = minCm;
    designObject.measurementSize.body[pd].cm.SHOULDER.max = maxCm;
    designObject.measurementSize.body[pd].inch.SHOULDER.min = minInch;
    designObject.measurementSize.body[pd].inch.SHOULDER.max = maxInch;

    designObject.measurementSize.body[pd].cm.SHOULDER['size'] = sizeCm;
    designObject.measurementSize.body[pd].inch.SHOULDER['size'] = sizeInch;
    return true;
}
function jacketLengthAndSleeve(pd, a) {
    var a, b = 1, lengthMaxInch, lengthMinInch, lengthMaxCm, lengthMinCm, sleeveMaxInch, sleeveMinInch, sleeveMaxCm, sleeveMinCm;
    if (FrmMeaBodySize.unit === "cm") {
        b = 2.54;
    }
    if (a <= (b * 33)) {
        lengthMinInch = 19;
        lengthMaxInch = 42;
        lengthMinCm = 48;
        lengthMaxCm = 108;
        sleeveMinInch = 18;
        sleeveMaxInch = 30;
        sleeveMinCm = 46;
        sleeveMaxCm = 77;
    } else if (a > (b * 33) && a <= (b * 35)) {
        lengthMinInch = 25;
        lengthMaxInch = 31;
        lengthMinCm = 63.5;
        lengthMaxCm = 78.75;
        sleeveMinInch = 21;
        sleeveMaxInch = 26.5;
        sleeveMinCm = 53.5;
        sleeveMaxCm = 67.5;
    } else if (a > (b * 35) && a <= (b * 37)) {
        lengthMinInch = 26;
        lengthMaxInch = 32;
        lengthMinCm = 66;
        lengthMaxCm = 81.25;
        sleeveMinInch = 22;
        sleeveMaxInch = 27;
        sleeveMinCm = 55.75;
        sleeveMaxCm = 68.5;
    } else if (a > (b * 37) && a <= (b * 39)) {
        lengthMinInch = 27;
        lengthMaxInch = 33;
        lengthMinCm = 68.5;
        lengthMaxCm = 83.75;
        sleeveMinInch = 22.5;
        sleeveMaxInch = 27.5;
        sleeveMinCm = 57;
        sleeveMaxCm = 70;
    } else if (a > (b * 39) && a <= (b * 41)) {
        lengthMinInch = 27.5;
        lengthMaxInch = 33;
        lengthMinCm = 70;
        lengthMaxCm = 84;
        sleeveMinInch = 22.75;
        sleeveMaxInch = 27.5;
        sleeveMinCm = 57.75;
        sleeveMaxCm = 70;
    } else if (a > (b * 41) && a <= (b * 43)) {
        lengthMinInch = 28;
        lengthMaxInch = 34;
        lengthMinCm = 71;
        lengthMaxCm = 86.25;
        sleeveMinInch = 23.25;
        sleeveMaxInch = 27.5;
        sleeveMinCm = 58.5;
        sleeveMaxCm = 70;
    } else if (a > (b * 43) && a <= (b * 45)) {
        lengthMinInch = 29;
        lengthMaxInch = 34.5;
        lengthMinCm = 73.5;
        lengthMaxCm = 87.75;
        sleeveMinInch = 23.25;
        sleeveMaxInch = 27.5;
        sleeveMinCm = 59;
        sleeveMaxCm = 70;
    } else if (a > (b * 45) && a <= (b * 47)) {
        lengthMinInch = 30;
        lengthMaxInch = 35;
        lengthMinCm = 76;
        lengthMaxCm = 89;
        sleeveMinInch = 23.5;
        sleeveMaxInch = 28;
        sleeveMinCm = 59.75;
        sleeveMaxCm = 71;
    } else if (a > (b * 47) && a <= (b * 49)) {
        lengthMinInch = 30;
        lengthMaxInch = 35;
        lengthMinCm = 76;
        lengthMaxCm = 89;
        sleeveMinInch = 24;
        sleeveMaxInch = 28;
        sleeveMinCm = 61;
        sleeveMaxCm = 71;
    } else if (a > (b * 49) && a <= (b * 51)) {
        lengthMinInch = 30;
        lengthMaxInch = 36;
        lengthMinCm = 76;
        lengthMaxCm = 89;
        sleeveMinInch = 24;
        sleeveMaxInch = 29;
        sleeveMinCm = 61;
        sleeveMaxCm = 73.5;
    } else if (a > (b * 51) && a <= (b * 53)) {
        lengthMinInch = 31;
        lengthMaxInch = 36;
        lengthMinCm = 78.75;
        lengthMaxCm = 91.5;
        sleeveMinInch = 24;
        sleeveMaxInch = 29;
        sleeveMinCm = 61;
        sleeveMaxCm = 73.5;
    } else if (a > (b * 53) && a <= (b * 55)) {
        lengthMinInch = 31;
        lengthMaxInch = 38;
        lengthMinCm = 78.75;
        lengthMaxCm = 96.5;
        sleeveMinInch = 24;
        sleeveMaxInch = 29;
        sleeveMinCm = 61;
        sleeveMaxCm = 73.5;
    } else if (a > (b * 55) && a <= (b * 57)) {
        lengthMinInch = 31;
        lengthMaxInch = 38;
        lengthMinCm = 78.75;
        lengthMaxCm = 96.5;
        sleeveMinInch = 24;
        sleeveMaxInch = 29;
        sleeveMinCm = 61;
        sleeveMaxCm = 73.5;
    } else if (a > (b * 57)) {
        lengthMinInch = 31;
        lengthMaxInch = 38;
        lengthMinCm = 48;
        lengthMaxCm = 108;
        sleeveMinInch = 24;
        sleeveMaxInch = 29;
        sleeveMinCm = 46;
        sleeveMaxCm = 77;
    } else {
        /***/
    }

    /*condition overcoat length*/
    if (pd === "coat") {
        lengthMinCm = 1;
        lengthMaxCm = 140;
        lengthMinInch = 1;
        lengthMaxInch = 55;
    }

    designObject.measurementSize.body[pd].cm.LENGTH.min = lengthMinCm;
    designObject.measurementSize.body[pd].cm.LENGTH.max = lengthMaxCm;
    designObject.measurementSize.body[pd].inch.LENGTH.min = lengthMinInch;
    designObject.measurementSize.body[pd].inch.LENGTH.max = lengthMaxInch;

    designObject.measurementSize.body[pd].cm.SLEEVE.min = sleeveMinCm;
    designObject.measurementSize.body[pd].cm.SLEEVE.max = sleeveMaxCm;
    designObject.measurementSize.body[pd].inch.SLEEVE.min = sleeveMinInch;
    designObject.measurementSize.body[pd].inch.SLEEVE.max = sleeveMaxInch;
    return true;
}
function PantCrotch(a) {
    var a, b = 1, sizeInch, sizeCm;
    if (FrmMeaBodySize.unit === "cm") {
        b = 2.54;
    }

    if (a <= (b * 28)) {
        sizeInch = 0;
        sizeCm = 0;
    } else if (a > (b * 28) && a <= (b * 31.75)) {
        sizeInch = 24.5;
        sizeCm = 62.25;
    } else if (a > (b * 31.75) && a <= (b * 35.75)) {
        sizeInch = 26;
        sizeCm = 66;
    } else if (a > (b * 35.75) && a <= (b * 37.75)) {
        sizeInch = 27;
        sizeCm = 68.5;
    } else if (a > (b * 37.75) && a <= (b * 39.75)) {
        sizeInch = 28;
        sizeCm = 71;
    } else if (a > (b * 39.75) && a <= (b * 41.75)) {
        sizeInch = 29;
        sizeCm = 73.5;
    } else if (a > (b * 41.75) && a <= (b * 43.75)) {
        sizeInch = 30.5;
        sizeCm = 77.5;
    } else if (a > (b * 43.75) && a <= (b * 45.75)) {
        sizeInch = 31.5;
        sizeCm = 80;
    } else if (a > (b * 45.75) && a <= (b * 47.75)) {
        sizeInch = 32;
        sizeCm = 81.25;
    } else if (a > (b * 45.75) && a <= (b * 47.75)) {
        sizeInch = 32;
        sizeCm = 81.25;
    } else if (a > (b * 47.75) && a <= (b * 49.75)) {
        sizeInch = 32.5;
        sizeCm = 82.5;
    } else if (a > (b * 49.75) && a <= (b * 51.75)) {
        sizeInch = 33;
        sizeCm = 83.75;
    } else if (a > (b * 51.75) && a <= (b * 53.75)) {
        sizeInch = 33.5;
        sizeCm = 85;
    } else if (a > (b * 53.75)) {
        sizeInch = 34;
        sizeCm = 86.25;
    } else {
        /***/
    }
    designObject.measurementSize.body.pant.cm.CROTCH['size'] = sizeCm;
    designObject.measurementSize.body.pant.inch.CROTCH['size'] = sizeInch;
    return true;
}
function vestShoulderSize(a) {
    var a, b = 1, maxInch, minInch, maxCm, minCm, sizeInch, sizeCm;
    if (FrmMeaBodySize.unit === "cm") {
        b = 2.54;
    }

    if (a <= (b * 33.75)) {
        sizeInch = '';
        sizeCm = '';
        minInch = 14;
        maxInch = 27;
        minCm = 35;
        maxCm = 69;
    } else if (a > (b * 33.75) && a <= (b * 35.75)) {
        sizeInch = 14;
        sizeCm = 35.5;
        minInch = 13;
        maxInch = 15;
        minCm = 33;
        maxCm = 38;
    } else if (a > (b * 35.75) && a <= (b * 37.75)) {
        sizeInch = 15.5;
        sizeCm = 39.5;
        minInch = 14.5;
        maxInch = 16.5;
        minCm = 37;
        maxCm = 42;
    } else if (a > (b * 37.75) && a <= (b * 39.75)) {
        sizeInch = 15.5;
        sizeCm = 39.5;
        minInch = 14.5;
        maxInch = 16.5;
        minCm = 37;
        maxCm = 42;
    } else if (a > (b * 39.75) && a <= (b * 41.75)) {
        sizeInch = 15.5;
        sizeCm = 39.5;
        minInch = 15.5;
        maxInch = 17.5;
        minCm = 37;
        maxCm = 42;
    } else if (a > (b * 41.75) && a <= (b * 43.75)) {
        sizeInch = 16.5;
        sizeCm = 42;
        minInch = 15.5;
        maxInch = 17.5;
        minCm = 39.5;
        maxCm = 44.5;
    } else if (a > (b * 43.75) && a <= (b * 45.75)) {
        sizeInch = 17.25;
        sizeCm = 44;
        minInch = 16.25;
        maxInch = 18.25;
        minCm = 41.25;
        maxCm = 46.5;
    } else if (a > (b * 45.75) && a <= (b * 47.75)) {
        sizeInch = 17.5;
        sizeCm = 44.5;
        minInch = 16.25;
        maxInch = 18.25;
        minCm = 41;
        maxCm = 47;
    } else if (a > (b * 47.75) && a <= (b * 49.75)) {
        sizeInch = 18;
        sizeCm = 45.75;
        minInch = 17;
        maxInch = 19;
        minCm = 43;
        maxCm = 48.25;
    } else if (a > (b * 49.75) && a <= (b * 51.75)) {
        sizeInch = 19.5;
        sizeCm = 45.5;
        minInch = 18.5;
        maxInch = 20.25;
        minCm = 47;
        maxCm = 52;
    } else if (a > (b * 51.75) && a <= (b * 53.75)) {
        sizeInch = 19.5;
        sizeCm = 49.5;
        minInch = 18.5;
        maxInch = 20.5;
        minCm = 47;
        maxCm = 52;
    } else if (a > (b * 53.75) && a <= (b * 55.75)) {
        sizeInch = 19.75;
        sizeCm = 50;
        minInch = 18.75;
        maxInch = 20.75;
        minCm = 47.75;
        maxCm = 52.75;
    } else if (a > (b * 55.75) && a <= (b * 57.75)) {
        sizeInch = 20;
        sizeCm = 51;
        minInch = 19;
        maxInch = 21;
        minCm = 48.25;
        maxCm = 53.25;
    } else if (a > (b * 57.75)) {
        sizeInch = '';
        sizeCm = '';
        minInch = 14;
        maxInch = 27;
        minCm = 35;
        maxCm = 69;
    } else {
        /***/
    }
    designObject.measurementSize.body.vest.cm.SHOULDER.min = minCm;
    designObject.measurementSize.body.vest.cm.SHOULDER.max = maxCm;
    designObject.measurementSize.body.vest.inch.SHOULDER.min = minInch;
    designObject.measurementSize.body.vest.inch.SHOULDER.max = maxInch;

    designObject.measurementSize.body.vest.cm.SHOULDER['size'] = sizeCm;
    designObject.measurementSize.body.vest.inch.SHOULDER['size'] = sizeInch;
    return true;
}

/*==============================================================================
 * SELECT MEASUREMENTS SML
 * =============================================================================*/
$.fn.JsSelectBox = function () {
    var _this = $(this);
    var _List = $('.JSselectboxList');
    var _ListLi = $('.JSselectboxList ul');
    _this.click(function () {
        $('.JSselectboxList').slideUp();
        $(this).find('.JSselectboxList').find('li').show();
        $(this).find('.JSselectboxList').stop().slideToggle();
    });
    $(_ListLi).delegate('li', 'click', function () {
        var value = $(this).data('js');
        var str = $(this).text();
        var id = $(this).parents('.JSselectbox').attr('id');
        $(this).parents('.JSselectbox').find('.JSselectVal').text(str).attr('data-value', value);
        $(this).parents('.JSselectbox').find('input').attr('value', value);
        if (id !== "selectSizeType") {
            changStandardSize();
        } else {
            changeStandardsizeNo(function () {
                changStandardSize();
            });
        }
    });
    $(document).click(function (e) {
        var a = $(e.target).parents('.JSselectbox').hasClass('JSselectbox');
        var b = $(e.target).attr('class');
        if (!a && b !== "JSselectbox") {
            _List.slideUp();
        }
    });
};
$.fn.EventStandardSizeRadio = function () {
    $(this).change(function () {
        var value = $(this).val();
        $('#frmStandardSize .tag-unit').text(value);
        changStandardSize();
    });
};
$.fn.EventInputFocus = function () {
    var frm = $(this);
    frm.find('input').focus(function () {
        var type = $(this).attr('data-sizeName');
        switch ((type).toUpperCase()) {
            case "JACKET-SLEEVE":
                type = "SLEEVE";
                break;
            case "JACKET-LENGTH":
                type = "LENGTH";
                break;
            case "PANT-WAIST":
                type = "PantWaist";
                break;
            case "PANT-LENGTH":
                type = "PantLength";
                break;
            case "VEST-LENGTH":
                type = "VestLength";
                break;
            case "COAT-SLEEVE":
                type = "SLEEVE";
                break;
            case "COAT-LENGTH":
                type = "CoatLength";
                break;
        }
        changeMedia(type, $(this).closest(".measusrement-table").data("sizeproduct"));
    });

    function changeVideo() {

    }
};
$.fn.zoomImageSize = function () {
    $(this).click(function () {
        var par = "type=" + $(this).attr('data-par');
        messages({file: "zoom-image-size", par: par, typeMessage: "suit3pcs"});
    });
};
function changStandardSize() {
    var arr = designObject.measurementSize.standard;
    var unit = $('#frmStandardSize input[name=unit]:checked').val();
    var sizeNo = $('#StandardsizeNo input').val();
    $('#frmStandardSize li').each(function () {
        var _this = $(this);
        var pd = _this.parents('ul').attr('data-sizeproduct');
        var str = _this.attr('data-stdsize');
        if (pd && str) {
            var value = arr[unit][pd][sizeNo][str];
            /*change*/
            _this.find('input').val(value);
            _this.find('span').text(value);
        }
    });
}
function changeStandardsizeNo(callback) {
    var tagMain = $('#StandardsizeNo ul');
    var arr = designObject.measurementSize.standard;
    var sizeType = $('#selectSizeType input').val();
    var unit = $('#frmStandardSize input[name=unit]:checked').val();
    var noArr = arr.inch.jacket;
    tagMain.find('li').remove();
    tagMain.parents('#StandardsizeNo').find('input').val(0);
    tagMain.parents('#StandardsizeNo').find('.JSselectVal').text(noArr[0][sizeType]);
    for (var i in noArr) {
        var sizeNo = noArr[i][sizeType];
        var li = $('<li>').attr('data-js', i).text(sizeNo);
        li.appendTo(tagMain);
    }
    if (callback) {
        callback();
    }
}
function changeMedia(type, prd) {
    var language = $('.list-language').val();
    if (type !== "CoatLength") {
        var path = "../images/web/measurement/measure_suit/" + language + "/" + type + ".jpg";
    } else {
        var path = "../images/web/measurement/measure_coat/" + language + "/" + type + ".jpg";
    }
    $('.imgRecommendSize').attr('src', path);
    $('.zoom-image-size').attr({'data-par': type});

    switch (type) {
        case "PantHip":
            type = "HIP";
            break;
    }
    
    var tag = "<video width='100%' height='100%' title='' autoplay='autoplay' loop='loop' preload='auto' onended='var v=this;setTimeout(function(){v.play()},100)' controls=''>";
    tag += "<source src='../Environment/Assets/Video/Measurement/Men/Suit3pcs/" + prd + "/" + type + ".ogv' type='video/ogg'/>";
    tag += "<source src='../Environment/Assets/Video/Measurement/Men/Suit3pcs/" + prd + "/" + type + ".mp4' type='video/mp4'/>";
    tag += "</video>";
    
    var displayStatus = $('.tab-standard-size').css('display');
    if (displayStatus == 'none') {
        $('.tab-body-size .border-vdo').empty().append(tag);
    }
    else {
        $('.tab-standard-size .border-vdo').empty().append(tag);
    }
}

/*VDO*/
var repeatCounter = 0, ytPlayer;
function onYouTubePlayerReady() {
    ytPlayer = document.getElementById("ytPlayer");
    ytPlayer.addEventListener("onStateChange", "onPlayerStateChange");
    ytPlayer.playVideo();
}
function onPlayerStateChange(newState) {
    if (newState === 0) {
        ytPlayer.seekTo(0, true);
        repeatCounter += 1;
    }
}