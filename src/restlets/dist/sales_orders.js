(function(core)
{
  core.SalesOrder = core.Model.extend(
  {
    recordType: 'salesorder',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'orders_id'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getOrdersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'createddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'lastmodifieddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    }
  });
})(core);

(function(core)
{
  core.SalesOrderSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'orders_id',
      'created_at',
      'updated_at'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getOrdersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'datecreated');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'lastmodifieddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    }
  });
})(core);

(function(core)
{
  core.SalesOrderRepository = core.Repository.extend(
  {
    recordClass: core.SalesOrder,
    searchClass: core.SalesOrderSearchResult,

    searchColumns: [
      'externalid',
      'datecreated',
      'lastmodifieddate'
    ],

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      return results.map(function(result)
      {
        return new this.searchClass(result);
      }, this);
    },

    // create: function(attrs)
    // {
    //   var model = new this.recordClass(attrs, {mutate: true});
    //
    //   // this model will have id set on it, but might be missing some sublist ids
    //   model = core.Repository.prototype.create.call(this, model);
    //
    //   // reload model so ids are set on sublists etc
    //   model = this.find(model.get('id'));
    //
    //   return model;
    // },
    //
    // update: function(attrs)
    // {
    //   var model = this.find(attrs.id);
    //   if ( ! model) return false;
    //   model.set(attrs);
    //
    //   // this model might be missing some sublist ids
    //   model = core.Repository.prototype.update.call(this, model);
    //
    //   // reload model so ids are set on sublists etc
    //   model = this.find(model.get('id'));
    //
    //   return model;
    // },
    //
    // destroy: function(id)
    // {
    //   var model = this.find(id);
    //   if ( ! model) return false;
    //   return core.Repository.prototype.destroy.call(this, model);
    // },
    //
    // destroyByExternalId: function(external_id)
    // {
    //   var model = this.findByExternalId(external_id);
    //   if ( ! model) return false;
    //   return core.Repository.prototype.destroy.call(this, model);
    // }
  });
})(core);

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
