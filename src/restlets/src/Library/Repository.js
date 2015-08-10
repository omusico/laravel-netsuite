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

    search: function(key, value)
    {
      var filters = [new nlobjSearchFilter(key, null, 'is', value)];
      var results = nlapiSearchRecord(this.recordType, null, filters, []);
      return results;
    },

    find: function(id)
    {
      var record = nlapiLoadRecord(this.recordType, id);
      return record ? new this.recordClass(record) : null;
    },

    findByExternalId: function(id)
    {
      var results = this.search('externalid', id);
      return results.length ? this.find(results[0].id) : null;
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

      return new this.recordClass(record);
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

      return new this.recordClass(record);
    },

    destroy: function(id)
    {
      nlapiDeleteRecord(this.recordType, id);
    }
  });
})(core);
