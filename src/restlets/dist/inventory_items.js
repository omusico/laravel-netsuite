(function(core)
{
  core.InventoryItem = core.Model.extend(
  {
    recordType: 'inventoryitem',

    // fields to be parsed on input
    // fields: {
    //   'id'               : 'int',
    //   'externalid'       : 'string', // this must be a string or it will add a .0 to the end, you got me...
    //   'firstname'        : 'string',
    //   'lastname'         : 'string',
    //   'phone'            : 'string',
    //   'email'            : 'string',
    //   'datecreated'      : 'timestamp',
    //   'lastmodifieddate' : 'timestamp',
    //   'category'         : 'int',
    //   'pricelevel'       : 'int',
    //   'isperson'         : 'string',
    //   'taxable'          : 'string'
    // },

    // sublists to be parsed on input
    // sublists: {
    //   'addressbook' : core.Address
    // },

    // fields to be parsed on output
    // visible: [
    //   'id',
    //   'customers_id',
    //   'customers_firstname',
    //   'customers_lastname',
    //   'customers_telephone',
    //   'customers_email_address',
    //   'created_at',
    //   'updated_at',
    //   'addresses'
    // ],
  });
})(core);

(function(core)
{
  core.InventoryItemSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'         : 'int',
      'externalid' : 'string',
      'created'    : 'timestamp',
      'modified'   : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'id',
      'products_id',
      'created_at',
      'updated_at'
    ],

    getProductsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'created');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'modified');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    }
  });
})(core);

(function(core)
{
  core.InventoryItemRepository = core.Repository.extend(
  {
    recordClass: core.InventoryItem,
    searchClass: core.InventoryItemSearchResult,

    searchColumns: [
      'externalid',
      'created',
      'modified'
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
  core.InventoryItemsController = core.Controller.extend(
  {
    initialize: function()
    {
      this.inventoryItems = new core.InventoryItemRepository();
    },

    index: function(datain)
    {
      var input          = new core.Input(datain).parseDates().parseArrays();
      var inventoryItems = this.inventoryItems
                          .filter(input.get('filters', []))
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(inventoryItems.toHash());
    },

    // show: function(datain)
    // {
    //   var input     = new core.Input(datain);
    //   var validator = new core.Validator(input, {id: 'required'}, {customers_id : 'required'});
    //
    //   if (validator.passes())
    //   {
    //     var customer = input.has('id') ? this.customers.find(input.get('id')) : this.customers.findByExternalId(input.get('customers_id'));
    //     return customer ? this.okay(customer.toHash()) : this.notFound();
    //   }
    //   else
    //   {
    //     return this.badRequest(validator.toHash());
    //   }
    // },
    //
    // store: function(datain)
    // {
    //   var input = new core.Input(datain).parseArrays();
    //
    //   var validator = new core.Validator(input, {
    //     customers_id           : 'required',
    //     customers_firstname    : 'required',
    //     customers_lastname     : 'required',
    //     customers_telephone    : 'required',
    //     customers_email_address: 'required'
    //   });
    //
    //   if (validator.passes())
    //   {
    //     // set defaults
    //     var attrs = _.defaults(input.only(
    //       'customers_id',
    //       'customers_firstname',
    //       'customers_lastname',
    //       'customers_telephone',
    //       'customers_email_address',
    //       'addresses'
    //     ), {
    //       category  : 3,   // Retail
    //       pricelevel: 5,   // Retail Pricing
    //       isperson  : 'T', // Individual
    //       taxable   : 'T'  // Taxable
    //     });
    //
    //     var customer = this.customers.create(attrs);
    //
    //     return this.created(customer.toHash());
    //   }
    //   else
    //   {
    //     return this.badRequest(validator.toHash());
    //   }
    // },
    //
    // update: function(datain)
    // {
    //   var input     = new core.Input(datain);
    //   var validator = new core.Validator(input, {
    //     id                     : 'required',
    //     customers_id           : 'required',
    //     customers_firstname    : 'required',
    //     customers_lastname     : 'required',
    //     customers_telephone    : 'required',
    //     customers_email_address: 'required'
    //   });
    //
    //   if (validator.passes())
    //   {
    //     // set defaults
    //     var attrs = input.only(
    //       'id',
    //       'customers_id',
    //       'customers_firstname',
    //       'customers_lastname',
    //       'customers_telephone',
    //       'customers_email_address',
    //       'addresses'
    //     );
    //
    //     var customer = this.customers.update(attrs);
    //     return this.okay(customer.toHash());
    //   }
    //   else
    //   {
    //     return this.badRequest(validator.toHash());
    //   }
    // },
    //
    // destroy: function(datain)
    // {
    //   var input     = new core.Input(datain);
    //   var validator = new core.Validator(input, {id: 'required'}, {customers_id : 'required'});
    //
    //   if (validator.passes())
    //   {
    //     try
    //     {
    //       var success = input.has('id') ?
    //                     this.customers.destroy(input.get('id')) :
    //                     this.customers.destroyByExternalId(input.get('customers_id'));
    //
    //       // returns are ignored for delete requests?
    //       // return success ? this.okay([]) : this.notFound();
    //     }
    //     catch(e)
    //     {
    //       // return this.internalServerError(e); // returns are ignored for delete requests?
    //       this.internalServerError(e);
    //     }
    //   }
    //   else
    //   {
    //     // return this.badRequest(validator.toHash()); // returns are ignored for delete requests?
    //     this.badRequest(validator.toHash());
    //   }
    // }
  });
})(core);
