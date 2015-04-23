(function(core)
{
  core.Repository = core.Base.extend(
  {
    recordType: '',
    recordClass: '',

    constructor: function()
    {
      if ( ! this.recordType)  throw 'Repository missing recordType';
      if ( ! this.recordClass) throw 'Repository missing recordClass';
    },

    find: function(id)
    {
      var record = nlapiLoadRecord(this.recordType, id);
      core.Log.debug('Step 5', 'Found record with id ' + record.getId());
      return data.internalId ? new this.recordClass(record.getAllFields()) : null;
    },

    // paginate: function(page, per_page) {},
    // create: function(data) {},
    // update: function(id, data) {},
    // destroy: function(id) {}
  });
})(core);
