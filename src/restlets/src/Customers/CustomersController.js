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
      var input = new core.Input(datain);
      var validator = new core.Validator(input, ['key', 'value']);

      if (validator.passes()) {
        // return nlapiLoadRecord('customer', 8672);

        return this.customers.where(input.get('key'), input.get('operator', 'is'), input.get('value')).get().toHash();
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
        return customer ? customer.toHash() : this.notFound();
      } else {
        return this.badRequest(validator.toHash());
      }
    },

    store: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['firstName']);

      if (validator.passes()) {
        var customer = this.customers.create(input.toHash());
        return customer.toJSON();
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
        return customer.toJSON();
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
        return '[]';
      } else {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
