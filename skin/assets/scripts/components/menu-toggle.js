import {classList} from '../../utils/dom';

export class MenuToggle {
  constructor(openToggleSelector = '.js-menu-toggle') {
    this.openToggleElement = document.querySelector(openToggleSelector);
    this.headerOverlayElement = document.querySelector('.js-header-overlay');
    this.headerElement = document.querySelector('.js-header');
    this.OPEN_CLASS = 'is-opened';
    this.CLOSED_CLASS = 'is-closed';

  }

  toggleMenuCallback = () => {
    if (this.headerElement.classList.contains(this.OPEN_CLASS)) {
      classList(this.headerElement).remove(this.OPEN_CLASS).add(this.CLOSED_CLASS);
    } else {
      classList(this.headerElement).remove(this.CLOSED_CLASS).add(this.OPEN_CLASS);
    }
  };

  init = () => {
    this.openToggleElement.addEventListener('click', this.toggleMenuCallback);
    this.headerOverlayElement.addEventListener('click', this.toggleMenuCallback);
  }
}
