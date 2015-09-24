(function(core)
{
  core.Router = core.Base.extend(
  {
    constructor: function()
    {
      this.initialize.apply(this, arguments);
      this.parser    = new routes.Router();
      this.resources = {};
    },

    initialize: function() {},

    parseAction: function(action)
    {
      var parts = action.split('@');
      return {controller: parts[0], method: parts[1]};
    },

    register: function(httpMethod, url, callable)
    {
      if (_.isFunction(callable))
      {
        var method = function()
        {
          return callable;
        };
      }
      else
      {
        var parsedAction = this.parseAction(callable);

        var method = function()
        {
          var controller = new core[parsedAction.controller];
          return controller[parsedAction.method];
        }
      }

      // setup the route map
      this.parser.addRoute(httpMethod + '_' + url, method);

      return this;
    },

    get:    function(url, callable) { return this.register('get',    url, callable); },
    post:   function(url, callable) { return this.register('post',   url, callable); },
    put:    function(url, callable) { return this.register('put',    url, callable); },
    delete: function(url, callable) { return this.register('delete', url, callable); },

    resource: function(url, controller)
    {
      this.get(   url,          controller + '@index');
      this.get(   url + '/:id', controller + '@show');
      this.post(  url + '/:id', controller + '@store');
      this.put(   url + '/:id', controller + '@update');
      this.delete(url + '/:id', controller + '@destroy');

      this.resources[url] = controller;

      return this;
    },

    match: function(httpMethod, url)
    {
      var match = this.parser.match(httpMethod + '_' + url);
      this.params = match ? match.params : null;

      return match ? match.fn() : null;
    },

    // old router start function
    start: function(url, context)
    {
      var controller = new core[this.resources[url]];

      _.each(['index', 'show', 'store', 'update', 'destroy'], function(name)
      {
        if (typeof controller[name] != 'undefined')
        {
          context[name] = controller[name].bind(controller);
        }
      });
    }
  });
})(core);
