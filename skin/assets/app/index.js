import {render} from 'react-dom';
import AppStore from './containers/AppStore';

export default class App {
  constructor(appElement = '.js-quiz-start') {
    this.$appElement = document.querySelector(appElement);
    this.quizId = this.$appElement.dataset.quizId;

    this.theme = this.$appElement.dataset.theme;

  }

  init() {
    render(
      <AppStore theme={this.theme} quizId={this.quizId} />,
      this.$appElement
    );
  }


}
