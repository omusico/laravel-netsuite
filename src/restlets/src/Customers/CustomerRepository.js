(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordType: 'customer',
    recordClass: core.Customer,

    initialize: function() {}
  });
})(core);
