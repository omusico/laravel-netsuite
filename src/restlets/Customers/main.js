
core.Log.debug('Step 1', 'Running main.js');

// this file is utilized by a customers restlet
// we are revealing these class methods to the
// global scope for NetSuite
controller      = new core.CustomersController();
customer_get    = controller.show;
customer_post   = controller.store;
customer_put    = controller.update;
customer_delete = controller.destroy;
