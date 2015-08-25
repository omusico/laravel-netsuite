try
{
  new core.Router()
          .resource('customers', 'CustomersController')
          .start('customers', this);
}
catch (e)
{
  new core.Controller().internalServerError(e.message);
}
