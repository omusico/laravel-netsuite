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


      var input          = new core.Input(datain).parseDates().parseArrays();

      var record = nlapiLoadRecord('salesorder', 59229);
      core.Log.debug('fields', {recordType: record.getRecordType(), fields: record.getAllFields()});

      return record;

      // var salesOrders = this.salesOrders
      //                     .filter(input.get('filters', []))
      //                     .paginate(input.get('page', 1), input.get('per_page', 10));
      //
      // return this.okay(salesOrders.toHash());
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {id: 'required'}, {orders_id : 'required'});

      // return nlapiLoadRecord('salesorder', input.get('id'));

      if (validator.passes())
      {
        var salesOrder = input.has('id') ? this.salesOrders.find(input.get('id')) : this.salesOrders.findByExternalId(input.get('orders_id'));
        return salesOrder ? this.okay(salesOrder.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
