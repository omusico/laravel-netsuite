(function(core)
{
  core.Repository = core.Base.extend(
  {
    recordType: '',
    recordClass: '',
    searchFilters: [],

    constructor: function()
    {
      if ( ! this.recordType)  throw 'Repository missing recordType';
      if ( ! this.recordClass) throw 'Repository missing recordClass';
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    where: function(key, operator, value)
    {
      this.searchFilters = this.searchFilters || [];
      this.searchFilters.push(new nlobjSearchFilter(key, null, operator, value));
      return this;
    },

    // var thirtyDaysAgo = nlapiAddDays(new Date(), -30);
    // oldSOFilters[0] = new nlobjSearchFilter('trandate', null, 'onorafter', thirtyDaysAgo);
    search: function(columns)
    {
      var searchResults;

      if (columns && columns.length)
      {
        var searchColumns = _.chain(columns)
                              .filter(function(column) { return column != 'id'; })
                              .map(function(column) { return new nlobjSearchColumn(column); })
                              .value();

        searchResults = _(nlapiSearchRecord(this.recordType, null, this.searchFilters, searchColumns)).map(function(result)
        {
          var attrs = {id: result.id};
          _.each(columns, function(column) { if(column != 'id') attrs[column] = result.getValue(column); });
          return attrs;
        });
      }
      else
      {
        searchResults = nlapiSearchRecord(this.recordType, null, this.searchFilters, []);
      }

      // reset filters after search
      this.searchFilters = [];

      // returned as an underscore collection
      return _(searchResults);
    },

    get: function(columns)
    {
      var results = this.search(columns);

      return results.map(function(result)
      {
        return this.find(result.id);
      }, this);
    },

    paginate: function(page, per_page)
    {

    },

    find: function(id)
    {
      var record = id ? nlapiLoadRecord(this.recordType, id) : null;
      return record ? new this.recordClass(record) : null;
    },

    findByExternalId: function(externalid)
    {
      return this.find(this.where('externalid', 'is', externalid).search().first().id);
    },

    first: function()
    {
      return this.find(this.search().first().id);
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
