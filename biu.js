(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.biu = factory());
}(this, function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function isBody(el) {
    return el.toString && el.toString() === '[object HTMLBodyElement]';
  }

  var Biu = function () {
    function Biu(text, options) {
      classCallCheck(this, Biu);

      this.text = text;
      this.options = options;
      this.el = document.createElement('div');
      this.el.className = 'biu-instance biu-' + options.type;
      this.el.style.textAlign = this.options.align;

      if (this.options.pop) {
        this.el.classList.add('biu-pop');
      }

      if (!isBody(this.options.el)) {
        this.options.el.style.overflow = 'hidden';
        this.options.el.style.position = 'relative';
        this.el.style.position = 'absolute';
      }

      // initial events
      this.events = {};

      // inner element
      this.insert();

      // auto hide animation
      if (this.options.autoHide !== false) {
        this.startTimer();
      }

      // mouse events
      this.registerEvents();
    }

    createClass(Biu, [{
      key: 'insert',
      value: function insert() {
        var _this = this;

        // close button
        this.closeButton = document.createElement('div');
        this.closeButton.className = 'biu-close';
        this.closeButton.innerHTML = this.options.closeButton;
        this.el.appendChild(this.closeButton);

        // main
        var elMain = document.createElement('div');
        elMain.className = 'biu-main';
        elMain.innerHTML = this.text;
        this.el.appendChild(elMain);

        this.options.el.appendChild(this.el);
        setTimeout(function () {
          _this.el.classList.add('biu-shown');
        }, 200);
      }
    }, {
      key: 'registerEvents',
      value: function registerEvents() {
        var _this2 = this;

        if (this.options.autoHide !== false) {
          this.events.mouseover = function () {
            return _this2.stopTimer();
          };
          this.events.mouseleave = function () {
            return _this2.startTimer();
          };
          this.el.addEventListener('mouseover', this.events.mouseover, false);
          this.el.addEventListener('mouseleave', this.events.mouseleave, false);
        }

        this.events.hide = function (event) {
          return _this2.hide(event);
        };

        if (this.options.hideOnClick) {
          this.el.addEventListener('click', this.events.hide, false);
        } else {
          this.closeButton.addEventListener('click', this.events.hide, false);
        }
      }
    }, {
      key: 'startTimer',
      value: function startTimer() {
        var _this3 = this;

        var timeout = arguments.length <= 0 || arguments[0] === undefined ? this.options.timeout : arguments[0];

        this.timer = setTimeout(function () {
          _this3.hide();
        }, timeout);
      }
    }, {
      key: 'stopTimer',
      value: function stopTimer() {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      }
    }, {
      key: 'hide',
      value: function hide() {
        var _this4 = this;

        var event = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        if (!this.el || event.target && event.target.tagName === 'A') {
          return;
        }

        if (this.options.pop) {
          this.el.style.transform = 'translateX(-50%) translateY(-110%)';
        } else {
          this.el.style.transform = 'translateY(-100%)';
        }
        setTimeout(function () {
          if (_this4.options.onHidden) {
            _this4.options.onHidden.call(_this4);
          }
          _this4.options.el.removeChild(_this4.el);
          _this4.el = null;
          _this4.stopTimer();
        }, 300);
      }
    }]);
    return Biu;
  }();

  function biu() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$type = _ref.type;
    var type = _ref$type === undefined ? 'default' : _ref$type;
    var _ref$timeout = _ref.timeout;
    var timeout = _ref$timeout === undefined ? 3000 : _ref$timeout;
    var _ref$autoHide = _ref.autoHide;
    var autoHide = _ref$autoHide === undefined ? true : _ref$autoHide;
    var _ref$hideOnClick = _ref.hideOnClick;
    var hideOnClick = _ref$hideOnClick === undefined ? false : _ref$hideOnClick;
    var _ref$closeButton = _ref.closeButton;
    var closeButton = _ref$closeButton === undefined ? '×' : _ref$closeButton;
    var _ref$el = _ref.el;
    var el = _ref$el === undefined ? document.body : _ref$el;
    var _ref$align = _ref.align;
    var align = _ref$align === undefined ? 'center' : _ref$align;
    var _ref$pop = _ref.pop;
    var pop = _ref$pop === undefined ? false : _ref$pop;
    var onHidden = _ref.onHidden;

    return new Biu(text, {
      type: type,
      timeout: timeout,
      autoHide: autoHide,
      closeButton: closeButton,
      hideOnClick: hideOnClick,
      el: el,
      align: align,
      pop: pop,
      onHidden: onHidden
    });
  }

  return biu;

}));