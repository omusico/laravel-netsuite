(function(core)
{
  core.InventoryItem = core.Model.extend(
  {
    recordType: 'inventoryitem',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'displayname'      : 'string',
      'salesdescription' : 'string',
      'createddate'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    // sublists to be parsed on input
    sublists: {
      'locations' : core.InventoryItemLocation,
      'price'     : core.InventoryItemPriceList
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'name',
      'model_number',
      'product_legacy_id',
      'created_at',
      'updated_at',

      // relations
      'price_lists',
      'inventories'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getNameAttribute: function()
    {
      return core.Util.get(this.attrs, 'salesdescription');
    },

    getModelNumberAttribute: function()
    {
      return core.Util.get(this.attrs, 'displayname');
    },

    getProductLegacyIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'createddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'lastmodifieddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getPriceListsAttribute: function()
    {
      var priceListProducts = core.Util.get(this.attrs, 'price', []);

      return _.map(priceListProducts, function(priceListProduct)
      {
        return priceListProduct.toHash();
      });
    },

    getInventoriesAttribute: function()
    {
      var inventories = core.Util.get(this.attrs, 'locations', []);

      return _.map(inventories, function(inventory)
      {
        return inventory.toHash();
      });
    },

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    },

    setProductLegacyIdAttribute: function(value)
    {
      core.Util.set(this.attrs, 'externalid', value);
    },

    toUpdateRecord: function()
    {
      var record = nlapiLoadRecord(this.recordType, this.get('id'));

      _.each(_.omit(this.fields, 'id'), function(value, key)
      {
        core.Log.debug(key, this.get(key));
        record.setFieldValue(key, this.get(key));
      }, this);

      // when we update product, we only need to update it's own attributes, not sublists etc

      // _.each(this.sublists, function(recordClass, sublist)
      // {
      //   // remove any item in record and not in sent sublist
      //   _.times(record.getLineItemCount(sublist), function(index)
      //   {
      //     index++; // sublists are 1 based
      //
      //     var id          = parseInt(record.getLineItemValue(sublist, 'id', index), 10),
      //         foundInList = _.findWhere(core.Util.get(this.attrs, sublist, []), {id: id});
      //
      //     // remove that one
      //     if ( ! _.isUndefined(foundInList)) record.removeLineItem(sublist, index);
      //   }, this);
      //
      //   // update/add the rest
      //   _.each(core.Util.get(this.attrs, sublist, []), function(item, index)
      //   {
      //     index++; // sublists are 1 based
      //
      //     _.each(item.fields, function(type, field)
      //     {
      //       if (item.has(field))
      //       {
      //         record.setLineItemValue(sublist, field, index, item.get(field));
      //       }
      //     });
      //   }, this);
      // }, this);

      return record;
    }
  });
})(core);
