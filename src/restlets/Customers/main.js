try {
  core.Log.debug('Step 1', 'Running main.js');

  // this file is utilized by a customers restlet
  // we are revealing these class methods to the
  // global scope for NetSuite
  controller      = new core.CustomersController();
  customer_get    = controller.show.bind(controller);
  // customer_post   = controller.store.bind(controller);
  // customer_put    = controller.update.bind(controller);
  // customer_delete = controller.destroy.bind(controller);

  if(console) customer_get({id: 1}); // testing only
} catch (e) {
   core.Log.error('Customers RESTlet', e.message);
  //  var response = new core.Controller();
  //  document.write(response.internalServerError(e.message));
}
