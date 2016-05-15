!(function (W, D) {
  function isBody(el) {
    return el.toString && el.toString() === '[object HTMLBodyElement]'
  }
  class Biu {
    constructor(text, options) {
      this.text = text
      this.options = options
      this.el = D.createElement('div')
      this.el.className = `biu-instance biu-${options.type}`
      this.el.style.textAlign = this.options.align

      if (this.options.pop) {
        this.el.classList.add('biu-pop')
      }

      if (!isBody(this.options.el)) {
        this.options.el.style.overflow = 'hidden'
        this.options.el.style.position = 'relative'
        this.el.style.position = 'absolute'
      }

      // initial events
      this.events = {}

      // inner element
      this.insert()

      // auto hide animation
      if (this.options.autoHide !== false) {
        this.startTimeout()
      }

      // mouse events
      this.registerEvents()
    }

    insert() {
      // close button
      this.closeButton = D.createElement('div')
      this.closeButton.className = 'biu-close'
      this.closeButton.innerHTML = this.options.closeButton
      this.el.appendChild(this.closeButton)

      // main
      const elMain = D.createElement('div')
      elMain.className = 'biu-main'
      elMain.innerHTML = this.text
      this.el.appendChild(elMain)

      this.options.el.appendChild(this.el)
      setTimeout(() => {
        this.el.classList.add('biu-shown')
      }, 200)
    }

    registerEvents() {
      if (this.options.autoHide !== false) {
        this.events.mouseover = () => {
          clearTimeout(this.timeout)
          this.timeout = null
        }
        this.events.mouseleave = () => this.startTimeout()
        this.el.addEventListener('mouseover', this.events.mouseover, false)
        this.el.addEventListener('mouseleave', this.events.mouseleave, false)
      }

      this.events.hide = () => this.hide()
      this.closeButton.addEventListener('click', this.events.hide, false)
    }

    startTimeout(timeout = this.options.timeout) {
      this.timeout = setTimeout(() => {
        this.hide()
      }, timeout)
    }

    hide() {
      if (this.options.pop) {
        this.el.style.transform = 'translateX(-50%) translateY(-110%)'
      } else {
        this.el.style.transform = 'translateY(-100%)'
      }
      setTimeout(() => {
        if (this.options.onHidden) {
          this.options.onHidden.call(this)
        }
        this.options.el.removeChild(this.el)
        this.el = null
      }, 300)
    }
  }

  function biu(text = '', {
    type = 'default',
    timeout = 3000,
    autoHide = true,
    closeButton = '×',
    el = document.body,
    align = 'center',
    pop = false,
    onHidden
  } = {}) {
    return new Biu(text, {
      type,
      timeout,
      autoHide,
      closeButton,
      el,
      align,
      pop,
      onHidden
    })
  }

  if (typeof module !== 'undefined') {
    module.exports = biu
  } else if (typeof window !== 'undefined') {
    window.biu = biu
  }
})(window, document);
