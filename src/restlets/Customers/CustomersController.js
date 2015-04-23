(function(core)
{
  core.CustomersController = function()
  {
    core.Log.debug('Step 2', 'Instantiating CustomersController');
    this.customer = new core.Customer();
  };

  core.CustomersController.prototype.index = function(input)
  {
    return this.customer.paginate(input.page, input.per_page);
  };

  core.CustomersController.prototype.show = function(input)
  {
    core.Log.debug('Step 3', 'Finding customer with id ' + input.id);

    

    return this.customer.find(input.id).toJSON();
  };

  core.CustomersController.prototype.store = function(input)
  {
    return this.customer.create(input).toJSON();
  };

  core.CustomersController.prototype.update = function(input)
  {
    return this.customer.update(input).toJSON();
  };

  core.CustomersController.prototype.destroy = function(input)
  {
    return this.customer.find(input.id).delete().toJSON();
  };
})(global || window);
