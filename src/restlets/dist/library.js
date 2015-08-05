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

    has: function(key)
    {
      return this.attrs.hasOwnProperty(key);
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
      return this.response(body);
    },

    created: function(body)
    {
      return this.response(body);
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

    find: function(id)
    {
      var record = nlapiLoadRecord(this.recordType, id);
      core.Log.debug('Step 5', 'Found ' + record.getRecordType() + ' record with id ' + record.getId());
      return record ? new this.recordClass(record.getAllFields()) : null;
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

      return new this.recordClass(record.getAllFields());
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

      return new this.recordClass(record.getAllFields());
    },

    destroy: function(id)
    {
      nlapiDeleteRecord(this.recordType, id);
    }
  });
})(core);
