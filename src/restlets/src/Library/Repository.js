(function(core)
{
  core.Repository = core.Base.extend(
  {
    recordType: '',
    recordClass: '',

    search_filters: [],

    constructor: function()
    {
      if ( ! this.recordType)  throw 'Repository missing recordType';
      if ( ! this.recordClass) throw 'Repository missing recordClass';
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    // var thirtyDaysAgo = nlapiAddDays(new Date(), -30);
    // oldSOFilters[0] = new nlobjSearchFilter('trandate', null, 'onorafter', thirtyDaysAgo);
    get: function(columns)
    {
      var search_results;

      if (columns && columns.length)
      {
        var search_columns = _.chain(columns)
                              .filter(function(column) { return column != 'id'; })
                              .map(function(column) { return new nlobjSearchColumn(column); })
                              .value();

        search_results = _(nlapiSearchRecord(this.recordType, null, this.search_filters, search_columns)).map(function(result)
        {
          var attrs = {id: result.id};
          _.each(columns, function(column) { if(column != 'id') attrs[column] = result.getValue(column); });
          return attrs;
        });
      }
      else
      {
        search_results = nlapiSearchRecord(this.recordType, null, this.search_filters, []);
      }

      // reset filters after search
      this.search_filters = [];

      return _(search_results);
    },

    find: function(id)
    {
      var record = nlapiLoadRecord(this.recordType, id);
      return record ? new this.recordClass(record) : null;
    },

    where: function(key, operator, value)
    {
      this.search_filters = this.search_filters || [];
      this.search_filters.push(new nlobjSearchFilter(key, null, operator, value));
      return this;
    },

    findByExternalId: function(externalid)
    {
      return this.find(this.where('externalid', 'is', externalid).get().first().id);
    },

    paginate: function(page, per_page)
    {

    },

    create: function(attrs)
    {
      var record = nlapiCreateRecord(this.recordType);

      for (var attr in attrs)
      {
        record.setFieldValue(attr, attrs[attr]);
      }

      nlapiSubmitRecord(record, true);

      return new this.recordClass(record);
    },

    update: function(id, attrs)
    {
      var diffs = {};
      var record = nlapiLoadRecord(this.recordType, id);

      for (var attr in attrs)
      {
        if(record.getFieldValue(attr) != attrs[attr])
        {
          diff[attr] = attrs[attr];
        }
      }

      for (var diff in diffs)
      {
        record.setFieldValue(diff, diffs[diff]);
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
