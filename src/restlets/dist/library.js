
var core = function() {};

core.debug = true;

_.mixin({
  decorate: function(items, func)
  {
    return _.map(items, function(item)
    {
      return new func(item);
    });
  },

  toHash: function(items)
  {
    return _.map(items, function(item)
    {
      return item.toHash();
    });
  }
});

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
      if (core.debug) log('DEBUG', title, details);
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

    timeFormat: 'YYYY-MM-DD HH:mm:ss',

    has: function(obj, key)
    {
      return obj !== null && hasOwnProperty.call(obj, key);
    },

    get: function(object, key, fallback)
    {
      // if object is null, return it
      if (_.isNull(object)) return object;

      // if we are already working with a flattened
      // array with dot notation, return the key
      if (typeof object[key] !== 'undefined') return object[key] || (_.isUndefined(fallback) ? null : fallback);

      // proceed with trying to find value
      var index     = key.indexOf('.');
      var piece     = index !== -1 ? key.substring(0, index) : key;
      var remainder = index !== -1 ? key.substr(++index) : '';
      if (typeof object[piece] === 'undefined') return _.isUndefined(fallback) ? null : fallback;

      return remainder.length ? this.get(object[piece], remainder, fallback) : object[piece];
    },

    set: function(object, key, value, original)
    {
      original = original || object;
      var index     = key.indexOf('.');
      var piece     = index !== -1 ? key.substring(0, index) : key;
      var remainder = index !== -1 ? key.substr(++index) : '';

      // if there is an incorrect pairing, ignore the request
      if ( ! _.isArray(object) || (_.isArray(object) && ! _.isNaN(parseInt(piece))))
      {
        // if the attr is unprepared, prepare it
        // prepare an object for a key, and an array for an integer
        if (typeof object[piece] === 'undefined')
        {
          object[piece] = (_.isArray(object) && !_.isString(piece)) || ! _.isNaN(parseInt(remainder)) ? [] : {};
        }

        // if there is no other remainder, we've
        // made it to the end, set the value
        if ( ! remainder.length)
        {
          object[piece] = value;
        }
      }

      return remainder.length ? this.set(object[piece], remainder, value, original) : original;
    },

    snakeCase: function(string)
    {
      string = string + '';

      // ignore snake_case input
      if (string.indexOf('_') !== -1) return string;

      return string.replace(/([A-Z])/g, function(match, match2, index, string)
      {
        return (index === 0 ? '' : '_') + match.toLowerCase();
      });
    },

    camelCase: function(string)
    {
      string = string + '';

      return string.replace(/(_\w)/g, function(match, match2, index, string)
      {
        return match[1].toUpperCase();
      });
    }
  };
})(core);

