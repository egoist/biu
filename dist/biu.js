'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (W, D) {
  function isBody(el) {
    return el.toString && el.toString() === '[object HTMLBodyElement]';
  }

  var Biu = function () {
    function Biu(text, options) {
      _classCallCheck(this, Biu);

      this.text = text;
      this.options = options;
      this.el = D.createElement('div');
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
        this.startTimeout();
      }

      // mouse events
      this.registerEvents();
    }

    _createClass(Biu, [{
      key: 'insert',
      value: function insert() {
        var _this = this;

        // close button
        this.closeButton = D.createElement('div');
        this.closeButton.className = 'biu-close';
        this.closeButton.innerHTML = this.options.closeButton;
        this.el.appendChild(this.closeButton);

        // main
        var elMain = D.createElement('div');
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
            clearTimeout(_this2.timeout);
            _this2.timeout = null;
          };
          this.events.mouseleave = function () {
            _this2.startTimeout();
          };
          this.el.addEventListener('mouseover', this.events.mouseover);
          this.el.addEventListener('mouseleave', this.events.mouseleave);
        }

        this.events.close = function () {
          return _this2.close();
        };
        this.closeButton.addEventListener('click', this.events.close);
      }
    }, {
      key: 'startTimeout',
      value: function startTimeout() {
        var _this3 = this;

        var timeout = arguments.length <= 0 || arguments[0] === undefined ? this.options.timeout : arguments[0];

        this.timeout = setTimeout(function () {
          _this3.close();
        }, timeout);
      }
    }, {
      key: 'close',
      value: function close() {
        var _this4 = this;

        if (this.options.autoHide !== false) {
          this.el.removeEventListener('mouseover', this.events.mouseover);
          this.el.removeEventListener('mouseleave', this.events.mouseleave);
        }
        this.closeButton.removeEventListener('click', this.events.close);
        if (this.options.pop) {
          this.el.style.transform = 'translateX(-50%) translateY(-110%)';
        } else {
          this.el.style.transform = 'translateY(-100%)';
        }
        setTimeout(function () {
          _this4.options.el.removeChild(_this4.el);
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
    var _ref$closeButton = _ref.closeButton;
    var closeButton = _ref$closeButton === undefined ? 'x' : _ref$closeButton;
    var _ref$el = _ref.el;
    var el = _ref$el === undefined ? document.body : _ref$el;
    var _ref$align = _ref.align;
    var align = _ref$align === undefined ? 'center' : _ref$align;
    var _ref$pop = _ref.pop;
    var pop = _ref$pop === undefined ? false : _ref$pop;

    return new Biu(text, {
      type: type,
      timeout: timeout,
      autoHide: autoHide,
      closeButton: closeButton,
      el: el,
      align: align,
      pop: pop
    });
  }

  if (typeof module !== 'undefined') {
    module.exports = biu;
  } else if (typeof window !== 'undefined') {
    window.biu = biu;
  }
}(window, document);
//# sourceMappingURL=biu.js.map
