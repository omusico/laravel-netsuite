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
