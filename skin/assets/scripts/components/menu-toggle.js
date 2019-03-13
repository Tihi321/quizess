import generalHelper from '../../helpers/general-helper';

export default class MenuToggle {
  constructor(openToggleSelector = '.js-menu-toggle') {
    this.openToggleElement = document.querySelector(openToggleSelector);
    this.headerOverlayElement = document.querySelector('.js-header-overlay');
    this.OPEN_CLASS = 'is-opened';
    this.CLOSED_CLASS = 'is-closed';

  }
  init(element, overlay = false) {
    const parent = (overlay) ? element.parentElement : element.parentElement.parentElement;
    if (parent.classList.contains(this.OPEN_CLASS)) {
      generalHelper.classList(parent).remove(this.OPEN_CLASS).add(this.CLOSED_CLASS);
    } else {
      generalHelper.classList(parent).remove(this.CLOSED_CLASS).add(this.OPEN_CLASS);
    }
  }
}
