(function (core)
{
  core.Base = function(attrs) {};

  core.Base.extend = function(protoProps, staticProps)
  {
    var parent = this;
    var child;

    if (protoProps && core.Util.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function() { return parent.apply(this, arguments); };
    }

    core.Util.extend(child, parent);
    if(staticProps) core.Util.extend(child, staticProps);
    var Surrogate = function() { this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    if (protoProps) core.Util.extend(child.prototype, protoProps);
    child.__super__ = parent.prototype;

    return child;
  };
})(core);