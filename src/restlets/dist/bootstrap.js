(function(global)
{
  global.main = function(datain)
  {
    try
    {
      // create a global input object
      global.input = new core.Input(datain).parseDates().parseArrays();

      core.Log.register('input', input.all());

      // validate that a url and method were sent so that we can match a route
      var validator = new core.Validator(input, {url: 'required', method: 'required'});

      if(validator.passes())
      {
        var router = new core.Router();

        // register routes

        router.resource('cash_sales',        'CashSalesController');
        router.resource('sales_orders',      'SalesOrdersController');

        router.resource('customers',         'CustomersController');
        router.resource('inventory_items',   'InventoryItemsController');

        router.resource('gift_certificates', 'GiftCertificatesController');
        router.resource('promotions',        'PromotionsSalesController');

        // match a route!
        var match = router.match(input.get('method').toLowerCase(), input.get('url'));

        if (match)
        {
          // set the params that might have been
          // matched in the url to the global input object
          input.set(router.params);

          // fire the route
          return match();
        }

        // if no route matched return a 404
        return new core.Controller().notFound('No route matched');
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
  };

})(this);
