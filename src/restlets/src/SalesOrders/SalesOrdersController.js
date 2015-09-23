(function(core)
{
  core.SalesOrdersController = core.Controller.extend(
  {
    initialize: function()
    {
      this.salesOrders = new core.SalesOrderRepository();
    },

    index: function(datain)
    {
      var input       = new core.Input(datain).parseDates().parseArrays();
      var salesOrders = this.salesOrders
                          .filter(input.get('filters', []))
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(salesOrders.toHash());
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {ns_id: 'required'}, {orders_id : 'required'});

      if (validator.passes())
      {
        var salesOrder = input.has('ns_id')
                       ? this.salesOrders.find(input.get('ns_id'))
                       : this.salesOrders.findByExternalId(input.get('orders_id'));

        return salesOrder ? this.okay(salesOrder.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
