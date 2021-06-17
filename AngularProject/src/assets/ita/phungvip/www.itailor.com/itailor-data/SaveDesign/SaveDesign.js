
(function (designObject, iTailorObject, jacketObject, pantObject, vestObject) {
    var mainProject, measureProduct;

    mainProject = designObject.project.toUpperCase();
    measureProduct = mainProject.toLowerCase();

    if (["suit", "suit3pcs", "tuxedo"].indexOf(designObject.project.toLowerCase()) > -1) {
        mainProject = "JACKET";
    }

    iTailorObject.SDID = getSaveDesign(mainProject, "SDID", false);

    if (iTailorObject.SDID === false) {
        return false;
    }

    $(document).ready(function () {
        if (mainProject === "VEST") {
            iTailorObject.lining = vestObject.lining;
            iTailorObject.liningStr = vestObject.lining;
            iTailorObject.piping = vestObject.piping;
            iTailorObject.pipingStr = vestObject.piping;
            iTailorObject.buttonColor = vestObject.buttonColor;
            iTailorObject.buttonColorStr = vestObject.buttonColorStr;
            iTailorObject.HButton = vestObject.HButton;
            iTailorObject.HButtonStr = vestObject.HButtonStr;
        }

        if (mainProject === "COAT") {
            jacketObject = iTailorObject;
            pantObject = iTailorObject;
            vestObject = iTailorObject;
        }

        (function () {
            if (iTailorObject.shoulderOption === "Y") {
                $("#menu-l-checkbox-shoulderOption").prop("checked", true);
            }

            if (iTailorObject.sleeveOption === "Y") {
                $("#menu-l-checkbox-sleeveOption").prop("checked", true);
            }

            $('input[name="lapelBtnHole"]').each(function () {
                if ($(this).val() === jacketObject.lapelBtnHole) {
                    $(this).prop("checked", true);
                }
            });

            if (jacketObject.breastPocket === "Y") {
                $("#menu-l-checkbox-breastPocket").prop("checked", true);
            }

            $('input[name="backPocketOption"]').each(function () {
                if ($(this).val() === pantObject.backPocketOption) {
                    $(this).prop("checked", true);
                }
            });

            $('input[name="waisband"]').each(function () {
                if ($(this).val() === pantObject.waisband) {
                    $(this).prop("checked", true);
                }
            });

            if (jacketObject.lapelUpper === "Y") {
                $("#menu-l-checkbox-lapelUpper").prop("checked", true);
            }

            if (jacketObject.lapelLower === "Y") {
                $("#menu-l-checkbox-lapelLower").prop("checked", true);
            }

            if (jacketObject.contrastPocket === "Y") {
                $("#menu-l-checkbox-contrastPocket").prop("checked", true);
            }

            if (jacketObject.contrastChest === "Y") {
                $("#menu-l-checkbox-contrastChest").prop("checked", true);
            }

            if (jacketObject.contrastElbow === "Y") {
                $("#menu-l-checkbox-contrastElbow").prop("checked", true);
            }

            if (jacketObject.contrastTrimming === "Y") {
                $("#menu-l-checkbox-contrastTrimming").prop("checked", true);
            }

            if (pantObject.contrastBelt === "Y") {
                $("#menu-l-checkbox-contrastBelt").prop("checked", true);
            }

            if (pantObject.contrastBackPocket === "Y") {
                $("#menu-l-checkbox-contrastBackPocket").prop("checked", true);
            }

            if (pantObject.contrastPantTab === "Y") {
                $("#menu-l-checkbox-contrastPantTab").prop("checked", true);
            }

            $('input[name="liningStyle"]').each(function () {
                if ($(this).val() === jacketObject.liningStyle) {
                    $(this).prop("checked", true);
                }
            });

            $('input[name="handTopStitching"]').each(function () {
                if ($(this).val() === iTailorObject.handTopStitching) {
                    $(this).prop("checked", true);
                }
            });

            $('input[name="handTopStitchingOpt"]').each(function () {
                if ($(this).val() === iTailorObject.handTopStitchingOpt) {
                    $(this).prop("checked", true);
                }
            });

            if (vestObject.contrastVestPocket === "Y") {
                $("#menu-l-checkbox-contrastVestPocket").prop("checked", true);
            }

            if (vestObject.contrastVestLapel === "Y") {
                $("#menu-l-checkbox-contrastVestLapel").prop("checked", true);
            }

            if (getSaveDesign(mainProject, "TYPE_SHSIZE", "").toLowerCase() === "body") {
                $('.tab-body-size input[name="unit"]').each(function () {
                    if ($(this).val() === getSaveDesign(mainProject, "unit", "")) {
                        $(this).prop("checked", true);
                    }
                });
                
                $('.tab-body-size input[name="' + measureProduct + '-CHEST"]').val(getSaveDesign(mainProject, "CHEST", ""));
                $('.tab-body-size input[name="' + measureProduct + '-WAIST"]').val(getSaveDesign(mainProject, "WAIST", ""));
                $('.tab-body-size input[name="' + measureProduct + '-HIP"]').val(getSaveDesign(mainProject, "HIP", ""));
                $('.tab-body-size input[name="' + measureProduct + '-SHOULDER"]').val(getSaveDesign(mainProject, "SHOULDER", ""));
                $('.tab-body-size input[name="' + measureProduct + '-SLEEVE"]').val(getSaveDesign(mainProject, "SLEEVE", ""));
                $('.tab-body-size input[name="' + measureProduct + '-LENGTH"]').val(getSaveDesign(mainProject, "LENGTH", ""));

                $('.tab-body-size input[name="pant-WAIST"]').val(getSaveDesign("PANT", "WAIST", ""));
                $('.tab-body-size input[name="pant-HIP"]').val(getSaveDesign("PANT", "HIP", ""));
                $('.tab-body-size input[name="pant-CROTCH"]').val(getSaveDesign("PANT", "CROTCH", ""));
                $('.tab-body-size input[name="pant-THIGH"]').val(getSaveDesign("PANT", "THIGH", ""));
                $('.tab-body-size input[name="pant-LENGTH"]').val(getSaveDesign("PANT", "LENGTH", ""));

                $('.tab-body-size input[name="vest-LENGTH"]').val(getSaveDesign("VEST", "LENGTH", ""));

                $('.tab-body-size input[name="sizeFit"]').each(function () {
                    if ($(this).val() === getSaveDesign(mainProject, "sizeFit", "")) {
                        $(this).prop("checked", true);
                    }
                });

                if (mainProject === "SHIRT") {
                    $('.tab-body-size input[name="sizeType"]').each(function () {
                        if ($(this).val() === getSaveDesign(mainProject, "sizeType", "")) {
                            $(this).prop("checked", true);
                        }
                    });

                    $('.tab-body-size input[name="sizeNeck"]').val(getSaveDesign(mainProject, "sizeNeck", ""));
                    $('.tab-body-size input[name="sizeChest"]').val(getSaveDesign(mainProject, "sizeChest", ""));
                    $('.tab-body-size input[name="sizeWaist"]').val(getSaveDesign(mainProject, "sizeWaist", ""));
                    $('.tab-body-size input[name="sizeHip"]').val(getSaveDesign(mainProject, "sizeHip", ""));
                    $('.tab-body-size input[name="sizeLength"]').val(getSaveDesign(mainProject, "sizeLength", ""));
                    $('.tab-body-size input[name="sizeShoulder"]').val(getSaveDesign(mainProject, "sizeShoulder", ""));
                    $('.tab-body-size input[name="sizeSleeve"]').val(getSaveDesign(mainProject, "sizeSleeve", ""));
                }
            } else {
                $('.tab-standard-size input[name="unit"]').each(function () {
                    if ($(this).val() === getSaveDesign(mainProject, "unit", "")) {
                        $(this).prop("checked", true);
                    }
                });

                if (mainProject === "SHIRT") {
                    $('.tab-standard-size input[name="sizeType"]').each(function () {
                        if ($(this).val() === getSaveDesign(mainProject, "sizeType", "")) {
                            $(this).prop("checked", true);
                        }
                    });
                }

                $('.tab-standard-size input[name="' + measureProduct + '-SLEEVE"]').val(getSaveDesign(mainProject, "SLEEVE", ""));
                $('.tab-standard-size input[name="' + measureProduct + '-LENGTH"]').val(getSaveDesign(mainProject, "LENGTH", ""));

                $('.tab-standard-size input[name="pant-WAIST"]').val(getSaveDesign("PANT", "WAIST", ""));
                $('.tab-standard-size input[name="pant-LENGTH"]').val(getSaveDesign("PANT", "LENGTH", ""));

                $(".tab-standard-size #selectSizeType .JSselectboxList li").each(function () {
                    var html = $(this).html();

                    if (html.toLowerCase() === getSaveDesign(mainProject, "TYPE_SHSIZE", "").toLowerCase()) {
                        var value, JSselectVal, selectSizeType;

                        value = $(this).data("js");
                        JSselectVal = $(".tab-standard-size #selectSizeType .JSselectVal");
                        selectSizeType = $('.tab-standard-size #selectSizeType input[name="selectSizeType"]');

                        JSselectVal.attr("data-value", value).data("value", value).html(html);
                        selectSizeType.attr("value", value);

                        $(this).click();
                    }
                });

                $(".tab-standard-size #StandardsizeNo .JSselectboxList li").each(function () {
                    var html = $(this).html();

                    if (html.toLowerCase() === getSaveDesign(mainProject, "READY_SHSIZE", "").toLowerCase()) {
                        var value, JSselectVal, selectSizeType;

                        value = $(this).data("js");
                        JSselectVal = $(".tab-standard-size #StandardsizeNo .JSselectVal");
                        selectSizeType = $('.tab-standard-size #StandardsizeNo input[name="standardsizeNo"]');

                        JSselectVal.html(html);
                        selectSizeType.attr("value", value);

                        $(this).click();
                    }
                });
            }

            if (mainProject === "SHIRT") {
                if (iTailorObject.collarStay === "true") {
                    $("#menu-l-checkbox-pro-collarStay-customPro").prop("checked", true);
                }

                $("#pocketStyleSelect li").each(function () {
                    var value = $(this).data("val");

                    if (typeof value === "string") {
                        value = value.toLowerCase();
                    }

                    if (value === getSaveDesign(mainProject, "packetCount", "").toLowerCase()) {
                        $(this).click();
                    }
                });

                $("#tab-measurement .size-select-box li").each(function () {
                    var value = $(this).data("val");

                    if (typeof value === "string") {
                        value = value.toLowerCase();
                    }

                    if (value === getSaveDesign(mainProject, "size", "").toLowerCase()) {
                        $(this).click();
                    }
                });

                $("#tab-measurement .size-select-box li").each(function () {
                    var value = $(this).data("val");

                    if (typeof value === "string") {
                        value = value.toLowerCase();
                    }

                    if (value === getSaveDesign(mainProject, "size", "").toLowerCase()) {
                        $(this).click();
                    }
                });

                if (iTailorObject.design3DPro.status === "true") {
                    processProDesign._setDefaults();
                }
            }

            if (mainProject === "POLO") {
                var POLO = window.PROJECT_DB.designer.defaults;

                if (POLO.categoryOption === "combination") {
                    setTimeout(function () {
                        $("#fabric-selection .combination").click();
                    }, 700);
                }

                if (POLO.collarStyle === "Slim") {
                    $("#collarSlim").prop("checked", true);
                }

                if (POLO.pocketStyle === "2Pocket") {
                    $("#doublePocket").prop("checked", true);
                }

                if (POLO.monogram !== "No-Mono") {
                    $(".design-monogram-text").val(POLO.monogramTxt).keyup();
                }

                if (POLO.contrastCollarOutsideStatus === "Y") {
                    $("#contrastCollarOutside").prop("checked", true);
                }

                if (POLO.contrastCollarInsideStatus === "Y") {
                    $("#contrastCollarInside").prop("checked", true);
                }

                if (POLO.contrastFrontOutsideStatus === "Y") {
                    $("#contrastFrontOutside").prop("checked", true);
                }

                if (POLO.contrastFrontBoxStatus === "Y") {
                    $("#contrastFrontBox").prop("checked", true);
                }

                if (POLO.contrastSleeveStatus === "Y") {
                    $("#contrastSleeve").prop("checked", true);
                }

                if (POLO.contrastSleeveCuffStatus === "Y") {
                    $("#contrastSleeveCuff").prop("checked", true);
                }

                if (POLO.contrastSleeveElbowStatus === "Y") {
                    $("#contrastSleeveElbow").prop("checked", true);
                }

                if (POLO.contrastPocketMainStatus === "Y") {
                    $("#contrastPocketMain").prop("checked", true);
                }

                if (POLO.contrastPocketTrimmingStatus === "Y") {
                    $("#contrastPocketTrimming").prop("checked", true);
                }

                if (POLO.measurement.option === "body") {
                    var measurementForm, unit;

                    measurementForm = $("#mastdesigner .design-measurement-form .design-measurement-form-input li");

                    if (POLO.sleevePath === "ShortSleeve") {
                        measurementForm.eq(-3).addClass("hide-block").removeClass("show-block");
                        measurementForm.eq(-2).addClass("show-block").removeClass("hide-block");

                        POLO.sleeveType = "Short Sleeve";
                    } else if (POLO.sleevePath === "LongSleeve") {
                        measurementForm.eq(-2).addClass("hide-block").removeClass("show-block");
                        measurementForm.eq(-3).addClass("show-block").removeClass("hide-block");

                        POLO.sleeveType = "Long Sleeve";
                    }

                    if (POLO.measurement.body.unit === "cm") {
                        unit = "Cm";
                    } else if (POLO.measurement.body.unit === "inch") {
                        unit = "Inch";
                    }

                    $('.neckSize' + unit).val(POLO.measurement.body.size.neck || "");
                    $('.chestSize' + unit).val(POLO.measurement.body.size.chest || "");
                    $('.waistSize' + unit).val(POLO.measurement.body.size.waist || "");
                    $('.hipSize' + unit).val(POLO.measurement.body.size.hip || "");
                    $('.lengthSize' + unit).val(POLO.measurement.body.size.length || "");
                    $('.shoulderSize' + unit).val(POLO.measurement.body.size.shoulder || "");
                    $('.sleeveSize' + unit).val(POLO.measurement.body.size.sleeve || "");
                    $('.shortSleeveSize' + unit).val(POLO.measurement.body.size.shortsleeve || "");
                }
            }
        })();
    });
}).apply(this, (function (window) {
    if (typeof window.designObject === "undefined") {
        window.designObject = {
            project: window.ITAILOR_PROJECT
        };
    }

    if (typeof window.iTailorObject === "undefined") {
        window.iTailorObject = {};
    }

    if (typeof window.jacketObject === "undefined") {
        window.jacketObject = {};
    }

    if (typeof window.pantObject === "undefined") {
        window.pantObject = {};
    }

    if (typeof window.vestObject === "undefined") {
        window.vestObject = {};
    }

    return [window.designObject, window.iTailorObject, window.jacketObject, window.pantObject, window.vestObject];
})(window));