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
      return this.response(body || {});
    },

    created: function(body)
    {
      return this.response(body || {});
    },

    notFound: function(message)
    {
      return this.error(404, message || 'Not Found');
    },

    badRequest: function(missing)
    {
      return this.error(400, missing || 'Bad Request');
    },

    internalServerError: function(message)
    {
      return this.error(500, message || 'Internal Server Error');
    },

    error: function(code, message)
    {
      core.Log.error(code, message);

      return {
        'error':
        {
          'code':    code,
          'message': message
        }
      };
    }
  });
})(core);
