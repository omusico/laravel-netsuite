(function(core)
{
  core.Router = core.Base.extend(
  {
    constructor: function()
    {
      this.initialize.apply(this, arguments);
      this.map = {};
    },

    initialize: function()
    {

    },

    parseIdentifier: function(identifier)
    {
      var parts = identifier.split('@');
      return {controller_name: parts[0], controller_method: parts[1]};
    },

    buildMethod: function(resource, identifier, http_method)
    {
      var parsed_identifier   = this.parseIdentifier(identifier);
      var controller_method   = parsed_identifier.controller_method;
      var controller_name     = parsed_identifier.controller_name;
      var controller_instance = new core[parsed_identifier.controller_name]();
      this.map[resource]      = this.map[resource] || {};

      // setup the route map
      this.map[resource][controller_method] = controller_instance[controller_method].bind(controller_instance);

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
      for (var method_name in this.map[resource])
      {
        var controller_method = this.map[resource][method_name];
        context[method_name] = controller_method;
      }
    }
  });
})(core);
