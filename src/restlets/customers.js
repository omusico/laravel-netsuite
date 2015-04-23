(function(core)
{
  /**
  * type: log type (audit, debug, error, emergency)
  * title: a title used to organize log entries (max length: 99 characters)
  * details: details of the log entry (max length: 3000 characters)
  */
  var log = function(type, title, details)
  {
    nlapiLogExecution(type, title, details);
  };

  core.Log = {
    audit: function(title, details)
    {
      log('AUDIT', title, details);
    },

    debug: function(title, details)
    {
      log('DEBUG', title, details);
    },

    error: function(title, details)
    {
      log('ERROR', title, details);
    },

    emergency: function(title, details)
    {
      log('EMERGENCY', title, details);
    }
  };
})(global || window);

(function(core)
{
  core.Util = {
    extend: function(target, source)
    {
      Object.getOwnPropertyNames(source).forEach(function(propKey)
      {
        var desc = Object.getOwnPropertyDescriptor(source, propKey);
        Object.defineProperty(target, propKey, desc);
      });

      return target;
    }
  };
})(global || window);

(function(core)
{
  core.Model = function(attrs) {
    this.attrs = {};
    this.set(attrs || {});
    this.initialize.apply(this, arguments);
  };

  core.Model.prototype.initialize = function() {};

  core.Model.prototype.set = function(key, value)
  {
    if (arguments.length > 1) {
      this.attrs[key] = value;
    } else {
      this.attrs = key;
    }
  };

  core.Model.prototype.get = function(key)
  {
    return this.attrs[key];
  };

  core.Model.prototype.toHash = function()
  {
    return this.attrs;
  };

  core.Model.prototype.toJSON = function()
  {
    return JSON.stringify(this.toHash());
  };

  core.Model.extend = function(protoProps, staticProps)
  {
    var parent = this;
    var child;

    if (protoProps && protoProps.constructor) {
      child = protoProps.constructor;
    } else {
      child = function() { return parent.apply(this, arguments); };
    }

    core.Util.extend(child, parent);
    if(staticProps) core.Util.extend(child, staticProps);
    var Surrogate = function() { this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    if (protoProps) core.Util.extend(child.prototype, protoProps);
    child.__super__ = parent.prototype;

    return child;
  };
})(global || window);

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

(function(core)
{
  core.CustomersController = function()
  {
    this.customer = new core.Customer();
  };

  core.CustomersController.prototype.index = function(input)
  {
    return this.customer.paginate(input.page, input.per_page);
  };

  core.CustomersController.prototype.show = function(input)
  {
    return this.customer.find(input.id).toJSON();
  };

  core.CustomersController.prototype.store = function(input)
  {
    return this.customer.create(input);
  };

  core.CustomersController.prototype.update = function(input)
  {
    return this.customer.update(input);
  };

  core.CustomersController.prototype.destroy = function(input)
  {
    return this.customer.find(input.id);
  };
})(global || window);

(function(core)
{
  // this file is utilized by a customers restlet
  core.controller      = new core.CustomersController();
  core.customer_get    = controller.show;
  core.customer_post   = controller.store;
  core.customer_put    = controller.update;
  core.customer_delete = controller.destroy;
})(global || window);
