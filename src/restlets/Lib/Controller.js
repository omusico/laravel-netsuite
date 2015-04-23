(function(core)
{
  core.Controller = core.Base.extend(
  {
    constructor: function(attrs)
    {
      this.initialize.apply(this, arguments);
    },

    notFound: function(message)
    {
      return this.error(404, message || 'Not Found');
    },

    error: function(code, message)
    {
      return JSON.stringify(
      {
        'error':
        {
          'code':    code,
          'message': message
        }
      });
    }
  });
})(global || window);
