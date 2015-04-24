(function(core)
{
  core.Util = {
    extend: function(target, source)
    {
      target = target || {};

      for (var prop in source) {
        if (typeof source[prop] === 'object') {
          target[prop] = core.Util.extend(target[prop], source[prop]);
        } else {
          target[prop] = source[prop];
        }
      }

      return target;
    },

    has: function(obj, key)
    {
      return obj !== null && hasOwnProperty.call(obj, key);
    }
  };
})(core);
