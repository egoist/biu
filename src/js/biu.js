!(function () {

  var biuOpts = {
    height: '50px',
    lineHeight: '50px',
    top: '-55px',
    closeButton: 'x',
    delay: 5000
  };
  window.biuOpts = biuOpts;
  var style = 'height:' + biuOpts.height + ';line-height:' + biuOpts.lineHeight + ';top:' + biuOpts.top;

  var biu = function(argv) {
    console.log(argv);
    var div = document.createElement('div');
    var instance = new Date().getTime();
    instance = 'biu-instance-' + instance;
    div.id = instance;
    var biuStyle = 'info';
    var biuContent = null;
    var biuAutoFade = true;
    if(typeof argv[0] === 'object') {

      var opt = argv[0];
      if(opt.type) biuStyle = opt.type;
      if(opt.text) biuContent = opt.text;
      biuAutoFade = (typeof opt.autoFade !== 'undefined') ? opt.autoFade : true;
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
    biuContent = '<div class="biu-content">' + biuContent + '</div>';
    if(!biuAutoFade) {
      //var closeButtonTop =  (parseInt(biuOpts.height)/2) + 'px';
      var biuCloseButton = '<div class="biu-close" onclick="this.parentNode.classList.remove(\'biu-shown\')">' + biuOpts.closeButton + '</div>';
      biuContent += biuCloseButton;
    }
    div.innerHTML = biuContent;

    document.body.appendChild(div);
    setTimeout(function() {
      div.classList.add('biu-shown');
    }, 100)
    if(biuAutoFade) {
      setTimeout(function() {
        div.classList.remove('biu-shown');
      }, biuOpts.delay);
    }
    
  };

  console.log('biu');

  window.biu = function() {
    return new biu(arguments);
  };

})();