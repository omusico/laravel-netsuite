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
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    find: function(id)
    {
      var record = nlapiLoadRecord(this.recordType, id);
      core.Log.debug('Step 5', 'Found ' + record.getRecordType() + ' record with id ' + record.getId());
      return record ? new this.recordClass(record.getAllFields()) : null;
    },

    paginate: function(page, per_page)
    {

    },

    create: function(attrs)
    {
      var record = nlapiCreateRecord(this.recordType);

      for(var field in attrs) {
        record.setFieldValue(field, attrs[field]);
      }

      nlapiSubmitRecord(record, true);

      return new this.recordClass(record.getAllFields());
    },

    update: function(id, attrs)
    {
      var diff = {};
      var record = nlapiLoadRecord(this.recordType, id);

      for(var field in attrs) {
        if(record.getFieldValue(field) != attrs[field]) {
          diff[field] = attrs[field];
        }
      }

      for(var field in diff) {
        record.setFieldValue(field, diff[field]);
      }

      nlapiSubmitRecord(record, true);

      return new this.recordClass(record.getAllFields());
    },

    destroy: function(id)
    {
      nlapiDeleteRecord(this.recordType, id);
    }
  });
})(core);
