$(document).ready(function () {
    $('#footer').changePriceAllProductFooter();
    $('#footer').Animation({translateY: "100%"});
    $('.list-language').Language();
    processAccount.config();
    linkObj.config();
//    $(document).Tooltip();
    $('.fabric-info').click(function () {
        messages({file: "fabric-info", typeMessage: 'public'});
    });
    
    $('.banner-announce').click(function () {
        $(this).popupMaya({url: '../itailor-data/elements/popup2/announce.php', run: true, position: "middle", subEleHeight: 600, effStart: "top"});
    });
});

/*------------------------------------------------------------------------------
 * QUERY PRICE MIN ALL PRODUCT AFTER DOCUMENT LOAD LOAD...
 *------------------------------------------------------------------------------*/
$.fn.changePriceAllProductFooter = function () {
    var ele = $(this);
    /*GET JSON MIN PRICE ALL PRODUCT*/
    $.getJSON('../itailor-data/elements/min-price-product.php?return=json', function (data) {
        LoopChangPrice(data);
        $('#footer').Animation({translateY: 0, transition: 2});
    });

    /*loop chang price*/
    function LoopChangPrice(data) {
        var priceList = data;
        var sign = priceList['sign'];

        for (var i in priceList) {
            var product = priceList[i]['PRODUCT'];
            var price = priceList[i]['PRICE'];
            ele.find('[data-product="' + product + '"]').html(" " + price + " " + sign);
        }
    }
};

/*------------------------------------------------------------------------------
 * PROCESSS ACCOUNT
 *------------------------------------------------------------------------------*/
