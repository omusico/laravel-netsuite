(function(core)
{
  core.Model = core.Base.extend(
  {
    visible: [],

    constructor: function(attrs)
    {
      this.attrs = {};
      this.set(attrs || {});
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    set: function(key, value)
    {
      if (arguments.length > 1)
      {
        var mutator = 'set' + (key.charAt(0).toUpperCase() + key.slice(1)) + 'Attribute';
        this.attrs[key] = this[mutator] ? this[mutator](value) : value;
      }
      else
      {
        var object = key;

        for (var key in object)
        {
          var value = object[key];
          var mutator = 'set' + (key.charAt(0).toUpperCase() + key.slice(1)) + 'Attribute';
          this.attrs[key] = this[mutator] ? this[mutator](value) : value;
        }
      }
    },

    get: function(key)
    {
      var mutator = 'get' + (key.charAt(0).toUpperCase() + key.slice(1)) + 'Attribute';
      return this[mutator] ? this[mutator](this.attrs[key]) : this.attrs[key];
    },

    has: function(key)
    {
      return this.attrs.hasOwnProperty(key);
    },

    toHash: function()
    {
      var attrs = {};

      if (this.visible.length)
      {
        this.visible.forEach(function(field)
        {
          attrs[field] = this.get(field);
        });
      }
      else
      {
        for (var field in this.attrs)
        {
          attrs[field] = this.get(field);
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
