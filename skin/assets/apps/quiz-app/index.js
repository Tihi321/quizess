import {render} from 'react-dom';
import AppStore from './containers/AppStore';

export class App {
  constructor(appElement = '.js-quiz-start') {
    this.quizId = -1;
    this.userSubmit = false;
    this.theme = null;

    this.$appElement = document.querySelector(appElement);

    /**
     * Get data variables:
     * quizID - quiz id fot quiz endoiint
     * userSubmit - variable is set to 1 if players record will be tracked
     * theme - quiz theme for button colors
     * headerElemeent - element of sidemenu, we change z index of sidemenu to fix overlap
     */
    this.quizId = this.$appElement.dataset.quizId;
    this.userSubmit = this.$appElement.dataset.userSubmit;
    this.theme = this.$appElement.dataset.theme;
    this.headerElement = document.querySelector('.js-quizess-header');

  }

  init() {
    render(
      <AppStore theme={this.theme} quizId={this.quizId} userSubmit={this.userSubmit} headerElement={this.headerElement} />,
      this.$appElement
    );
  }


}
