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
