(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordType: 'customer',
    recordClass: core.Customer,

    initialize: function()
    {
      core.Log.debug('Step 3', 'Instantiating CustomerRepository');
    }
  });
})(core);
