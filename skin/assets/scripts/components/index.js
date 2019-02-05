import general from '../helpers/general';
import App from '../app';
import Modal from './modal';

general.domReady(function() {
  const modal = new Modal();
  const app = new App();

  // -------------------------------------------------------------
  // modal
  modal.$openTrigger.addEventListener('click', function(e) {
    const id = modal.getId(this);

    modal.open(id);
  });

  modal.$closeTrigger.addEventListener('click', function(e) {
    const id = modal.getId(this);

    modal.close(id);
  });

  // -------------------------------------------------------------
  // app
  app.init();
});
