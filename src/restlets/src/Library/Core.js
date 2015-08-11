var Core = function() {};

var core = new Core();

_.mixin({decorate: function(items, func)
{
  return _.map(items, function(item)
  {
    return new func(item);
  });
}});
