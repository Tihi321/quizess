import {render} from 'react-dom';
import MenuStore from './containers/MenuStore';

export default class Menu {
  constructor(menuElement = '.js-header-menu') {

    this.$menuElement = document.querySelector(menuElement);
  }

  init() {
    if (this.$menuElement) {
      render(
        <MenuStore />,
        this.$menuElement
      );
    }
  }
}
