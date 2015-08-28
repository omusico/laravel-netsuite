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
        var date = moment(value, 'YYYY-MM-DD HH:mm:ss', true);

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
