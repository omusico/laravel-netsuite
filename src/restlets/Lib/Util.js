(function(core)
{
  core.Util = {
    extend: function(target, source)
    {
      Object.getOwnPropertyNames(source).forEach(function(propKey)
      {
        var desc = Object.getOwnPropertyDescriptor(source, propKey);
        Object.defineProperty(target, propKey, desc);
      });

      return target;
    }
  };
})(global || window);
