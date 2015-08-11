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

    // var thirtyDaysAgo = nlapiAddDays(new Date(), -30);
    // oldSOFilters[0] = new nlobjSearchFilter('trandate', null, 'onorafter', thirtyDaysAgo);
    search: function(key, value, operator)
    {
      operator = operator || 'is';

      var search_filters = [new nlobjSearchFilter(key, null, operator, value)];

      var columns = _.keys(new this.recordClass().fields);

      var search_columns = _.chain(columns)
                            .filter(function(column) { return column != 'id'; })
                            .map(function(column) { return new nlobjSearchColumn(column); })
                            .value();

      var search_results = nlapiSearchRecord(this.recordType, null, search_filters, search_columns);

      var results = _.map(search_results, function(result)
      {
        var attrs = {id: result.id};
        _.each(columns, function(column) { if(column != 'id') attrs[column] = result.getValue(column); });
        return attrs;
      });

      return results;
    },

    find: function(id)
    {
      var record = nlapiLoadRecord(this.recordType, id);

      return record ? new this.recordClass(record) : null;
    },

    findBySearch: function(key, value, operator)
    {
      return this.search(key, value, operator).map(_.bind(function(result)
      {
        return new this.recordClass(result);
      }, this));
    },

    findByExternalId: function(externalid)
    {
      return this.findBySearch('externalid', externalid).first();
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
