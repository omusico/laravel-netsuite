(function(core)
{
  core.CustomersController = core.Controller.extend(
  {
    initialize: function()
    {
      this.customers = new core.CustomerRepository();
    },

    index: function(datain)
    {
      var input     = new core.Input(datain).parseDates().parseArrays();
      var customers = this.customers
                          .filter(input.get('filters', []))
                          .orderBy('lastmodifieddate', 'ASC')
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(customers.toHash());
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {ns_id: 'required'}, {customers_id : 'required'});

      if (validator.passes())
      {
        try
        {
          var customer = input.has('ns_id')
                       ? this.customers.find(input.get('ns_id'))
                       : this.customers.findByExternalId(input.get('customers_id'));

          return customer ? this.okay(customer.toHash()) : this.notFound();
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

    store: function(datain)
    {
      var input = new core.Input(datain).parseArrays();

      var validator = new core.Validator(input, {
        customers_id           : 'required',
        customers_firstname    : 'required',
        customers_lastname     : 'required',
        customers_telephone    : 'required',
        customers_email_address: 'required'
      });

      if (validator.passes())
      {
        // set defaults
        var attrs = _.defaults(input.only(
          'customers_id',
          'customers_firstname',
          'customers_lastname',
          'customers_telephone',
          'customers_email_address',
          'rewards_balance',
          'category',
          'pricelevel',
          'isperson',
          'taxable',
          'addresses'
        ), {
          category  : 3,   // Retail
          pricelevel: 5,   // Retail Pricing
          isperson  : 'T', // Individual
          taxable   : 'T'  // Taxable
        });

        try
        {
          var customer = this.customers.create(attrs);

          return this.created(customer.toHash());
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

    update: function(datain)
    {
      var input     = new core.Input(datain).parseArrays();
      var validator = new core.Validator(input, {
        ns_id: 'required',
      });

      if (validator.passes())
      {
        // get what we need
        var attrs = input.only(
          'ns_id',
          'customers_id',
          'customers_firstname',
          'customers_lastname',
          'customers_telephone',
          'customers_email_address',
          'rewards_balance',
          'category',
          'pricelevel',
          'isperson',
          'taxable',
          'addresses'
        );

        try
        {
          var customer = this.customers.update(attrs);

          return this.okay(customer.toHash());
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

    // destroy: function(datain)
    // {
    //   var input     = new core.Input(datain);
    //   var validator = new core.Validator(input, {ns_id: 'required'}, {customers_id : 'required'});
    //
    //   if (validator.passes())
    //   {
    //     try
    //     {
    //       var success = input.has('ns_id') ?
    //                     this.customers.destroy(input.get('ns_id')) :
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
