import device from '../helpers/devices';

export default class Modal {
  constructor(
    modalElement = '.js-modal',
    openTriggerElement = '.js-modal-trigger-open',
    closeTriggerElement = '.js-modal-trigger-close',
    OPEN_CLASS = 'is-active',
    CLOSED_CLASS = 'is-inactive'
  ) {
    this.modalElement = modalElement;
    this.openTriggerElement = openTriggerElement;
    this.closeTriggerElement = closeTriggerElement;
    this.OPEN_CLASS = OPEN_CLASS;
    this.CLOSED_CLASS = CLOSED_CLASS;

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
    const {classList} = document.querySelector(`#${id}`);
    classList.add(this.OPEN_CLASS);
    classList.remove(this.CLOSED_CLASS);

    setTimeout(() => {
      this.$body.classList.add(this.getBodyActiveClass());
    }, 300);
  }

  close(id) {
    if (device.iPhone()) {
      window.scroll(0, this.scrollPosition);
    }

    const {classList} = document.querySelector(`#${id}`);

    classList.add(this.CLOSED_CLASS);
    classList.remove(this.OPEN_CLASS);
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
