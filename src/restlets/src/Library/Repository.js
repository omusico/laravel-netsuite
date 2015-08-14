(function(core)
{
  core.Repository = core.Base.extend(
  {
    recordType: '',
    recordClass: '',

    searchFilters: [],
    searchColumns: [],
    searchPerPage: 1000,
    searchPage   : 1,

    constructor: function()
    {
      if ( ! this.recordType)  throw 'Repository missing recordType';
      if ( ! this.recordClass) throw 'Repository missing recordClass';
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    // add an and condition
    where: function(key, operator, value)
    {
      if (this.searchFilters.length) this.searchFilters.push('and');
      this.searchFilters.push([key, operator, value]);
      // this.searchFilters.push(new nlobjSearchFilter(key, null, operator, value));
      return this;
    },

    // add an or condition
    orWhere: function(key, operator, value)
    {
      if (this.searchFilters.length) this.searchFilters.push('or');
      this.searchFilters.push([key, operator, value]);
      // this.searchFilters.push(new nlobjSearchFilter(key, null, operator, value));
      return this;
    },

    // apply an array of filters
    filter: function(filters)
    {
      _.each(filters, function(filter) { this.where(filter.key, filter.operator, filter.value); }, this);
      return this;
    },

    // left join a column to filter on
    join: function(recordType, column)
    {
      this.searchColumns = this.searchColumns || [];
      this.searchColumns.push(new nlobjSearchColumn(column, recordType));
      return this;
    },

    // execute the search
    search: function(columns)
    {
      var searchResults;
      var end   = this.searchPage * this.searchPerPage;
      var start = end - this.searchPerPage;

      if (columns && columns.length)
      {
        var searchColumns = _.chain(columns)
                              .filter(function(column) { return column != 'id'; })
                              .map(function(column) { return new nlobjSearchColumn(column); })
                              .value();

        this.searchColumns = this.searchColumns.concat(searchColumns);

        var results = nlapiCreateSearch(this.recordType, this.searchFilters, this.searchColumns)
                      .runSearch()
                      .getResults(start, end);

        searchResults = _.map(results, function(result)
        {
          var attrs = {id: result.id};

          _.each(this.searchColumns, function(column)
          {
            if(column != 'id')
            {
              attrs[column.getName()] = result.getValue(column.getName());
            }
          });

          return attrs;
        }, this);
      }
      else
      {
        searchResults = nlapiCreateSearch(this.recordType, this.searchFilters, this.searchColumns)
                        .runSearch()
                        .getResults(start, end);
      }

      // reset filters after search
      this.searchFilters = [];
      this.searchColumns = [];

      // returned as an underscore collection
      return _(searchResults);
    },

    // execute search and convert to models
    get: function()
    {
      return this.search().map(function(result)
      {
        return this.find(result.id);
      }, this);
    },

    // paginate the get method
    paginate: function(page, perPage)
    {
      this.searchPage    = page;
      this.searchPerPage = perPage;
      return this.get();
    },

    // find a single record by internal id
    find: function(id)
    {
      var record = id ? nlapiLoadRecord(this.recordType, id) : null;
      return record ? new this.recordClass(record) : null;
    },

    // find a single record by external id
    findByExternalId: function(externalid)
    {
      return this.find(this.where('externalid', 'is', externalid).search().first().id);
    },

    // get the first record from a search
    first: function()
    {
      return this.find(this.search().first().id);
    },

    create: function(model)
    {
      var record = nlapiCreateRecord(this.recordType);

      _.each(model.attrs, function(value, key)
      {
        record.setFieldValue(key, value);
      });

      // _.each(model.sublists)

      var id = nlapiSubmitRecord(record, true);
      model.set('id', parseInt(id));
      return model;
    },

    update: function(model)
    {
      var diffs = {};
      var record = nlapiLoadRecord(this.recordType, model.attrs.id);

      _.each(model.attrs, function(value, key)
      {
        if(record.getFieldValue(key) != value) record.setFieldValue(key, value);
      });

      // for (var sublist in this.sublists)
      // {
      //   var count = isRecord ?
      //               object.getLineItemCount(sublist) :
      //               typeof object[sublist] !== 'undefined' ?
      //                 object[sublist].length :
      //                 0;
      //
      //   if (count)
      //   {
      //     attrs[sublist] = [];
      //
      //     for (var i = 1; i <= count; i++)
      //     {
      //       var item = {};
      //
      //       if (isRecord)
      //       {
      //         var fields = object.getAllLineItemFields(sublist);
      //
      //         for (var index in fields)
      //         {
      //           item[fields[index]] = object.getLineItemValue(sublist, fields[index], i);
      //         }
      //       }
      //       else
      //       {
      //         item = object[sublist][i];
      //       }
      //
      //       var recordType = this.sublists[sublist];
      //       attrs[sublist].push(new recordType(item));
      //     }
      //   }
      // }

      nlapiSubmitRecord(record, true);

      return model;
    },

    destroy: function(model)
    {
      nlapiDeleteRecord(this.recordType, id);
    }
  });
})(core);
