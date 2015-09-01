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
      'pricinggroup'     : 'object',
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
      'products_id',
      'created_at',
      'updated_at',

      // relations
      'price_lists',
      'inventory_locations'
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

    getProductsIdAttribute: function()
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

    getAddressesAttribute: function()
    {
      var addresses = core.Util.get(this.attrs, 'addressbook', []);

      return _.map(addresses, function(address)
      {
        return address.toHash();
      });
    },

    getPriceListsAttribute: function()
    {
      var priceLists = core.Util.get(this.attrs, 'price', []);

      return _.map(priceLists, function(priceList)
      {
        return priceList.toHash();
      });
    },

    getInventoryLocationsAttribute: function()
    {
      var locations = core.Util.get(this.attrs, 'locations', []);

      return _.map(locations, function(location)
      {
        return location.toHash();
      });
    },
  });
})(core);
