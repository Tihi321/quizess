import {domReady} from '../utils/dom';

domReady(() => {

  // -------------------------------------------------------------
  // Modal
  if (document.querySelector('.js-modal-trigger-open')) {
    import('./components/modal').then(({Modal}) => {
      const modal = new Modal();
      modal.init();
    });
  }

  // -------------------------------------------------------------
  // Menu
  if (document.querySelector('.js-quizess-header-menu')) {
    import('../apps/menu-app').then(({Menu}) => {
      const menu = new Menu();
      menu.init();
    });
  }

  // -------------------------------------------------------------
  // Menu toggle
  if (document.querySelector('.js-quizess-menu-toggle')) {
    import('./components/menu-toggle').then(({MenuToggle}) => {
      const menuToggle = new MenuToggle();
      menuToggle.init();
    });
  }

  // -------------------------------------------------------------
  // App
  if (document.querySelector('.js-quiz-start')) {
    import('../apps/quiz-app').then(({App}) => {
      const app = new App();
      app.init();
    });
  }

});
