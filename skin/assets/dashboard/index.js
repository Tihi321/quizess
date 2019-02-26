import {render} from 'react-dom';
import DashbordStore from './containers/DashbordStore';

export default class Dashboard {
  constructor(appElement = '.js-quizess-dashboard') {
    this.$appElement = document.querySelector(appElement);

  }

  init() {
    render(
      <DashbordStore />,
      this.$appElement
    );
  }
}
