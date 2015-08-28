(function(core)
{
  core.Util = {

    timeFormat: 'YYYY-MM-DD HH:mm:ss',

    has: function(obj, key)
    {
      return obj !== null && hasOwnProperty.call(obj, key);
    },

    get: function(object, key, fallback)
    {
      // if object is null, return it
      if (_.isNull(object)) return object;

      // if we are already working with a flattened
      // array with dot notation, return the key
      if (typeof object[key] !== 'undefined') return object[key] || (_.isUndefined(fallback) ? null : fallback);

      // proceed with trying to find value
      var index     = key.indexOf('.');
      var piece     = index !== -1 ? key.substring(0, index) : key;
      var remainder = index !== -1 ? key.substr(++index) : '';
      if (typeof object[piece] === 'undefined') return _.isUndefined(fallback) ? null : fallback;

      return remainder.length ? this.get(object[piece], remainder, fallback) : object[piece];
    },

    set: function(object, key, value, original)
    {
      original = original || object;
      var index     = key.indexOf('.');
      var piece     = index !== -1 ? key.substring(0, index) : key;
      var remainder = index !== -1 ? key.substr(++index) : '';

      // if there is an incorrect pairing, ignore the request
      if ( ! _.isArray(object) || (_.isArray(object) && ! _.isNaN(parseInt(piece))))
      {
        // if the attr is unprepared, prepare it
        // prepare an object for a key, and an array for an integer
        if (typeof object[piece] === 'undefined')
        {
          object[piece] = (_.isArray(object) && !_.isString(piece)) || ! _.isNaN(parseInt(remainder)) ? [] : {};
        }

        // if there is no other remainder, we've
        // made it to the end, set the value
        if ( ! remainder.length)
        {
          object[piece] = value;
        }
      }

      return remainder.length ? this.set(object[piece], remainder, value, original) : original;
    },

    snakeCase: function(string)
    {
      string = string + '';

      // ignore snake_case input
      if (string.indexOf('_') !== -1) return string;

      return string.replace(/([A-Z])/g, function(match, match2, index, string)
      {
        return (index === 0 ? '' : '_') + match.toLowerCase();
      });
    },

    camelCase: function(string)
    {
      string = string + '';

      return string.replace(/(_\w)/g, function(match, match2, index, string)
      {
        return match[1].toUpperCase();
      });
    }
  };
})(core);
