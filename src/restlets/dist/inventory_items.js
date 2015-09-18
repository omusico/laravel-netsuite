(function(core)
{
  core.InventoryItemLocation = core.Model.extend(
  {
    recordType: '',

    // fields to be parsed on input
    fields: {
      'locationid'        : 'int',
      'location_display'  : 'string',
      'quantityavailable' : 'int'
    },

    visible: [
      'ns_id',
      'name',
      'quantity'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'locationid');
    },

    getNameAttribute: function()
    {
      return core.Util.get(this.attrs, 'location_display');
    },

    getQuantityAttribute: function()
    {
      return core.Util.get(this.attrs, 'quantityavailable');
    },
  });
})(core);

(function(core)
{
  core.InventoryItemPriceList = core.Model.extend(
  {
    recordType: '',

    // fields to be parsed on input
    fields: {
      'pricelevel'     : 'int',
      'pricelevelname' : 'object',
      'price_1_'       : 'float',
      'currency'       : 'int'
    },

    // matrices: [
    //   'currency',
    //   'price'
    // ],

    visible: [
      'ns_id',
      'price_list_name',
      'price',
      'currency_id',
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'pricelevel');
    },

    getPriceListNameAttribute: function()
    {
      return core.Util.get(this.attrs, 'pricelevelname');
    },

    getPriceAttribute: function()
    {
      return core.Util.get(this.attrs, 'price_1_');
    },

    getCurrencyIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'currency');
    }
  });
})(core);

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
      'product_legacy_id',
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

(function(core)
{
  core.InventoryItemSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'         : 'int',
      'externalid' : 'string',
      'created'    : 'timestamp',
      'modified'   : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'product_legacy_id',
      'created_at',
      'updated_at'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getProductLegacyIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'created');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'modified');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    }
  });
})(core);

(function(core)
{
  core.InventoryItemRepository = core.Repository.extend(
  {
    recordClass: core.InventoryItem,
    searchClass: core.InventoryItemSearchResult,

    searchColumns: [
      'externalid',
      'created',
      'modified'
    ],

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      return results.map(function(result)
      {
        return new this.searchClass(result);
      }, this);
    },

    update: function(attrs)
    {
      var model = this.find(attrs.ns_id);
      if ( ! model) return false;
      model.set(attrs);

      // this model might be missing some sublist ids
      model = core.Repository.prototype.update.call(this, model);

      // reload model so ids are set on sublists etc
      model = this.find(model.get('id'));

      return model;
    }
  });
})(core);

(function(core)
{
  core.InventoryItemsController = core.Controller.extend(
  {
    initialize: function()
    {
      this.inventoryItems = new core.InventoryItemRepository();
    },

    index: function(datain)
    {
      var input          = new core.Input(datain).parseDates().parseArrays();
      var inventoryItems = this.inventoryItems
                          .filter(input.get('filters', []))
                          .orderBy('lastmodifieddate', 'ASC')
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(inventoryItems.toHash());
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {ns_id: 'required'}, {products_id : 'required'});

      if (validator.passes())
      {
        var inventoryItem = input.has('ns_id') ? this.inventoryItems.find(input.get('ns_id')) : this.inventoryItems.findByExternalId(input.get('products_id'));
        return inventoryItem ? this.okay(inventoryItem.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    update: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {ns_id: 'required'});

      if (validator.passes())
      {
        // get what we need
        var attrs = input.only(
          'ns_id',
          'product_legacy_id',
        );

        try
        {
          var inventoryItem = this.inventoryItems.update(attrs);
        }
        catch(e)
        {
          return this.internalServerError(e);
        }

        return this.okay(inventoryItem.toHash());
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
