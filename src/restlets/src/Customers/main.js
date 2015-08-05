try {
  core.Log.debug('Step 1', 'Running main.js');

  // this file is utilized by a customers restlet
  // we are revealing these class methods to the
  // global scope for NetSuite
  controller      = new core.CustomersController();
  customer_get    = controller.show.bind(controller);
  customer_post   = controller.store.bind(controller);
  customer_put    = controller.update.bind(controller);
  customer_delete = controller.destroy.bind(controller);

  if(typeof console !== 'undefined') customer_post({id: 1}); // testing only
} catch (e) {
  new core.Controller().internalServerError(e.message);
}
