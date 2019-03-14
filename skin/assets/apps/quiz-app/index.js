import {render} from 'react-dom';
import AppStore from './containers/AppStore';

export default class App {
  constructor(appElement = '.js-quiz-start') {
    this.quizId = -1;
    this.userSubmit = false;
    this.theme = null;

    this.$appElement = document.querySelector(appElement);

    if (this.$appElement) {
      this.quizId = this.$appElement.dataset.quizId;
      this.userSubmit = this.$appElement.dataset.userSubmit;
      this.theme = this.$appElement.dataset.theme;
      this.headerElement = document.querySelector('.js-header');
    }

  }

  init() {
    if (this.$appElement) {
      render(
        <AppStore theme={this.theme} quizId={this.quizId} userSubmit={this.userSubmit} headerElement={this.headerElement} />,
        this.$appElement
      );
    }
  }


}
