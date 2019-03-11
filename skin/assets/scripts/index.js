/* global pluginOptions */
import generalHelper from '../helpers/general-helper';
import App from '../apps/quiz-app';
import Menu from '../apps/menu-app';
import Modal from './components/modal';

generalHelper.domReady(function() {
  const modal = new Modal();
  const app = new App();
  const menu = new Menu();

  // -------------------------------------------------------------
  // modal
  modal.$openTriggers.forEach((element) => {
    element.addEventListener('click', function(e) {
      const id = modal.getId(this);

      modal.open(id);
    });
  });
  modal.$closeTriggers.forEach((element) => {
    element.addEventListener('click', function(e) {
      const id = modal.getId(this);

      modal.close(id);
    });
  });

  // -------------------------------------------------------------
  // app
  menu.init();
  app.init();
});
