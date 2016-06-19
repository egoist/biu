function isBody(el) {
  return el.toString && el.toString() === '[object HTMLBodyElement]'
}
class Biu {
  constructor(text, options) {
    this.text = text
    this.options = options
    this.el = document.createElement('div')
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
      this.startTimer()
    }

    // mouse events
    this.registerEvents()
  }

  insert() {
    // close button
    this.closeButton = document.createElement('div')
    this.closeButton.className = 'biu-close'
    this.closeButton.innerHTML = this.options.closeButton
    this.el.appendChild(this.closeButton)

    // main
    const elMain = document.createElement('div')
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
      this.events.mouseover = () => this.stopTimer()
      this.events.mouseleave = () => this.startTimer()
      this.el.addEventListener('mouseover', this.events.mouseover, false)
      this.el.addEventListener('mouseleave', this.events.mouseleave, false)
    }

    this.events.hide = () => this.hide()
    this.closeButton.addEventListener('click', this.events.hide, false)

    if (this.options.hideOnClick) {
      this.el.addEventListener('click', this.events.hide, false)
    }
  }

  startTimer(timeout = this.options.timeout) {
    this.timer = setTimeout(() => {
      this.hide()
    }, timeout)
  }

  stopTimer() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  hide() {
    if (!this.el) {
      return
    }

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
      this.stopTimer()
    }, 300)
  }
}

function biu(text = '', {
  type = 'default',
  timeout = 3000,
  autoHide = true,
  hideOnClick = false,
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
    hideOnClick,
    el,
    align,
    pop,
    onHidden
  })
}

export default biu
