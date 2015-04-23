(function(core)
{
  core.Customer = core.Model.extend(
  {
    initialize: function()
    {
      core.Log.debug('Step 3', 'Customer model initialized');
    }
  });
})(core);
