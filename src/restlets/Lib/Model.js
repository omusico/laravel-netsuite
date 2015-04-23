(function(core)
{
  core.Model = function(attrs) {
    this.attrs = {};
    this.set(attrs || {});
    this.initialize.apply(this, arguments);
  };

  core.Model.prototype.initialize = function() {};

  core.Model.prototype.set = function(key, value)
  {
    if (arguments.length > 1) {
      this.attrs[key] = value;
    } else {
      this.attrs = key;
    }
  };

  core.Model.prototype.get = function(key)
  {
    return this.attrs[key];
  };

  core.Model.prototype.toHash = function()
  {
    return this.attrs;
  };

  core.Model.prototype.toJSON = function()
  {
    return JSON.stringify(this.toHash());
  };

  core.Model.extend = function(protoProps, staticProps)
  {
    var parent = this;
    var child;

    if (protoProps && protoProps.constructor) {
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
})(global || window);
