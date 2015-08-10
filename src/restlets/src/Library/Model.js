(function(core)
{
  core.Model = core.Base.extend(
  {
    constructor: function(object)
    {
      this.attrs = this.parse(object);
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    set: function(key, value)
    {
      var mutator = 'set' + (key.charAt(0).toUpperCase() + (key && key.length ? key.slice(1) : '')) + 'Attribute';
      this.attrs[key] = this[mutator] ? this[mutator](value) : value;
    },

    get: function(key)
    {
      var mutator = 'get' + (key.charAt(0).toUpperCase() + (key && key.length ? key.slice(1) : '')) + 'Attribute';
      return this[mutator] ? this[mutator](this.attrs[key]) : this.attrs[key];
    },

    has: function(key)
    {
      return typeof this.attrs[key] !== 'undefined' && typeof this.attrs[key] !== 'function';
    },

    toHash: function()
    {
      var attrs = {};

      if (this.visible.length)
      {
        var that = this;

        this.visible.forEach(function(field)
        {
          if (that.has(field)) attrs[field] = that.get(field);
        });
      }
      else
      {
        for (var attr in this.attrs)
        {
          if (this.has(attr)) attrs[attr] = this.get(attr);
        }
      }

      for (var sublist in this.sublists)
      {
        this.attrs[sublist] = this.attrs.sublist.toHash();
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
    },

    parse: function(object)
    {
      var attrs = {};

      if (this.fields || this.sublists)
      {
        for (var field in this.fields)
        {
          attrs[field] = object.getFieldText(field) !== null ? object.getFieldText(field) : object.getFieldValue(field);
          var type = this.fields[field];

          switch(type)
          {
            case 'int':
              attrs[field] = parseInt(attrs[field]);
              break;
            case 'float':
              attrs[field] = parseFloat(attrs[field]);
              break;
            default: // string
              attrs[field] = attrs[field] + '';
          }
        }

        for (var sublist in this.sublists)
        {
          var fields     = object.getAllLineItemFields(sublist);
          var count      = object.getLineItemCount(sublist);
          attrs[sublist] = [];

          for (var i = 1; i <= count; i++)
          {
            var item = {};

            for (var index in fields)
            {
              item[fields[index]] = object.getLineItemValue(sublist, fields[index], i);
            }

            var recordType = this.sublists[sublist];
            attrs[sublist].push(new recordType(item));
          }
        }
      }
      else
      {
        for (var key in object)
        {
          if (typeof object[key] !== 'function')
          {
            attrs[key] = object[key];
          }
        }
      }

      return attrs;
    }
  });
})(core);
