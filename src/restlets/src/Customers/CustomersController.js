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
      var input     = new core.Input(datain).parseDates();
      var validator = new core.Validator(input, []);

      if (validator.passes()) {
        // return nlapiLoadRecord('customer', 8672); // testing

        // core.Log.debug('filters', input.get('filters'));

        return this.okay(this.customers
                   .filter(input.get('filters', []))
                   .paginate(_.keys(new core.Customer().fields), input.get('page', 1), input.get('per_page', 1000))
                   .toHash());
      } else {
        return this.badRequest(validator.toHash());
      }
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['id']);

      if (validator.passes()) {
        var customer = this.customers.findByExternalId(input.get('id'));
        return customer ? this.okay(customer.toHash()) : this.notFound();
      } else {
        return this.badRequest(validator.toHash());
      }
    },

    store: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['first_name']);

      if (validator.passes()) {
        var customer = this.customers.create(input.toHash());
        return this.created(customer.toHash());
      } else {
        return this.badRequest(validator.toHash());
      }
    },

    update: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['id']);

      if (validator.passes()) {
        var customer = this.customers.update(input.toHash());
        return this.okay(customer.toHash());
      } else {
        return this.badRequest(validator.toHash());
      }
    },

    destroy: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['id']);

      if (validator.passes()) {
        this.customers.destroy(input.get('id'));
        return this.okay([]);
      } else {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
