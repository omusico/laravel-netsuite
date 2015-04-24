var Core = function() {};

var core = new Core();

(function(core)
{
  /**
  * type: log type (audit, debug, error, emergency)
  * title: a title used to organize log entries (max length: 99 characters)
  * details: details of the log entry (max length: 3000 characters)
  */
  var log = function(type, title, details)
  {
    if(typeof console != 'undefined')
      console.log(type, title, details);
    else
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
})(core);

(function(core)
{
  core.Util = {
    extend: function(target, source)
    {
      target = target || {};

      for (var prop in source) {
        if (typeof source[prop] === 'object') {
          target[prop] = core.Util.extend(target[prop], source[prop]);
        } else {
          target[prop] = source[prop];
        }
      }

      return target;
    },

    has: function(obj, key)
    {
      return obj !== null && hasOwnProperty.call(obj, key);
    }
  };
})(core);

(function (core)
{
  core.Base = function(attrs) {};

  core.Base.extend = function(protoProps, staticProps)
  {
    var parent = this;
    var child;

    if (protoProps && core.Util.has(protoProps, 'constructor')) {
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
})(core);

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

    initialize: function() {},

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
})(core);

(function(core)
{
  core.Controller = core.Base.extend(
  {
    constructor: function()
    {
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    notFound: function(message)
    {
      return this.error(404, message || 'Not Found');
    },

    internalServerError: function(message)
    {
      return this.error(500, message || 'Internal Server Error');
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
})(core);

(function(core)
{
  core.Repository = core.Base.extend(
  {
    recordType: '',
    recordClass: '',

    constructor: function()
    {
      if ( ! this.recordType)  throw 'Repository missing recordType';
      if ( ! this.recordClass) throw 'Repository missing recordClass';
      this.initialize.apply(this, arguments);
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
})(core);

(function(core)
{
  core.Customer = core.Model.extend(
  {
    initialize: function()
    {
      core.Log.debug('Step 4', 'Customer model initialized');
    }
  });
})(core);

(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordType: 'customer',
    recordClass: core.Customer,

    initialize: function()
    {
      core.Log.debug('Step 3', 'Instantiating CustomerRepository');
    }
  });
})(core);

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

try {
  core.Log.debug('Step 1', 'Running main.js');

  // this file is utilized by a customers restlet
  // we are revealing these class methods to the
  // global scope for NetSuite
  controller      = new core.CustomersController();
  customer_get    = controller.show.bind(controller);
  // customer_post   = controller.store.bind(controller);
  // customer_put    = controller.update.bind(controller);
  // customer_delete = controller.destroy.bind(controller);

  if(console) customer_get({id: 1}); // testing only
} catch (e) {
   core.Log.error('Customers RESTlet', e.message);
  //  var response = new core.Controller();
  //  document.write(response.internalServerError(e.message));
}
