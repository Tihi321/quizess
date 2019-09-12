import {domReady} from '../utils/dom';
import Dashboard from '../apps/dashboard';

domReady(function() {
  const dashboard = new Dashboard();

  // -------------------------------------------------------------
  // dahsboard
  dashboard.init();
});
