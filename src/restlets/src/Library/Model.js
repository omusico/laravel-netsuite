(function(core)
{
  core.Model = core.Base.extend(
  {
    constructor: function(object)
    {
      this.attrs = object ? this.parse(object) : {};
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    set: function(key, value)
    {
      key = core.Util.camel_case(key);
      key = key.charAt(0).toUpperCase() + (key && key.length ? key.slice(1) : '');
      var mutator = 'set' + key + 'Attribute';
      this.attrs[key] = this[mutator] ? this[mutator](value) : value;
    },

    get: function(key, fallback)
    {
      fallback = fallback || null;
      var new_key = core.Util.camel_case(key);
      new_key = new_key.charAt(0).toUpperCase() + (new_key && new_key.length ? new_key.slice(1) : '');
      var mutator = 'get' + new_key + 'Attribute';
      var value   = typeof this.attrs[key] !== 'undefined' ? this.attrs[key] : fallback;
      return this[mutator] ? this[mutator](value) : value;
    },

    has: function(key)
    {
      return typeof this.attrs[key] !== 'undefined' && typeof this.attrs[key] !== 'function';
    },

    parse: function(object)
    {
      var attrs     = {};
      var is_record = typeof object.getFieldValue === 'function';

      // determine if object is record or plain object
      if (this.fields || this.sublists)
      {
        for (var field in this.fields)
        {
          attrs[field] = is_record ?
                         object.getFieldValue(field) :
                         typeof object[field] !== 'undefined' ?
                           object[field] :
                           null;

          // parse attr into correct type
          switch(this.fields[field])
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
            default: // string
              attrs[field] = attrs[field] ?
                             attrs[field] + '' :
                             null;
          }
        }

        for (var sublist in this.sublists)
        {
          var count = is_record ?
                      object.getLineItemCount(sublist) :
                      typeof object[sublist] !== 'undefined' ?
                        object[sublist].length :
                        0;

          if (count)
          {
            attrs[sublist] = [];

            for (var i = 1; i <= count; i++)
            {
              var item = {};

              if (is_record)
              {
                var fields = object.getAllLineItemFields(sublist);

                for (var index in fields)
                {
                  item[fields[index]] = object.getLineItemValue(sublist, fields[index], i);
                }
              }
              else
              {
                item = object[sublist][i];
              }

              var recordType = this.sublists[sublist];
              attrs[sublist].push(new recordType(item));
            }
          }
        }
      }
      else
      {
        for (var key in object)
        {
          if (typeof object[key] !== 'function')
          {
            attrs[key] = typeof object[key] !== 'undefined' ? object[key] : null;
          }
        }
      }

      return attrs;
    },

    toHash: function(object)
    {
      var attrs  = {};
      object = object || this;

      if (object.visible && object.visible.length)
      {
        object.visible.forEach(function(field)
        {
          attrs[field] = object.get(field);
        });
      }
      else
      {
        for (var attr in object.attrs)
        {
          attrs[attr] = object.get(attr);
        }
      }

      for (var sublist in object.sublists)
      {
        if (typeof object.attrs[sublist] !== 'undefined')
        {
          for (var i = 0; i < object.attrs[sublist].length; i++)
          {
            object.attrs[sublist][i] = object.toHash(object.attrs[sublist][i]);
          }
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
