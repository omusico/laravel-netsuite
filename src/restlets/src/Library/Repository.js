(function(core)
{
  core.Repository = core.Base.extend(
  {
    recordClass   : '',
    searchFilters : [],
    searchColumns : [],
    searchPerPage : 1000,
    searchPage    : 1,

    constructor: function()
    {
      if ( ! this.recordClass) throw 'Repository missing recordClass';
      this.recordType = new this.recordClass().recordType; // set recordType from recordClass
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    // add an and condition
    where: function(key, operator, value)
    {
      if (this.searchFilters.length) this.searchFilters.push('and');
      this.searchFilters.push([key, operator, value]);
      return this;
    },

    // add an or condition
    orWhere: function(key, operator, value)
    {
      if (this.searchFilters.length) this.searchFilters.push('or');
      this.searchFilters.push([key, operator, value]);
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
      var hasColumns = columns && columns.length;

      var searchColumns = _.chain(hasColumns ? this.searchColumns.concat(columns) : this.searchColumns)
                           .filter(function(column) { return column != 'id'; })
                           .map(function(column) { return new nlobjSearchColumn(column); })
                           .value();

      if (hasColumns)
      {
        var results = nlapiCreateSearch(this.recordType, this.searchFilters, searchColumns)
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
        searchResults = nlapiCreateSearch(this.recordType, this.searchFilters, searchColumns)
                        .runSearch()
                        .getResults(start, end);
      }

      // reset filters after search
      this.searchFilters = [];

      // returned as an underscore collection
      return _(searchResults);
    },

    // execute search and convert to models
    get: function()
    {
      return this.search().map(function(result)
      {
        return result;
        // return this.find(result.id);
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
      return this.where('externalid', 'is', externalid).first();
    },

    // get the first record from a search
    first: function()
    {
      var first = this.search().first();
      return first ? this.find(first.id) : null;
    },

    create: function(model)
    {
      var record = model.toNewRecord();
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
      var id = nlapiDeleteRecord(this.recordType, model.get('id'));
      return model.get('id') === parseInt(id);
    }
  });
})(core);
