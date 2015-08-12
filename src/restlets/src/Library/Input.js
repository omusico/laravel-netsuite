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
      _.each(this.attrs, function(attr, key)
      {
        var date = moment(attr, "YYYY-MM-DD HH:mm:ss", true);

        // if attr is a valid date in the above format,
        // then parse it into the netsuite format
        if (date.isValid())
        {
          this.attrs[key] = date.format('MM/DD/YYYY hh:mm A');
        }
      }, this);

      return this;
    }
  });
})(core);
