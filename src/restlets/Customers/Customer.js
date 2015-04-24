(function(core)
{
  core.Customer = core.Model.extend(
  {
    initialize: function()
    {
      core.Log.debug('Step 4', 'Customer model initialized');
    }
  });
})(core);
