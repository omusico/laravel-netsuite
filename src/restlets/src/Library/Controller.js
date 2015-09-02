(function(core)
{
  core.Controller = core.Base.extend(
  {
    constructor: function()
    {
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},
    index:      function() {},
    paginate:   function() {},
    show:       function() {},
    store:      function() {},
    update:     function() {},
    destroy:    function() {},

    // helpers for displaying responses

    okay: function(body)
    {
      return body || {};
    },

    created: function(body)
    {
      return body || {};
    },

    notFound: function(message)
    {
      return this.error(404, message || 'Not Found');
    },

    badRequest: function(message)
    {
      return this.error(400, message || 'Bad Request');
    },

    internalServerError: function(exception)
    {
      var message = _.isString(exception) ? exception : _.isUndefined(exception) ? false : exception.message;

      return this.error(500, message || 'Internal Server Error');
    },

    error: function(code, message)
    {
      core.Log.error(code, message);
      return {'error': {'code': code, 'message': message}};
    }
  });
})(core);
