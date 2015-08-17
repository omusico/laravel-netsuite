(function(core)
{
  core.Model = core.Base.extend(
  {
    recordType : '',

    constructor: function(object)
    {
      this.attrs = object ? this.parse(object) : {};
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    set: function(key, value)
    {
      if (arguments.length === 1)
      {
        _.each(key, function(value, key) { this.set(key, value); }, this);
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
        return this[mutator] ? this[mutator](key) : (typeof this.attrs[key] !== 'undefined' && typeof this.attrs[key] !== 'function');
      }
      else
      {
        return this[mutator] ? this[mutator](value) : value;
      }
    },

    parse: function(object)
    {
      var attrs     = {};
      var isRecord = typeof object.getFieldValue === 'function';

      // determine if object is record or plain object
      if (this.fields || this.sublists)
      {
        _.each(this.fields, function(type, field)
        {
          attrs[field] = isRecord ? object.getFieldValue(field) : core.Util.get(object, field);

          // parse attr into correct type
          switch(type)
          {
            case 'int':
              attrs[field] = parseInt(attrs[field]);
              break;
            case 'float':
              attrs[field] = parseFloat(attrs[field]);
              break;
            case 'timestamp':
              attrs[field] = moment(attrs[field]).format('YYYY-MM-DD HH:mm:ss') != 'Invalid date' ?
                             moment(attrs[field]).format('YYYY-MM-DD HH:mm:ss') :
                             null;
              break;
            case 'string':
              attrs[field] = attrs[field] ? attrs[field] + '' : null;
              break;
            default:
              // do nothing to the field
          }
        });

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

      return attrs;
    },

    toRecord: function(object)
    {
      object = object || this;

      var record = nlapiCreateRecord(this.recordType);

      _.each(this.fields, function(field)
      {
        if (this.has(field))
        {
          record.setFieldValue(field, core.Util.get(this.attrs, field));
        }
      }, this);

      _.each(this.sublists, function(className, sublist)
      {
        _.each(core.Util.get(this.attrs, sublist, []), function(item, index)
        {
          index++;
          var model = new className();
          model.set(item);

          _.each(model.fields, function(value, key)
          {
            record.setLineItemValue(sublist, key, index, value);
          });
        });
      });

      return record;
    },

    toHash: function(object)
    {
      var attrs  = {};
      object = object || this;

      // for (var sublist in object.sublists)
      // {
      //   if (typeof object.attrs[sublist] !== 'undefined')
      //   {
      //     for (var i = 0; i < object.attrs[sublist].length; i++)
      //     {
      //       object.attrs[sublist][i] = object.toHash(object.attrs[sublist][i]);
      //     }
      //   }
      // }

      if (object.visible && object.visible.length)
      {
        // var sublists = _.keys(object.sublists || {});

        _.each(object.visible, function(field)
        {
          attrs[field] = object.get(field);
        });
      }
      else
      {
        // _.each(core.Util.get(object, 'fields', {}), function(type, field)
        // {
        //   attrs[field] = object.get(field);
        // });

        // _.each(core.Util.get(object, 'sublists' {}), function(recordType, field)
        // {
        //   attrs[field] = object.toHash(object.get(field));
        // });
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
