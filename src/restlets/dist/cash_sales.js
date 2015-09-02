(function(core)
{
  core.CashSaleItem = core.SalesOrderItem.extend(
  {
    fields: {
      'quantity' : 'int',   // quantity
      'rate'     : 'float', // price
      'amount'   : 'float', // line item price
      'taxcode'  : 'int',   // tax code
      'location' : 'int',
    }
  });
})(core);

(function(core)
{
  core.CashSale = core.SalesOrder.extend(
  {
    recordType: 'cashsale',

    sublists: {
      item: core.CashSaleItem
    }
  });
})(core);

(function(core)
{
  core.CashSaleSearchResult = core.SalesOrderSearchResult.extend({});
})(core);

(function(core)
{
  core.CashSaleRepository = core.SalesOrderRepository.extend(
  {
    recordClass: core.CachSale,
    searchClass: core.CachSaleSearchResult,
  });
})(core);

(function(core)
{
  core.CashSalesController = core.Controller.extend(
  {
    initialize: function()
    {
      this.cachSales = new core.CashSaleRepository();
    },

    index: function(datain)
    {
      var input          = new core.Input(datain).parseDates().parseArrays();
      var cachSales = this.cachSales
                          .filter(input.get('filters', []))
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(cachSales.toHash());
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {ns_id: 'required'}, {orders_id : 'required'});

      if (validator.passes())
      {
        var cachSale = input.has('ns_id') ? this.cachSales.find(input.get('ns_id')) : this.cachSales.findByExternalId(input.get('orders_id'));
        return cachSale ? this.okay(cachSale.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
