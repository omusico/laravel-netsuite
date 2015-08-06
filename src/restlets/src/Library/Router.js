(function(core)
{
  core.Router = core.Base.extend(
  {
    constructor: function()
    {
      this.initialize.apply(this, arguments);
      this.map = {};
    },

    parse: function(identifier)
    {
      var parts = identifier.split('@');
      return {controller_name: parts[0], controller_method: parts[1]};
    },

    method: function(resource, identifier, http_method)
    {
      var parsed                      = this.parse(indentifier);
      var controller_instance         = new core[parsed.controller_name]();
      this.map[resource][http_method] = controller_instance[parsed.controller_method].bind(instance);
      return this;
    },

    get:    function(resource, identifier) { return this.method(resource, idnetifier, 'get'); },
    post:   function(resource, identifier) { return this.method(resource, idnetifier, 'post'); },
    put:    function(resource, identifier) { return this.method(resource, idnetifier, 'put'); },
    delete: function(resource, identifier) { return this.method(resource, idnetifier, 'delete'); },

    resource: function(resource, controller)
    {
      this.get(resource,    controller + '@index');
      this.get(resource,    controller + '@show');
      this.post(resource,   controller + '@store');
      this.put(resource,    controller + '@update');
      this.delete(resource, controller + '@destroy');

      return this;
    },

    start: function(datain)
    {
      var response = {};

      this.map[datain].forEach(function(controller_method, http_method)
      {
        response[http_method] = controller_method;
      });
    }
  });
})(core);