linkObj = {
    config: function () {
        this.checkEmptyCheckout(".txtLinkCheckout,.link-checkout");
        this.allProduct("#link-product,.btn-continue");
        this.menu("#link-menu");
        this.linkOutPageDesign("#footer a,.toolbar a");
    },
    checkEmptyCheckout: function (ele) {
        $(ele).click(function () {
            $.getJSON("../checkout/elements/checkout/chk-item.php", function (data) {
                if (data.STATUS === "true") {
                    window.location = "../checkout";
                } else {
                    $(ele).popupMaya({url: "../itailor-data/elements/popup2/checkout-empty.php", position: "middle", subEleHeight: 300, effStart: "top", run: true});
                }
            });
        });
    },
    allProduct: function (ele) {
        //$(ele).popupMaya({url: "../itailor-data/elements/popup2/all-product-v2.php", position: "top", effStart: "left", width: "100%"}); //old version
        $(ele).popupProduct();
    },
    menu: function (ele) {
        $(ele).popupMaya({url: "../itailor-data/elements/popup2/menu.php", position: "middle", subEleHeight: 444, effStart: "left"});
    },
    linkOutPageDesign: function (ele) {
        var arrLinkBlock = ["http://www.itailor.com/designblouses.php"];
        $(ele).click(function (event) {
            event.preventDefault();
            var product = (publicObject.product).toLowerCase();
            var platform = (publicObject.platform).toLowerCase();
            var type = $(this).attr('target');
            var link = $(this).attr('href');
            var lengthCheckout = $('#FrmCheckout').length;
            if (type === "_top" && !lengthCheckout) {
                var url = "../itailor-data/elements/popup2/linkout.php?type=" + product;
                $(ele).popupMaya({url: url, position: "middle", subEleHeight: 150, effStart: "top", run: true}, function () {
                    $(document).Language();
                    $(".btnClose").click(function () {
                        var status = $(this).attr('data-status');
                        if (status === "yes") {
                            document.location.href = link;
                        }
                    });
                });
            } else if (type === "_top" && lengthCheckout) {
                document.location.href = link;
            } else {
                if (link !== "javascript:void(0)") {
                    if (arrLinkBlock.indexOf(link) >= 0 && platform !== "computer") {
                        $(ele).popupMaya({url: "../itailor-data/elements/popup2/detectMobile.php", position: "middle", subEleHeight: 150, effStart: "top", run: true});
                    } else {
                        window.open(link);
                    }
                }
            }
        });
    }
};
processAccount = {
    defaults: {
        root: "../itailor-data/elements/account/"
    },
    config: function () {
        this.login("#link-login");
        this.logout("#link-logout");
        this.account("#link-account");
        this.password("#button-save-password");
        this.setAccountLink();
    },
    login: function (ele) {
        var self = this;
        /*call popup form login*/
        $(ele).popupMaya({url: '../itailor-data/elements/popup2/login.php', position: 'middle', width: '100%', subEleHeight: 300, effStart: 'right'}, function () {
            self.forgot("#link-forgot");
            $('#frmLogin input').removeAttr('value');
            $('#frmLogin input:first').focus();
            $('#frmLogin').submit(function (e) {
                e.preventDefault();
                var arr = $('#frmLogin').serializeArray();
                var email = $('#frmLogin input[name="EMAIL"]').val();
                var pw = $('#frmLogin input[name="PASSWORDS"]').val();
                if (email && pw) {
                    /*post email and password login customer*/
                    var url = '../itailor-data/elements/account/login.php?project=' + publicObject.project + "&product=" + publicObject.product;
                    $.post(url, arr, function (data) {
                        var data = $.parseJSON(data);

                        if (($.trim(data)) === "false") {
                            invalid();
                        } else if (data) {
                            self.toggleToolbar(true);
                            $('.list-language').val(data.Setting.Global.LANGUAGE).trigger('change').next('span').html(data.Setting.Global.LANGUAGE);
                            $('[for="btnExitLogin"]').click();
                            setPrice(data);
                            $('#footer').changePriceAllProductFooter();
                            
//                            var pathName = window.location.pathname;
//                            if (pathName.indexOf('checkout') > 0) {
//                                processCheckOut.pay.paypalAPM();
//                            }
                        } else {
                            invalid();
                        }
                    });
                } else {
                    invalid();
                }
                
                function invalid() {
                    /*login error call popup invalid*/
                    $('body').popupMaya({url: "../itailor-data/elements/popup2/login-invalid.php", run: true, position: "middle", subEleHeight: 100, effStart: "top"});
                }
            });
        });
    },
    logout: function (ele) {
        var self = this;
        $(ele).click(function () {
            $.get(self.defaults.root + 'logout.php', function () {
                self.toggleToolbar(false);
                $('.user-name').empty();
            });
        });
    },
    account: function (ele) {
        $(ele).click(function () {
            var status = false;
            var customer = publicObject.customer;

            try {
                status = customer.EMAIL;
            } catch (err) {
                status = false;
            }

            if (status) {
                $(ele).popupMaya({url: '../itailor-data/elements/order-history/my-account.php', run: true, position: "middle", subEleHeight: 600, effStart: "top"}, function () {
                    $('.view-detail').click(function () {
                        var id = $(this).attr('id');
                        $(this).popupMaya({url: "../itailor-data/elements/popup2/acc/acc-order-detail.php?id=" + id, run: true, position: "middle", subEleHeight: 600, effStart: "top"});
                    });
                    $('.click-here').click(function () {
                        var id = $(this).attr('id');
                        $(this).popupMaya({url: "../itailor-data/elements/order-history/my-gift.php?id=" + id, run: true, position: "middle", subEleHeight: 600, effStart: "top"});
                    });
                });
            } else {
                $("#link-login").click();
            }
        });
        function _getLength(arr) {
            var count = 0;
            for (var i in arr) {
                count++;
            }
            return count;
        }
    },
    toggleToolbar: function (status) {
        $('#link-login, #link-logout').hide();
        if (status) {
            $('#link-logout').show();
        } else {
            publicObject.customer = {};
            $('#link-login').show();
        }
    },
    forgot: function (ele) {
        var self = this;
        $(ele).click(function () {
            $('.layout-login .btnClose').trigger('click');
            setTimeout(function () {
                $(ele).popupMaya({url: '../itailor-data/elements/popup2/forgot.php', run: true, position: 'middle', width: '100%', subEleHeight: 300, effStart: 'top'}, function () {
                    /*event submit form*/
                    var frm = $('#FrmForgot');
                    frm.on('submit', function (e) {
                        e.preventDefault();
                        var email = frm.find("[name='EMAIL']").val();
                        if (email) {
                            $.post('../itailor-data/elements/account/forgot.php', {EMAIL: email}, function (data) {
                                if ($.trim(data) === "true") {
                                    /*forget true sent message to Email Address*/
                                    frm.find('.btnClose').trigger('click');
                                    $(ele).popupMaya({url: '../itailor-data/elements/popup2/forgot-valid.php', run: true, position: 'middle', width: '100%', subEleHeight: 300, effStart: 'top'});
                                } else {
                                    /*forget false*/
                                    $(ele).popupMaya({url: '../itailor-data/elements/popup2/forgot-invalid.php', run: true, position: 'middle', width: '100%', subEleHeight: 300, effStart: 'top'});
                                }
                            });
                        }
                    });
                });
            }, 1000);
        });
    },
    password: function (ele) {
        $(document).delegate(ele, 'click', function () {
            var _this = $(this);
            var pw = $("[name='password']").val();
            if (pw.length > 4) {
                $("[name='password']").removeClass('invalid');
                
                $.post("../itailor-data/elements/account/password.php", {password: pw}, function (data) {
                    $(_this).popupMaya({url: "../itailor-data/elements/popup2/password-success.php", run: true, position: "middle", subEleHeight: 200, effStart: "top"});
                });
            }
            else {
                $("[name='password']").addClass('invalid');
            }
        });
    },
    setAccountLink: function () {
        var customer = publicObject.customer;
        var status = true;
        try {
            status = customer.EMAIL;
        } catch (err) {
            status = false;
        }
        
        if (status) {
            this.toggleToolbar(true);
        } else {
            this.toggleToolbar(false);
        }
    }
};

/*------------------------------------------------------------------------------
 * PUBRIC
 *------------------------------------------------------------------------------*/

publicObject = {
    platform: "",
    project: "",
    product: "",
    curr: "",
    sign: "",
    country: "",
    language: "",
    languageObj: {},
    customer: {},
    sum: {}/*sum price , shipping and qty*/
};

