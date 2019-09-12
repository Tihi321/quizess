import {render} from 'react-dom';
import MenuStore from './containers/MenuStore';

export class Menu {
  constructor(menuElement = '.js-header-menu') {

    this.$menuElement = document.querySelector(menuElement);

    if (this.$menuElement) {
      this.theme = this.$menuElement.dataset.theme;
    }
  }

  init() {
    render(
      <MenuStore theme={this.theme} />,
      this.$menuElement
    );
  }
}
