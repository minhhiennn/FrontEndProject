/* ----------------------------------------------------------------
 * jQuery MayaTransform plugin v1.0
 * update Last 24/4/57
 * by komsun.online
 * use Plugins Animation.js
 * ---------------------------------------------------------------*/

$.fn.MayaTransform = function (option, callback) {
    var _this = $(this);
    var MayaTransform = {
        defaults: {
            main: "",
            Ul: "",
            Li: "",
            slideBox: "",
            eleWidth: 0,
            winWidth: "",
            winHeight: "",
            liength: "",
            count: 0,
            time: .5,
            padding: 0,
            showItem: 1
        },
        _setDefaults: function (_this, option) {
            this.defaults = $.extend(this.defaults, option);
            this.defaults.main = _this;
            this._getWin();
            this._getDefaults();
            this._setEle();
        },
        _getDefaults: function () {
            var self = this;
            var defaults = self.defaults;
            var main = defaults.main;
            defaults.eleWidth = main.width() - defaults.padding; /*slide main*/
            defaults.slideBox = main.find('>.slideBox').eq(0); /*slideBox*/
            defaults.Ul = main.find('ul').eq(0); /*ul*/
            defaults.Li = defaults.Ul.find('>li'); /*li*/
            defaults.liength = defaults.Ul.find('>li').length;/*li length*/
//            defaults.Li = defaults.Ul.find('>li:visible'); /*li*/
//            defaults.liength = defaults.Ul.find('>li:visible').length;/*li length*/
        },
        _setEle: function () {
            var defaults = this.defaults;
            var Ul = defaults.Ul;
            var Li = defaults.Li;
            var slideBox = defaults.slideBox;
            var width = defaults.eleWidth;
            var liength = defaults.liength;
            var time = defaults.time;
            var padding = defaults.padding;
            var showItem = defaults.showItem;
            var count = defaults.count;

            /*condition show item*/

            var ulWidth = (width - padding) * liength;
            if (showItem > 1) {
                ulWidth = ((width - padding) / showItem) * liength;
            }


            $(Ul).css({width: ulWidth});/*set ul*/
            $(Li).css({width: (100 / liength) + "%"});/*set li*/

            /*---------------------------
             * addClass / removeClass
             *---------------------------*/
            var _class = "active";
            var active = $(Ul).find('>.' + _class).eq(0);
            $(active).removeClass(_class);
            $(Li).eq(count / showItem).addClass(_class);

            /*---------------------------
             * transform
             *---------------------------*/
            var transform = ((width - padding) * (count / showItem)) * -1;
            $(slideBox).css({'width': (width - padding), 'margin': 'auto', 'overflow': 'hidden'});/*box slide*/
            $(Ul).Animation({transition: time, translateX: transform + "px"});/*transform*/
        },
        event: {
            button: function (self) {
                /*-----------------------------------
                 * Event click button next and back
                 *----------------------------------*/
                var btn = self.defaults.main.find('> div >.button');
                btn.click(function (event) {
                    event.preventDefault();
                    var _this = $(this);
                    var type = _this.data('button');
                    self._getDefaults();
                    self.condition.button(type, self);
                    self._setEle();
                });
            }
        },
        _getWin: function () {
            var win = $(window);
            this.defaults.winWidth = win.width();
            this.defaults.winHeight = win.height();
        },
        condition: {
            button: function (type, self) {
                var defaults = self.defaults;
                var count = defaults.count;
                var length = defaults.liength;
                var showItem = defaults.showItem;
                if (type === "next")
                {
                    if (count < length - showItem)
                    {
                        count += showItem;
                    }
                }
                else if (type === "back")
                {
                    if (count >= showItem)
                    {
                        count -= showItem;
                    }
                }
                defaults.count = count; /*set new count*/
            }
        }
    };

    /*--------------------------------------------------------------
     * CALL FUNFTION SLIDE TRANSFORM
     *-------------------------------------------------------------*/
    _this['data'] = MayaTransform;
    _this['data']._setDefaults(_this, option);
    _this['data'].event.button(_this['data']);

    /*--------------------------------------------------------------
     * EVENT CALLBACK() OBJ
     * ------------------------------------------------------------*/
    _this.find('> div >.button').click(function () {
        if (callback) {
            callback(_this['data'].defaults);
        }
    });
};