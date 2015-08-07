try
{
  // this file is utilized by a customers restlet
  // we are revealing these class methods to the
  // global scope for NetSuite

  var start = new core.Router()
                      .resource('customers', 'CustomersController')
                      .start;

}
catch (e)
{
  new core.Controller().internalServerError(e.message);
}
