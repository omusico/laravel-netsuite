try
{
  new core.Router()
          .resource('sales_orders', 'SalesOrdersController')
          .start('sales_orders', this);
}
catch (e)
{
  new core.Controller().internalServerError(e.message);
}
