!(function () {
  // my code is shitty
  // feel free to add your own features
  // or beautify it

  function queryDom(p) {
    var z = 'getElement',
        g = 'Name',
        a = {'#': 'ById', '.': 'sByClass' + g, '@': 'sBy' + g, '=': 'sByTag' + g}[p[0]] || false,
        b = p.slice(1),
        u = (a ? document[z + a](b) : document.querySelectorAll(p));

    var el = (checkType(u, 'NodeList')) ? Array.prototype.slice.call(u) : u;
    return el;
  };

  function checkType(obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  };

  function domEach(element, fn) {
    if (checkType(element, 'Array')) {
      Array.prototype.forEach.call(element, function(el, i){
        fn(el);
      });
    } else {
      fn(element);
    }
  };

  var biuOpts = {
    height: '50px',
    lineHeight: '50px',
    top: '-55px',
    closeButton: 'x'
  };
  window.biuOpts = biuOpts;
  var style = 'height:' + biuOpts.height + ';line-height:' + biuOpts.lineHeight + ';top:' + biuOpts.top + ';';

  var biu = function(argv) {

    var div = document.createElement('div');
    var timestamp = new Date().getTime();
    instance = 'biu-instance-' + timestamp;
    div.id = instance;
    var biuStyle = 'info';
    var biuContent = '';
    var biuAutoFade = true;
    var biuDelay = 5000;
    var biuStack = false;
    var biuCloseButton = '';
    var biuParent = queryDom('body');
    var biuParentIsBody = true;
    if(typeof argv[0] === 'object') {
      var opt = argv[0];
      if(opt.type) biuStyle = opt.type;
      if(opt.text.toString()) biuContent = opt.text;
      biuAutoFade = (typeof opt.autoFade !== 'undefined') ? opt.autoFade : true;
      biuDelay = (typeof opt.delay !== 'undefined') ? opt.delay : 5000;
      if(typeof opt.parent !== 'undefined') {
        biuParent = queryDom(opt.parent);
        style += 'position:absolute;';
        if(opt.parent != 'body') {
          biuParentIsBody = false;
        }
      }
    } else if(argv[0] && !argv[1]) {
      // biu('text') === biu('info', 'text')
      biuContent = argv[0];
    } else {
      biuStyle = argv[0];
      biuContent = argv[1];
      biuAutoFade = (typeof argv[2] !== 'undefined') ? argv[2] : true;
    }

    // set biu style
    biuStyle = 'biu-' + biuStyle;
    div.classList.add('biu-instance');
    div.classList.add(biuStyle);
    div.setAttribute('style', style);
    div.setAttribute('data-auto-hide', biuAutoFade);

    // set text content
    if(!biuAutoFade) {
      //var closeButtonTop =  (parseInt(biuOpts.height)/2) + 'px';
      biuCloseButton = '<div class="biu-close" id="biu-close-' + timestamp + '"">' + biuOpts.closeButton + '</div>';
    }
    biuContent = '<div class="biu-content">' + biuContent + '</div>' + biuCloseButton;
    div.innerHTML = biuContent;

    domEach(biuParent, function(el) {
      el.appendChild(div);
    })

    setTimeout(function() {
      div.classList.add('biu-shown');
    }, 100)
    if(biuAutoFade) {
      setTimeout(function() {
        onClose();
      }, biuDelay);
    } else {
      document.getElementById('biu-close-' + timestamp).addEventListener('click', onClose);
    }

    function onClose() {
      div.classList.remove('biu-shown');
      setTimeout(function() {
        div.parentNode.removeChild(div);
      }, 600);
    };
  };


  window.biu = function() {
    return new biu(arguments);
  };

})();
