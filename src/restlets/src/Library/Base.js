(function (core)
{
  core.Base = function() {};

  core.Base.extend = function(protoProps, staticProps)
  {
    var parent = this;
    var child;

    child = (protoProps && _.has(protoProps, 'constructor')) ?
            protoProps.constructor :
            function() { return parent.apply(this, arguments); };

    _.extend(child, parent, staticProps);
    var Surrogate = function() { this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    if (protoProps) _.extend(child.prototype, protoProps);
    child.__super__ = parent.prototype;

    return child;
  };
})(core);
