import {render} from 'react-dom';
import AppStore from './containers/AppStore';

export default class App {
  constructor(appElement = '.js-quiz-start') {
    this.$appElement = document.querySelector(appElement);
    this.quizId = this.$appElement.dataset.quizId;
    this.userSubmit = this.$appElement.dataset.userSubmit;
    this.theme = this.$appElement.dataset.theme;

  }

  init() {
    render(
      <AppStore theme={this.theme} quizId={this.quizId} userSubmit={this.userSubmit} />,
      this.$appElement
    );
  }


}
