
var core = function() {};

core.debug = true;

_.mixin({
  decorate: function(items, func)
  {
    return _.map(items, function(item)
    {
      return new func(item);
    });
  },

  toHash: function(items)
  {
    return _.map(items, function(item)
    {
      return item.toHash();
    });
  }
});
