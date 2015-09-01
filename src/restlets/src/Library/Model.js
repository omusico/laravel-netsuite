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
            // core.Log.debug('fields', {recordType: object.getRecordType(), fields: object.getAllFields()});
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
        // if (isRecord || isSearch)
        // {
        //   core.Log.debug('fields', {recordType: object.getRecordType(), fields: object.getAllFields()});
        // }
        // else
        // {
          _.each(object, function(value, key)
          {
            if (typeof object[key] !== 'function')
            {
              attrs[key] = core.Util.get(object, key);
            }
          });
        // }
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
                // core.Log.debug('sublist fields', {recordType: sublist, fields: object.getAllLineItemFields(sublist)});

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

      _.each(_.omit(this.fields, 'id'), function(value, key)
      {
        record.setFieldValue(key, this.get(key));
      }, this);

      _.each(this.sublists, function(recordClass, sublist)
      {

        // remove any item in record and not in sent sublist
        _.times(record.getLineItemCount(sublist), function(index)
        {
          index++; // sublists are 1 based

          var id          = parseInt(record.getLineItemValue(sublist, 'id', index), 10),
              foundInList = _.findWhere(core.Util.get(this.attrs, sublist, []), { id: id });

          // remove that one
          if (! _.isUndefined(foundInList)) record.removeLineItem(sublist, index);

        }, this);

        // update/add the rest
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
      return this.toHash();
    },

    toString: function()
    {
      return JSON.stringify(this.toHash());
    }
  });
})(core);
