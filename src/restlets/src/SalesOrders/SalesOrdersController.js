(function(core)
{
  core.SalesOrdersController = core.Controller.extend(
  {
    initialize: function()
    {
      this.salesOrders = new core.SalesOrderRepository();
    },

    index: function()
    {
      var salesOrders = this.salesOrders
                            .filter(input.get('filters', []))
                            .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(salesOrders.toHash());
    },

    show: function()
    {
      var validator = new core.Validator(input, {ns_id: 'required'}, {orders_id : 'required'});

      if (validator.passes())
      {
        var salesOrder = input.has('ns_id')
                       ? this.salesOrders.find(input.get('ns_id'))
                       : this.salesOrders.findByExternalId(input.get('orders_id'));

        // return this.okay({model: salesOrder.toHash(), record: nlapiLoadRecord('salesorder', input.get('ns_id'))});

        return salesOrder ? this.okay(salesOrder.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    store: function()
    {
      var validator = new core.Validator(input, {

      });

      if (validator.passes())
      {
        // set defaults
        var attrs = _.defaults(input.only(

        ), {
          class: 3,   // web order
          location: 4 // web warehouse
        });

        try
        {
          var salesOrder = this.salesOrders.create(attrs);

          return this.created(salesOrder.toHash());
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    update: function()
    {
      var validator = new core.Validator(input, {
        ns_id: 'required',
      });

      if (validator.passes())
      {
        // get what we need
        var attrs = input.only(

        );

        try
        {
          var salesOrder = this.salesOrders.update(attrs);

          return this.okay(salesOrder.toHash());
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
