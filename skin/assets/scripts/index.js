/* global pluginOptions */
import generalHelper from '../helpers/general-helper';
import App from '../apps/quiz-app';
import Menu from '../apps/menu-app';
import Modal from './components/modal';
import MenuToggle from './components/menu-toggle';

generalHelper.domReady(function() {
  const modal = new Modal();
  const app = new App();
  const menu = new Menu();
  const menuToggle = new MenuToggle();

  // -------------------------------------------------------------
  // modal
  modal.$openTriggers.forEach((element) => {
    element.addEventListener('click', function() {
      const id = modal.getId(this);

      modal.open(id);
    });
  });
  modal.$closeTriggers.forEach((element) => {
    element.addEventListener('click', function() {
      const id = modal.getId(this);

      modal.close(id);
    });
  });

  // -------------------------------------------------------------
  // menu
  menu.init();

  // -------------------------------------------------------------
  // menu toggle
  // if menu exists add event listener
  if (menuToggle.openToggleElement) {
    menuToggle.openToggleElement.addEventListener('click', (e) => {
      menuToggle.init(e.currentTarget);
    });
    menuToggle.headerOverlayElement.addEventListener('click', (e) => {
      menuToggle.init(e.currentTarget, true);
    });
  }

  // -------------------------------------------------------------
  // app
  app.init();
});
