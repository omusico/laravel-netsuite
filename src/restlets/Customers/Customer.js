(function(core)
{
  core.Customer = core.Model.extend(
  {
    initialize: function()
    {
      core.Log.debug('Step 6', 'Customer model initialized');
    }
  });
})(core);
