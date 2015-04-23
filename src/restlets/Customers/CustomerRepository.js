var CustomerRepository = (function()
{
  var CustomerRepository = function() {};

  CustomerRepository.paginate = function()
  {
    
  };

  CustomerRepository.find = function(id)
  {
    return new Customer(nlapiLoadRecord('customer', id));
  };

  CustomerRepository.create = function(data)
  {
    return new Customer(data).save();
  };

  CustomerRepository.update = function(id, data)
  {

  };

  CustomerRepository.destroy = function(id)
  {
    var customer = CustomerRepository.find(id);
    customer.delete();
  };

  return CustomerRepository;
})();
