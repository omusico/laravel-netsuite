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
    if(typeof console !== 'undefined') console.log(type, title, details);
    else nlapiLogExecution(type, title, JSON.stringify(details));
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
    visible: [],

    constructor: function(attrs)
    {
      this.attrs = attrs || {};
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    set: function(key, value)
    {
      var mutator = 'set' + (key.charAt(0).toUpperCase() + key.slice(1)) + 'Attribute';
      this.attrs[key] = this[mutator] ? this[mutator](value) : value;
    },

    get: function(key)
    {
      var mutator = 'get' + (key.charAt(0).toUpperCase() + key.slice(1)) + 'Attribute';
      return this[mutator] ? this[mutator](this.attrs[key]) : this.attrs[key];
    },

    has: function(key)
    {
      return typeof this[key] !== 'function' && typeof this[key] !== 'undefined'
    },

    toHash: function()
    {
      var attrs = {};

      if (this.visible.length)
      {
        this.visible.forEach(function(field)
        {
          if (this.has(field)) attrs[field] = this.get(field);
        });
      }
      else
      {
        for (var field in this.attrs)
        {
          if (this.has(field)) attrs[field] = this.get(field);
        }
      }

      return attrs;
    },

    toJSON: function()
    {
      return JSON.stringify(this.toHash());
    },

    toString: function()
    {
      return this.toJSON();
    }
  });
})(core);

(function(core)
{
  core.Input = core.Model.extend();
})(core);

(function(core)
{
  core.Validator = core.Base.extend(
  {
    constructor: function(input, requiredFields)
    {
      this.input = input || new core.Input();
      this.requiredFields = requiredFields || [];
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    missing: function()
    {
      var missing_fields = [];

      for (var field in this.requiredFields) {
        if ( ! this.input.has(field)) missing_fields.push(field);
      }

      return missing_fields;
    },

    passes: function()
    {
      return this.missing().length > 0;
    },

    fails: function()
    {
      return ! this.passes();
    },

    toHash: function()
    {
      var validation = {};

      for (var field in this.missing()) {
        validation[field] = field + ' is required.';
      }

      return validation;
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
    index:      function() {},
    paginate:   function() {},
    show:       function() {},
    store:      function() {},
    update:     function() {},
    destroy:    function() {},

    // helpers for displaying responses

    okay: function(body)
    {
      return this.response(body || {});
    },

    created: function(body)
    {
      return this.response(body || {});
    },

    notFound: function(message)
    {
      return this.error(404, message || 'Not Found');
    },

    badRequest: function(missing)
    {
      return this.error(400, missing || 'Bad Request');
    },

    internalServerError: function(message)
    {
      return this.error(500, message || 'Internal Server Error');
    },

    error: function(code, message)
    {
      core.Log.error(code, message);

      return this.response({
        'error':
        {
          'code':    code,
          'message': message
        }
      });
    },

    response: function(body)
    {
      return JSON.stringify(body);
    }
  });
})(core);

(function(core)
{
  core.Router = core.Base.extend(
  {
    constructor: function()
    {
      this.initialize.apply(this, arguments);
      this.map = {};
    },

    initialize: function()
    {

    },

    parseIdentifier: function(identifier)
    {
      var parts = identifier.split('@');
      return {controller_name: parts[0], controller_method: parts[1]};
    },

    buildMethod: function(resource, identifier, http_method)
    {
      var parsed_identifier   = this.parseIdentifier(identifier);
      var controller_method   = parsed_identifier.controller_method;
      var controller_name     = parsed_identifier.controller_name;
      var controller_instance = new core[parsed_identifier.controller_name]();
      this.map[resource]      = this.map[resource] || {};

      // setup the route map
      this.map[resource][controller_method] = controller_instance[controller_method].bind(controller_instance);

      return this;
    },

    get:    function(resource, identifier) { return this.buildMethod(resource, identifier, 'get'); },
    post:   function(resource, identifier) { return this.buildMethod(resource, identifier, 'post'); },
    put:    function(resource, identifier) { return this.buildMethod(resource, identifier, 'put'); },
    delete: function(resource, identifier) { return this.buildMethod(resource, identifier, 'delete'); },

    resource: function(resource, controller)
    {
      this.get(resource,    controller + '@index');
      this.get(resource,    controller + '@show');
      this.post(resource,   controller + '@store');
      this.put(resource,    controller + '@update');
      this.delete(resource, controller + '@destroy');

      return this;
    },

    start: function(resource, context)
    {
      for (var method_name in this.map[resource])
      {
        var controller_method = this.map[resource][method_name];
        context[method_name] = controller_method;
      }
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

    initialize: function() {},

    search: function(key, value)
    {
      var filters = [new nlobjSearchFilter(key, null, 'is', value)];
      var results = nlapiSearchRecord(this.recordType, null, filters, []);
      return results;
    },

    find: function(id)
    {
      var record = nlapiLoadRecord(this.recordType, id);
      return record ? new this.recordClass(record) : null;
    },

    findByExternalId: function(id)
    {
      var results = this.search('externalid', id);
      return results.length ? this.find(results[0].id) : null;
    },

    paginate: function(page, per_page)
    {

    },

    create: function(attrs)
    {
      var record = nlapiCreateRecord(this.recordType);

      for(var field in attrs) {
        record.setFieldValue(field, attrs[field]);
      }

      nlapiSubmitRecord(record, true);

      return new this.recordClass(record);
    },

    update: function(id, attrs)
    {
      var diff = {};
      var record = nlapiLoadRecord(this.recordType, id);

      for(var field in attrs) {
        if(record.getFieldValue(field) != attrs[field]) {
          diff[field] = attrs[field];
        }
      }

      for(var field in diff) {
        record.setFieldValue(field, diff[field]);
      }

      nlapiSubmitRecord(record, true);

      return new this.recordClass(record);
    },

    destroy: function(id)
    {
      nlapiDeleteRecord(this.recordType, id);
    }
  });
})(core);
