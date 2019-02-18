import {render} from 'react-dom';
import AppStore from './containers/AppStore';

export default class App {
  constructor(appElement = '.js-quiz-start') {
    this.$appElement = document.querySelector(appElement);
    this.apiAddress = this.$appElement.dataset.api;
    this.theme = this.$appElement.dataset.theme;

  }

  init() {
    render(
      <AppStore api={this.apiAddress} theme={this.theme} />,
      this.$appElement
    );
  }


}
