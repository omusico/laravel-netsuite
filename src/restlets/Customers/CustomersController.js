(function(core)
{
  core.CustomersController = core.Controller.extend(
  {
    initialize: function()
    {
      core.Log.debug('Step 2', 'Instantiating CustomersController');
      this.customers = new core.CustomerRepository();
    },

    index: function(datain)
    {
      var input     = new core.Input(datain);
      return this.customers.paginate(input.page, input.per_page);
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['id']);

      core.Log.debug('Step 4', 'Finding customer with id ' + input.get('id'));

      if (validator.passes()) {
        var customer = this.customers.find(input.get('id'));
        return customer ? customer : this.notFound();
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
