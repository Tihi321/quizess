import devices from '../../helpers/devices';
import generalHelper from '../../helpers/general-helper';
import selectors from '../../helpers/selectors';

export default class Modal {
  constructor(
    openTriggerElement = '.js-modal-trigger-open',
    closeTriggerElement = '.js-modal-trigger-close',
    OPEN_CLASS = 'is-active',
    CLOSED_CLASS = 'is-inactive'
  ) {
    this.openTriggerElement = openTriggerElement;
    this.closeTriggerElement = closeTriggerElement;
    this.OPEN_CLASS = OPEN_CLASS;
    this.CLOSED_CLASS = CLOSED_CLASS;

    this.isIphone = devices.iPhone();

    this.$openTriggers = document.querySelectorAll(this.openTriggerElement);
    this.$closeTriggers = document.querySelectorAll(this.closeTriggerElement);

    this.$body = selectors.getBody();

  }

  set scrollPosition(scrollPosition) {
    this._scrollPosition = scrollPosition;
  }

  get scrollPosition() {
    return this._scrollPosition;
  }

  open(id) {
    if (this.isIphone) {
      this.scrollPosition = window.pageYOffset;
    }
    const {classList} = document.querySelector(`#${id}`);
    classList.add(this.OPEN_CLASS);
    classList.remove(this.CLOSED_CLASS);

    setTimeout(() => {
      this.$body.classList.add(generalHelper.getBodyActiveClass(this.isIphone));
    }, 300);
  }

  close(id) {
    if (this.isIphone) {
      window.scroll(0, this.scrollPosition);
    }

    const {classList} = document.querySelector(`#${id}`);

    classList.add(this.CLOSED_CLASS);
    classList.remove(this.OPEN_CLASS);
    this.$body.classList.remove(generalHelper.getBodyActiveClass(this.isIphone));
  }

  getId(element) {
    return element.dataset.modal;
  }
}
