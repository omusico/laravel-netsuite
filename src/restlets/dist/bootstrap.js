var context = this;

function main(datain)
{
  try
  {
    context.input = new core.Input(datain).parseDates().parseArrays();
    var validator = new core.Validator(input, {controller: 'required', method: 'required'});

    if(validator.passes())
    {
      var router = new core.Router();

      router.resource('cash_sales',        'CashSalesController');
      router.resource('sales_orders',      'SalesOrdersController');

      router.resource('customers',         'CustomersController');
      router.resource('inventory_items',   'InventoryItemsController');

      router.resource('gift_certificates', 'GiftCertificatesController');
      router.resource('promotions',        'PromotionsSalesController');

      input.set(params);

      return router.match()();
    }
    else
    {
      return new core.Controller().badRequest(validator.toHash());
    }
  }
  catch (e)
  {
    return new core.Controller().internalServerError(e);
  }
}
