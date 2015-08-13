(function(core)
{
  core.Input = core.Model.extend(
  {
    all: function()
    {
      return this.toHash();
    },

    only: function()
    {
      var only = arguments;

      return _.chain(this.attrs).keys().filter(function(key)
      {
        return _.contains(only, key);
      }).map(function(key)
      {
        var object = {};
        object[key] = this.get(key);
        return object;
      }, this)
      .value();
    },

    except: function()
    {
      var except = arguments;

      return _.chain(this.attrs).keys().filter(function(key)
      {
        return ! _.contains(except, key);
      }).map(function(key)
      {
        var object = {};
        object[key] = this.get(key);
        return object;
      }, this)
      .value();
    },

    parseDates: function()
    {
      _.each(this.attrs, function(value, key)
      {
        var date = moment(value, "YYYY-MM-DD HH:mm:ss", true);

        // if attr is a valid date in the above format,
        // then parse it into the netsuite format
        if (date.isValid())
        {
          this.attrs[key] = date.format('MM/DD/YYYY hh:mm A');
        }
      }, this);

      return this;
    },

    parseArrays: function()
    {
      _.each(this.attrs, function(value, key)
      {
        var newKey = key.replace('][', '.').replace('[', '.').replace(']', '');

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
