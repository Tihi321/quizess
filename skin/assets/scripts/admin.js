/* global pluginOptions */
import generalHelper from '../helpers/general-helper';
import Dashboard from '../dashboard';

generalHelper.domReady(function() {
  const dashboard = new Dashboard();

  // -------------------------------------------------------------
  // dahsboard
  dashboard.init();
});
