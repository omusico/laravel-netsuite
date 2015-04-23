(function(core)
{
  core.CustomersController = core.Controller.extend(
  {
    initialize: function()
    {
      core.Log.debug('Step 2', 'Instantiating CustomersController');
      this.customers = new core.CustomerRepository();
    },

    // index: function(input)
    // {
    //   return this.customers.paginate(input.page, input.per_page);
    // },

    show: function(input)
    {
      core.Log.debug('Step 4', 'Finding customer with id ' + input.id);
      var customer = this.customers.find(input.id);
      return customer ? customer.toJSON() : this.notFound();
    },

    // store: function(input)
    // {
    //   return this.customers.create(input).toJSON();
    // },
    //
    // update: function(input)
    // {
    //   return this.customers.update(input).toJSON();
    // },
    //
    // destroy: function(input)
    // {
    //   return this.customers.find(input.id).delete().toJSON();
    // }
  });
})(core);
