(function(core)
{
  core.Router = core.Base.extend(
  {
    constructor: function()
    {
      this.initialize.apply(this, arguments);
      this.map = {};
    },

    initialize: function() {},

    parseIdentifier: function(identifier)
    {
      var parts = identifier.split('@');
      return {controllerName: parts[0], controllerMethod: parts[1]};
    },

    buildMethod: function(resource, identifier, httpMethod)
    {
      var parsedIdentifier   = this.parseIdentifier(identifier);
      var controllerMethod   = parsedIdentifier.controllerMethod;
      var controllerName     = parsedIdentifier.controllerName;
      var controllerInstance = new core[controllerName]();
      this.map[resource]     = this.map[resource] || {};

      // setup the route map
      this.map[resource][controllerMethod] = controllerInstance[controllerMethod].bind(controllerInstance);

      return this;
    },

    get:    function(resource, identifier) { return this.buildMethod(resource, identifier, 'get'); },
    post:   function(resource, identifier) { return this.buildMethod(resource, identifier, 'post'); },
    put:    function(resource, identifier) { return this.buildMethod(resource, identifier, 'put'); },
    delete: function(resource, identifier) { return this.buildMethod(resource, identifier, 'delete'); },

    resource: function(resource, controller)
    {
      this.get(resource,    controller + '@index');
      this.get(resource,    controller + '@show');
      this.post(resource,   controller + '@store');
      this.put(resource,    controller + '@update');
      this.delete(resource, controller + '@destroy');

      return this;
    },

    start: function(resource, context)
    {
      for (var methodName in this.map[resource])
      {
        context[methodName] = this.map[resource][methodName];
      }
    }
  });
})(core);
