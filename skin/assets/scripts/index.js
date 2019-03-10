/* global pluginOptions */
import generalHelper from '../helpers/general-helper';
import App from '../apps/quiz-app';
import Modal from './components/modal';

generalHelper.domReady(function() {
  const modal = new Modal();
  const app = new App();

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
  app.init();
});
