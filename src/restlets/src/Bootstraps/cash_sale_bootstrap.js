try
{
  new core.Router()
          .resource('cash_sales', 'CashSalesController')
          .start('cash_sales', this);
}
catch (e)
{
  new core.Controller().internalServerError(e);
}
