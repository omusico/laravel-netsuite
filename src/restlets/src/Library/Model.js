(function(core)
{
  core.Model = core.Base.extend(
  {
    visible: [],

    constructor: function(object)
    {
      this.attrs = {};

      if (typeof object.getAllFields === 'function')
      {
        // object.getAllFields().forEach(function(field)
        // {
        //   this.attrs[field] = object.getFieldValue(field);
        // });

        this.attrs = object;
      }
      else
      {
        for (var key in object)
        {
          if (typeof object[key] !== 'function')
          {
            this.attrs[key] = object[key];
          }
        }
      }

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
      return true;
      // return typeof this.attrs[key] !== 'undefined' && typeof this.attrs[key] !== 'function';
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
