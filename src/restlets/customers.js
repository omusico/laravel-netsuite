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

(function (core)
{
  core.Base = function(attrs) {
    this.initialize.apply(this, arguments);
  };

  core.Base.extend = function(protoProps, staticProps)
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

(function(core)
{
  core.Model = core.Base.extend(
  {
    constructor: function(attrs)
    {
      this.attrs = {};
      this.set(attrs || {});
      this.initialize.apply(this, arguments);
    },

    set: function(key, value)
    {
      if (arguments.length > 1) {
        this.attrs[key] = value;
      } else {
        this.attrs = key;
      }
    },

    get: function(key)
    {
      return this.attrs[key];
    },

    toHash: function()
    {
      return this.attrs;
    },

    toJSON: function()
    {
      return JSON.stringify(this.toHash());
    }
  });
})(global || window);

(function(core)
{
  core.Controller = core.Base.extend(
  {
    constructor: function(attrs)
    {
      this.initialize.apply(this, arguments);
    },

    notFound: function(message)
    {
      return this.error(404, message || 'Not Found');
    },

    error: function(code, message)
    {
      return JSON.stringify(
      {
        'error':
        {
          'code':    code,
          'message': message
        }
      });
    }
  });
})(global || window);

(function(core)
{
  core.Repository = core.Base.extend(
  {
    recordType: '',
    recordClass: '',

    constructor: function()
    {
      if ( ! this.recordType) throw 'Repository missing recordType';
      if ( ! this.recordClass) throw 'Repository missing recordClass';
    },

    find: function(id)
    {
      var record = nlapiLoadRecord(this.recordType, id);
      core.Log.debug('Step 5', 'Found record with id ' + record.getId());
      return data.internalId ? new this.recordClass(record.getAllFields()) : null;
    },

    // paginate: function(page, per_page) {},
    // create: function(data) {},
    // update: function(id, data) {},
    // destroy: function(id) {}
  });
})(global || window);

(function(core)
{
  var Customer = core.Model.extend(
  {
    initialize: function()
    {
      core.Log.debug('Step 3', 'Customer model initialized');
    }
  });
})(global || window);

(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordType: 'customer',
    recordClass: Customer,
    // paginate: function(page, per_page)
    // {
    //
    // },

    find: function(id)
    {
      var record = nlapiLoadRecord(this.recordType, id);
      core.Log.debug('Step 5', 'Found record with id ' + record.getId());
      return data.internalId ? new this.recordClass(record.getAllFields()) : null;
    },

    // create: function(data)
    // {
    //   return new Customer(data).save();
    // },
    //
    // update: function(id, data)
    // {
    //
    // },
    //
    // destroy: function(id)
    // {
    //   var customer = CustomerRepository.find(id);
    //   customer.delete();
    // }
  });
})(global || window);

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
})(global || window);

(function(core)
{
  core.Log.debug('Step 1', 'Running main.js');

  // this file is utilized by a customers restlet
  // we are revealing these class methods to the
  // global scope for NetSuite
  core.controller      = new core.CustomersController();
  core.customer_get    = controller.show;
  core.customer_post   = controller.store;
  core.customer_put    = controller.update;
  core.customer_delete = controller.destroy;
})(global || window);