$.fn.Language = function () {
    $(this).change(function () {
        if ($(this).hasClass('list-language')) {
            var val = $(this).val();
            val = !val ? "English" : val;
            $.getJSON('../itailor-data/elements/Language.php?lang=' + val, function (d) {
                publicObject.languageObj = d;
                setLang();
            });
        }
    });
    setLang();
    function setLang() {
        $('[data-lang]').each(function () {
            var _this = $(this)
            var objTag = _this.attr('data-lang');
            var objvalue = publicObject.languageObj[objTag];
            if (objvalue != '' && objvalue) {
                var objFind = $('body').find("[data-lang='" + objTag + "']");
                $(objFind).text(objvalue);
//                _this.css({color: "green"});
            } else {
                if (objTag) {
//                    _this.css({color: "#FFF600"});
                } else {
//                    _this.css({color: "red"});
                }
            }
        });
    }
};

$.fn.Tooltip = function () {
    var div = $("<div>").addClass('tooltip-title').css({display: 'inline-block', position: 'fixed', overflow: 'hidden', padding: '1px 5px', background: 'rgba(0,0,0,.8)', 'z-index': 9999, 'font-size': '90%', 'box-shadow': '0 1px 2px #000', 'text-shadow': '0 1px 2px #000'});
    $(this).mouseover(function (e) {
        div.appendTo("body");
        var _this = $(e.target);
        var x = (e.clientX) + 'px';
        var y = (e.clientY + 10) + 'px';
        var str = "";
        str = _this.attr('title');
        if (!str) {
            str = _this.parent().attr('title');
        }
        if (!str) {
            str = _this.find('img').attr('title');
        }

        if (str) {
            $('.tooltip-title').css({top: y, left: x});
            $('.tooltip-title').html(str).stop(true, true).fadeIn();
        }
    });
    $(this).mouseout(function () {
        $('.tooltip-title').remove().html("").hide();
    });
};

$.fn.ImageDisplay = function () {
    var _this = $(this);
    var imgObject = _this.find('img');
    imgObject.hide();
    imgObject.bind('load', function () {
        $(this).fadeIn();
    }).each(function () {
        if (this.complete)
            $(this).load();
    });
};

function sizeCustomDetail(_data) {
    var data = _data ? _data : publicObject.customer;
    if (data) {
        for (var i in data) {
//            $('input[name="' + i + '"]:text').val(data[i]);
        }
    }
}

/*========================================================
 * Popup Message
 * type = alert,confrm
 * parameter = pkey=001&sql=002
 * =======================================================*/
var messages = function (option, callback) {
    var defaults = {type: "", par: "", typeMessage: ""};
    option = $.extend(defaults, option);
    $('.popup').remove();
    var a = $('<div>').addClass('popup').css({'display': 'none', 'width': '100%', 'height': '100%'}), url, par = '';
    a.appendTo('body').fadeIn(1000);
    if (option.par) {
        option.par = "?" + option.par;
    }
    if (option.typeMessage === "public") {
        url = "../itailor-data/elements/popup/" + option.file + ".php" + option.par;
    } else if (option.typeMessage === "suit3pcs") {
        url = "../itailor-data/product/suit3pcs/popup/" + option.file + ".php" + option.par;
    } else {
        if (typeof projectPath != 'undefined') {
            url = projectPath + "elements/popup/" + option.file + ".php" + option.par;
        }
        else {
            url = "elements/popup/" + option.file + ".php" + option.par;
        }
    }
    $('.popup').load(url, function () {
        var tag = $('.popup').find('div').eq(0).css({'display': 'none'}).fadeIn();
        var container = tag.height();
        var margin = ($(window).height() - container) / 2;
        margin = margin < 0 ? 0 : margin;
        
        if (typeof option.marginTop != 'undefined') {
            tag.css('margin-top', option.marginTop).fadeIn();
        }
        else {
            tag.css('margin-top', margin).fadeIn();
        }
        
        if (option.type !== 'confrim') {
            if (callback) {
                callback();
            }
        }
        $(document).Language();
    });
    /*Event Close*/
    $(".popup").delegate(".closes", "click", function () {
        $(".popup div").eq(0).animate({
            'opacity': 0
        }, 200);
        $(this).parents('.popup').fadeOut(200).delay(500).remove();
        return false;
    });
    /*Event confrim*/
    $(".popup").delegate(".confrim", "click", function () {
        $(".popup div").eq(0).animate({
            'opacity': 0
        }, 200);
        $(this).parents('.popup').delay(200).fadeOut(500);
        callback();
    });
    /*Esc*/
    $('body').keyup(function (e) {
        if (e.keyCode === 27) {
            $('.closes').click();
        }
    });

};
$.fn.messagesResize = function () {
    $(window).resize(function () {
        var tag = $('.popup').find('div').eq(0);
        var container = tag.height();
        var margin = ($(window).height() - container) / 2;
        var winWidth = ($(window).width() - tag.width()) / 2;
        if (margin <= 0) {
            margin = 0;
        }
        if (winWidth <= 0) {
            winWidth = 0;
        }
        tag.stop().animate({'margin-top': margin, 'margin-left': winWidth}, 300);
    });
};