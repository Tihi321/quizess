import device from '../helpers/devices';

export default class Modal {
  constructor(
    modalElement = '.js-modal',
    openTriggerElement = '.js-modal-trigger-open',
    closeTriggerElement = '.js-modal-trigger-close',
    OPEN_CLASS = 'is-active'
  ) {
    this.modalElement = modalElement;
    this.openTriggerElement = openTriggerElement;
    this.closeTriggerElement = closeTriggerElement;
    this.OPEN_CLASS = OPEN_CLASS;

    this.$modal = document.querySelector(this.modalElement);
    this.$openTrigger = document.querySelector(this.openTriggerElement);
    this.$closeTrigger = document.querySelector(this.closeTriggerElement);
    this.$body = document.querySelector('html, body');
  }

  set scrollPosition(scrollPosition) {
    this._scrollPosition = scrollPosition;
  }

  get scrollPosition() {
    return this._scrollPosition;
  }

  open(id) {
    if (device.iPhone()) {
      this.scrollPosition = window.pageYOffset;
    }
    document.querySelector(`#${id}`).classList.add(this.OPEN_CLASS);

    setTimeout(() => {
      this.$body.classList.add(this.getBodyActiveClass());
    }, 300);
  }

  close(id) {
    if (device.iPhone()) {
      window.scroll(0, this.scrollPosition);
    }

    document.querySelector(`#${id}`).classList.remove(this.OPEN_CLASS);
    this.$body.classList.remove(this.getBodyActiveClass());
  }

  getId(element) {
    return element.dataset.modal;
  }

  getBodyActiveClass() {
    let activeClass = '';

    // For Iphone and iPad check and add different style
    if (device.iPhone()) {
      activeClass = 'u-no-scroll-ios';
    } else {
      activeClass = 'u-no-scroll';
    }

    return activeClass;
  }
}