(function (core)
{
  core.Base = function() {};

  core.Base.extend = function(protoProps, staticProps)
  {
    var parent = this;
    var child;

    child = (protoProps && _.has(protoProps, 'constructor')) ?
            protoProps.constructor :
            function() { return parent.apply(this, arguments); };

    _.extend(child, parent, staticProps);
    var Surrogate = function() { this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    if (protoProps) _.extend(child.prototype, protoProps);
    child.__super__ = parent.prototype;

    return child;
  };
})(core);

(function(core)
{
  core.Model = core.Base.extend(
  {
    recordType: '',
    timeFormat: 'M/DD/YYYY h:mm a',

    attrs   : {},
    fields  : {},
    sublists: {},
    visible : [],

    constructor: function(attrs, options)
    {
      options = _.defaults(options || {}, {
        parse : true,
        mutate: false
      });

      if (attrs && options.mutate) this.set(attrs); else this.attrs = attrs;
      if (attrs && options.parse) this.attrs = this.parse(this.attrs);
      this.initialize.apply(this, [attrs, options]);
    },

    initialize: function() {},

    set: function(key, value)
    {
      if (arguments.length === 1)
      {
        _.each(key, function(value, key)
        {
          this.set(key, value);
        }, this);
      }
      else
      {
        this.attrs[key] = this.mutate('set', key, value);
      }

      return this;
    },

    get: function(key, fallback)
    {
      fallback = fallback || null;
      var value = this.has(key) ? this.attrs[key] : fallback;
      return this.mutate('get', key, value);
    },

    has: function(key)
    {
      return this.mutate('has', key);
    },

    unset: function(key)
    {
      if (this.has(key)) delete this.attrs[key];
      return this;
    },

    mutate: function(prefix, key, value)
    {
      var newKey = core.Util.camelCase(key);
      newKey = newKey.charAt(0).toUpperCase() + (newKey.length > 1 ? newKey.slice(1) : '');
      var mutator = prefix + newKey + 'Attribute';

      if (prefix === 'has')
      {
        return this[mutator] ? this[mutator](key) : _.has(this.attrs, key);
      }
      else
      {
        return this[mutator] ? this[mutator](value) : value;
      }
    },

    parse: function(object)
    {
      var attrs     = {};

      // determine if object is record or plain object
      var isRecord = typeof object.getFieldValue === 'function';
      var isSearch = typeof object.getValue === 'function';

      if ( ! _.isEmpty(this.fields))
      {
        _.each(this.fields, function(type, field)
        {
          if (field == 'id' && (isRecord || isSearch))
          {
            attrs[field] = object.getId();
          }
          else
          {
            attrs[field] = isRecord ?
              object.getFieldValue(field) :
              isSearch ?
                object.getValue(field) :
                core.Util.get(object, field);
          }

          // parse attr into correct type
          switch(type)
          {
            case 'int':
              attrs[field] = (_.isNull(attrs[field]) || _.isUndefined(attrs[field])) ? null : parseInt(attrs[field]);
              break;
            case 'float':
              attrs[field] = (_.isNull(attrs[field]) || _.isUndefined(attrs[field])) ? null : parseFloat(attrs[field]);
              break;
            case 'timestamp':
              var date = moment(attrs[field], this.timeFormat, true);
              attrs[field] = date.isValid() ? attrs[field] : null;
              break;
            case 'string':
              attrs[field] = (_.isNull(attrs[field]) || _.isUndefined(attrs[field])) ? null : attrs[field] + '';
              break;
            default:
              // do nothing to the field
          }
        });
      }
      else
      {
        _.each(object, function(value, key)
        {
          if (typeof object[key] !== 'function')
          {
            attrs[key] = core.Util.get(object, key);
          }
        });
      }

      if ( ! _.isEmpty(this.sublists))
      {
        _.each(this.sublists, function(recordType, sublist)
        {
          var count = isRecord ? object.getLineItemCount(sublist) : core.Util.get(object, sublist, []).length;

          if (count)
          {
            attrs[sublist] = [];

            _.each(_.range(1, count + 1), function(i)
            {
              var item = {};

              if (isRecord)
              {
                _.each(new recordType().fields, function(value, key)
                {
                  item[key] = object.getLineItemValue(sublist, key, i);
                });
              }
              else
              {
                item = object[sublist][i];
              }

              attrs[sublist].push(new recordType(item));
            });
          }
        });
      }

      return attrs;
    },

    toCreateRecord: function(object)
    {
      object = object || this;

      var record = nlapiCreateRecord(this.recordType);

      _.each(this.fields, function(type, field)
      {
        if (this.has(field))
        {
          var value = core.Util.get(this.attrs, field);
          record.setFieldValue(field, core.Util.get(this.attrs, field));
        }
      }, this);

      _.each(this.sublists, function(recordClass, sublist)
      {
        _.each(core.Util.get(this.attrs, sublist, []), function(item, index)
        {
          index++; // sublists are 1 based

          _.each(item.fields, function(type, field)
          {
            if (item.has(field))
            {
              record.setLineItemValue(sublist, field, index, item.get(field));
            }
          });
        }, this);
      }, this);

      return record;
    },

    toUpdateRecord: function()
    {
      var record = nlapiLoadRecord(this.recordType, this.attrs.id);

      _.each(this.getChanged(), function(value, key)
      {
        record.setFieldValue(key, value);
      });

      _.each(this.sublists, function(sublist)
      {
        // search record sublist for one with id that matches and update
        // or if doesn't match create a new sublist item
      });
    },

    toHash: function(object)
    {
      var attrs  = {};
      object = object || this;

      if (object.visible.length)
      {
        var sublists = _.keys(object.sublists || {});

        _.each(object.visible, function(field)
        {
          attrs[field] = object.get(field);

          if (_.contains(sublists, field))
          {
            _.each(attrs[field], function(item, index)
            {
              attrs[field][index] = object.toHash(item);
            });
          }
        });
      }
      else
      {
        if (object.fields.length)
        {
          _.each(object.fields, function(type, field)
          {
            attrs[field] = object.get(field);
          });
        }
        else
        {
          _.each(object.attrs, function(value, key)
          {
            attrs[key] = object.get(key);
          });
        }

        _.each(object.sublists, function(recordType, field)
        {
          _.each(attrs[field], function(item, index)
          {
            attrs[field][index] = object.toHash(item);
          });
        });
      }

      return attrs;
    },

    toJSON: function()
    {
      return JSON.stringify(this.toHash());
    },

    toString: function()
    {
      return this.toHash();
    }
  });
})(core);

(function(core)
{
  core.Input = core.Model.extend(
  {
    only: function()
    {
      return _.pick(this.attrs, arguments);
    },

    except: function()
    {
      return _.omit(this.attrs, arguments);
    },

    all: function()
    {
      return this.toHash();
    },

    parseDates: function()
    {
      _.each(this.attrs, function(value, key)
      {
        var date = moment(value, core.Util.timeFormat, true);

        // if attr is a valid date in the above format,
        // then parse it into the netsuite format
        if (date.isValid())
        {
          this.attrs[key] = date.format(this.timeFormat);
        }
      }, this);

      return this;
    },

    parseArrays: function()
    {
      _.each(this.attrs, function(value, key)
      {
        var newKey = key.replace('[', '.', 'g').replace(']', '', 'g');

        if (newKey.indexOf('.') !== -1)
        {
          this.attrs = core.Util.set(this.attrs, newKey, value);
          this.unset(key);
        }
      }, this);

      return this;
    }
  });
})(core);

(function(core)
{
  core.Validator = core.Base.extend(
  {
    constructor: function(input)
    {
      this.input     = input;
      this.passed    = false;
      this.validated = false;
      this.requiredFieldGroups = _.rest(arguments);
      this.missingFieldGroups = [];
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    validate: function()
    {
      // check each test suite
      var tests = _.map(this.requiredFieldGroups, function(fieldGroup, index)
      {
        // check each field in each test suite
        return _.every(fieldGroup, function(value, field)
        {
          var passed = this.input.has(field);

          if ( ! passed)
          {
            if (typeof this.missingFieldGroups[index] === 'undefined')
            {
              this.missingFieldGroups[index] = [];
            }

            // add field to the missing fields hash
            this.missingFieldGroups[index].push(field);
          }

          return passed;
        }, this);
      }, this);

      this.passed = _.some(tests);

      return this;
    },

    passes: function()
    {
      if ( ! this.validated) this.validate();
      return this.passed === true;
    },

    fails: function()
    {
      return ! this.passes();
    },

    toHash: function()
    {
      var validation = [];

      _.each(this.missingFieldGroups, function(fieldGroup, index)
      {
        if (typeof validation[index] === 'undefined')
        {
          validation[index] = {};
        }

        _.each(fieldGroup, function(field)
        {
          validation[index][field] = field + ' is required.';
        });
      }, this);

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
      return body || {};
    },

    created: function(body)
    {
      return body || {};
    },

    notFound: function(message)
    {
      return this.error(404, message || 'Not Found');
    },

    badRequest: function(message)
    {
      return this.error(400, message || 'Bad Request');
    },

    internalServerError: function(exception)
    {
      var message = _.isString(exception) ? exception : exception.message;

      return this.error(500, message || 'Internal Server Error');
    },

    error: function(code, message)
    {
      core.Log.error(code, message);
      return {'error': {'code': code, 'message': message}};
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

    initialize: function() {},

    parseIdentifier: function(identifier)
    {
      var parts = identifier.split('@');
      return {controllerName: parts[0], controllerMethod: parts[1]};
    },

    buildMethod: function(resource, identifier, httpMethod)
    {
      var parsedIdentifier   = this.parseIdentifier(identifier);
      var controllerMethod   = parsedIdentifier.controllerMethod;
      var controllerName     = parsedIdentifier.controllerName;
      var controllerInstance = new core[controllerName]();
      this.map[resource]     = this.map[resource] || {};

      // setup the route map
      this.map[resource][controllerMethod] = controllerInstance[controllerMethod].bind(controllerInstance);

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
      for (var methodName in this.map[resource])
      {
        context[methodName] = this.map[resource][methodName];
      }
    }
  });
})(core);

(function(core)
{
  core.Repository = core.Base.extend(
  {
    recordClass   : '',
    searchFilters : [],
    searchColumns : [],
    searchPerPage : 1000,
    searchPage    : 1,

    constructor: function()
    {
      if ( ! this.recordClass) throw 'Repository missing recordClass';
      this.recordType = new this.recordClass().recordType; // set recordType from recordClass
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    // add an and condition
    where: function(key, operator, value)
    {
      if (this.searchFilters.length) this.searchFilters.push('and');
      this.searchFilters.push([key, operator, value]);
      return this;
    },

    // add an or condition
    orWhere: function(key, operator, value)
    {
      if (this.searchFilters.length) this.searchFilters.push('or');
      this.searchFilters.push([key, operator, value]);
      return this;
    },

    // apply an array of filters
    filter: function(filters)
    {
      _.each(filters, function(filter) { this.where(filter.key, filter.operator, filter.value); }, this);
      return this;
    },

    // left join a column to filter on
    join: function(recordType, column)
    {
      this.searchColumns = this.searchColumns || [];
      this.searchColumns.push(new nlobjSearchColumn(column, recordType));
      return this;
    },

    // execute the search
    search: function(columns)
    {
      var searchResults;
      var end   = this.searchPage * this.searchPerPage;
      var start = end - this.searchPerPage;
      var hasColumns = columns && columns.length;

      var searchColumns = _.chain(hasColumns ? this.searchColumns.concat(columns) : this.searchColumns)
                           .filter(function(column) { return column != 'id'; })
                           .map(function(column) { return new nlobjSearchColumn(column); })
                           .value();

      if (hasColumns)
      {
        var results = nlapiCreateSearch(this.recordType, this.searchFilters, searchColumns)
                      .runSearch()
                      .getResults(start, end);

        searchResults = _.map(results, function(result)
        {
          var attrs = {id: result.id};

          _.each(this.searchColumns, function(column)
          {
            if(column != 'id')
            {
              attrs[column.getName()] = result.getValue(column.getName());
            }
          });

          return attrs;
        }, this);
      }
      else
      {
        searchResults = nlapiCreateSearch(this.recordType, this.searchFilters, searchColumns)
                        .runSearch()
                        .getResults(start, end);
      }

      // reset filters after search
      this.searchFilters = [];

      // returned as an underscore collection
      return _(searchResults);
    },

    // execute search and convert to models
    get: function()
    {
      return this.search().map(function(result)
      {
        return result;
        // return this.find(result.id);
      }, this);
    },

    // paginate the get method
    paginate: function(page, perPage)
    {
      this.searchPage    = page;
      this.searchPerPage = perPage;
      return this.get();
    },

    // find a single record by internal id
    find: function(id)
    {
      var record = id ? nlapiLoadRecord(this.recordType, id) : null;
      return record ? new this.recordClass(record) : null;
    },

    // find a single record by external id
    findByExternalId: function(externalid)
    {
      return this.where('externalid', 'is', externalid).first();
    },

    // get the first record from a search
    first: function()
    {
      var first = this.search().first();
      return first ? this.find(first.id) : null;
    },

    create: function(model)
    {
      var record = model.toCreateRecord();
      var id = nlapiSubmitRecord(record, true);
      model.set('id', parseInt(id));
      return model;
    },

    update: function(model)
    {

      var record = model.toUpdateRecord();
      var id = nlapiSubmitRecord(record, true);
      return model;
    },

    destroy: function(model)
    {
      var id = nlapiDeleteRecord(this.recordType, model.get('id'));
      return model.get('id') === parseInt(id);
    }
  });
})(core);
