(function(core)
{
  core.Log.debug('Step 1', 'Running main.js');

  // this file is utilized by a customers restlet
  // we are revealing these class methods to the
  // global scope for NetSuite
  core.controller      = new core.CustomersController();
  core.customer_get    = controller.show;
  core.customer_post   = controller.store;
  core.customer_put    = controller.update;
  core.customer_delete = controller.destroy;
})(global || window);
