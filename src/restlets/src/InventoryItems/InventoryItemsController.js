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

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {id: 'required'}, {products_id : 'required'});

      // return nlapiLoadRecord('inventoryitem', input.get('products_id'));

      if (validator.passes())
      {
        var inventoryItem = input.has('id') ? this.inventoryItems.find(input.get('id')) : this.inventoryItems.findByExternalId(input.get('products_id'));
        return inventoryItem ? this.okay(inventoryItem.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },
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