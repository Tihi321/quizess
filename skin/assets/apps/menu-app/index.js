import {render} from 'react-dom';
import MenuStore from './containers/MenuStore';

export default class Menu {
  constructor(menuElement = '.js-header-menu') {

    this.$menuElement = document.querySelector(menuElement);

    if (this.$menuElement) {
      this.theme = this.$menuElement.dataset.theme;
    }
  }

  init() {
    if (this.$menuElement) {
      render(
        <MenuStore theme={this.theme} />,
        this.$menuElement
      );
    }
  }
}
