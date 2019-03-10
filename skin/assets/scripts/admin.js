/* global pluginOptions */
import generalHelper from '../helpers/general-helper';
import Dashboard from '../apps/dashboard';

generalHelper.domReady(function() {
  const dashboard = new Dashboard();

  // -------------------------------------------------------------
  // dahsboard
  dashboard.init();
});
