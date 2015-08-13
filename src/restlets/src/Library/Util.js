(function(core)
{
  core.Util = {
    extend: function(target, source)
    {
      target = target || {};

      for (var prop in source)
      {
        if (Object.prototype.toString.call(source[prop]) === '[object Object]')
        {
          target[prop] = core.Util.extend(target[prop], source[prop]);
        }
        else
        {
          target[prop] = source[prop];
        }
      }

      return target;
    },

    has: function(obj, key)
    {
      return obj !== null && hasOwnProperty.call(obj, key);
    },

    get: function(object, key)
    {
      var index     = key.indexOf('.');
      var piece     = index !== -1 ? key.substring(0, index) : key;
      var remainder = index !== -1 ? key.substr(++index) : '';
      if (typeof object[piece] === 'undefined') return null;
      return remainder.length ? this.get(object[piece], remainder) : object[piece];
    },

    set: function(object, key, value, original)
    {
      original = original || object;
      var index     = key.indexOf('.');
      var piece     = index !== -1 ? key.substring(0, index) : key;
      var remainder = index !== -1 ? key.substr(++index) : '';
      if ( ! remainder.length) object[piece] = value;
      if (typeof object[piece] === 'undefined') object[piece] = _.isArray(object) ? [] : {};
      return remainder.length ? this.set(object[piece], remainder, value, original) : original;
    },

    snakeCase: function(string)
    {
      string = string + '';

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
