import {render} from 'react-dom';
import QuizApp from './QuizApp';

export default class App {
  constructor(appElement = '.js-quiz-start') {
    this.$appElement = document.querySelector(appElement);
    this.apiAddress = this.$appElement.dataset.api;
  }

  init() {
    render(
      <QuizApp api={this.apiAddress} />,
      this.$appElement
    );
  }


}
