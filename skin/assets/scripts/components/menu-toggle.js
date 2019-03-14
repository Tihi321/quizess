import generalHelper from '../../helpers/general-helper';

export default class MenuToggle {
  constructor(openToggleSelector = '.js-menu-toggle') {
    this.openToggleElement = document.querySelector(openToggleSelector);
    this.headerElement = document.querySelector('.js-header');
    this.headerOverlayElement = document.querySelector('.js-header-overlay');
    this.OPEN_CLASS = 'is-opened';
    this.CLOSED_CLASS = 'is-closed';

  }
  init() {
    if (this.headerElement.classList.contains(this.OPEN_CLASS)) {
      generalHelper.classList(this.headerElement).remove(this.OPEN_CLASS).add(this.CLOSED_CLASS);
    } else {
      generalHelper.classList(this.headerElement).remove(this.CLOSED_CLASS).add(this.OPEN_CLASS);
    }
  }
}
