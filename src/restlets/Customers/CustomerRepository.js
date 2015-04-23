(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordType: 'customer',
    recordClass: Customer,
    // paginate: function(page, per_page)
    // {
    //
    // },

    find: function(id)
    {
      var record = nlapiLoadRecord(this.recordType, id);
      core.Log.debug('Step 5', 'Found record with id ' + record.getId());
      return data.internalId ? new this.recordClass(record.getAllFields()) : null;
    },

    // create: function(data)
    // {
    //   return new Customer(data).save();
    // },
    //
    // update: function(id, data)
    // {
    //
    // },
    //
    // destroy: function(id)
    // {
    //   var customer = CustomerRepository.find(id);
    //   customer.delete();
    // }
  });
})(global || window);
