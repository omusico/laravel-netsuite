var Customer = (function()
{
  var Customer = function(data)
  {
    this.data = data || {};
  };

  Customer.prototype.set = function(data)
  {
    if (arguments.length > 1) {
      this.data = this.data || {};
      this.data[arguments[0]] = arguments[1];
    } else {
      this.data = data;
    }
  };

  Customer.prototype.toArray = function()
  {
    return this.data;
  };

  Customer.prototype.toJSON = function()
  {
    return JSON.stringify(this.toArray());
  };

  return Customer;
})();
