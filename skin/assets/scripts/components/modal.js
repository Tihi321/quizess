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

    this.$modal = $(this.modalElement);
    this.$openTrigger = $(this.openTriggerElement);
    this.$closeTrigger = $(this.closeTriggerElement);
    this.$body = $('html, body');
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
    $(`#${id}`).addClass(this.OPEN_CLASS);

    setTimeout(() => {
      this.$body.addClass(this.getBodyActiveClass());
    }, 300);
  }

  close(id) {
    if (device.iPhone()) {
      window.scroll(0, this.scrollPosition);
    }

    $(`#${id}`).removeClass(this.OPEN_CLASS);
    this.$body.removeClass(this.getBodyActiveClass());
  }

  closeAll() {
    if (device.iPhone()) {
      window.scroll(0, this.scrollPosition);
    }

    this.$modal.removeClass(this.OPEN_CLASS);
    this.$body.removeClass(this.getBodyActiveClass());
  }

  getId(e) {
    return e.attr('data-modal');
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
