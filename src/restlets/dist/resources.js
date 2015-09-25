(function(core)
{
  core.Address = core.Model.extend(
  {
    fields: {
      'id'        : 'int',
      'addressee' : 'string',
      'addr1'     : 'string',
      'addr2'     : 'string',
      'zip'       : 'string',
      'city'      : 'string',
      'state'     : 'string',
      'country'   : 'string'
    },

    visible: [
      'ns_id',
      'entry_firstname',
      'entry_lastname',
      'entry_street_address',
      'entry_street_address_2',
      'entry_postcode',
      'entry_city',
      'entry_state',
      'entry_country'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getEntryFirstnameAttribute: function()
    {
      return core.Util.get(core.Util.get(this.attrs, 'addressee', '').split(' '), '0', '');
    },

    getEntryLastnameAttribute: function()
    {
      return _.rest(core.Util.get(this.attrs, 'addressee', '').split(' ')).join(' ');
    },

    getEntryStreetAddressAttribute: function()
    {
      return core.Util.get(this.attrs, 'addr1', '');
    },

    getEntryStreetAddress2Attribute: function()
    {
      return core.Util.get(this.attrs, 'addr2', '');
    },

    getEntryPostcodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'zip', '');
    },

    getEntryCityAttribute: function()
    {
      return core.Util.get(this.attrs, 'city', '');
    },

    getEntryStateAttribute: function()
    {
      return core.Util.get(this.attrs, 'state', '');
    },

    getEntryCountryAttribute: function()
    {
      return core.Util.get(this.attrs, 'country', '');
    },

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    },

    setEntryAddresseeAttribute: function(value)
    {
      core.Util.set(this.attrs, 'addressee', value);
    },

    setEntryStreetAddressAttribute: function(value)
    {
      core.Util.set(this.attrs, 'addr1', value);
    },

    setEntryStreetAddress2Attribute: function(value)
    {
      core.Util.set(this.attrs, 'addr2', value);
    },

    setEntryPostcodeAttribute: function(value)
    {
      core.Util.set(this.attrs, 'zip', value);
    },

    setEntryCityAttribute: function(value)
    {
      core.Util.set(this.attrs, 'city', value);
    },

    setEntryStateAttribute: function(value)
    {
      core.Util.set(this.attrs, 'state', value);
    },

    setEntryCountryAttribute: function(value)
    {
      core.Util.set(this.attrs, 'country', value);
    }
  });
})(core);

(function(core)
{
  core.Customer = core.Model.extend(
  {
    recordType: 'customer',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string', // this must be a string or it will add a .0 to the end, you got me...
      'firstname'        : 'string',
      'lastname'         : 'string',
      'phone'            : 'string',
      'email'            : 'string',
      'category'         : 'int',
      'pricelevel'       : 'int',
      'isperson'         : 'string',
      'taxable'          : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp',

      'custentity_rewards_balance' : 'int'
    },

    // sublists to be parsed on input
    sublists: {
      'addressbook' : core.Address
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'customers_id',
      'customers_firstname',
      'customers_lastname',
      'customers_telephone',
      'customers_email_address',
      'rewards_balance',
      'created_at',
      'updated_at',
      'addresses'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCustomersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCustomersFirstnameAttribute: function()
    {
      return core.Util.get(this.attrs, 'firstname', '');
    },

    getCustomersLastnameAttribute: function()
    {
      return core.Util.get(this.attrs, 'lastname', '');
    },

    getCustomersTelephoneAttribute: function()
    {
      return core.Util.get(this.attrs, 'phone', '');
    },

    getCustomersEmailAddressAttribute: function()
    {
      return core.Util.get(this.attrs, 'email', '');
    },

    getRewardsBalanceAttribute: function()
    {
      return core.Util.get(this.attrs, 'custentity_rewards_balance', 0);
    },

    getCreatedAtAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'datecreated'), this.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'lastmodifieddate'), this.timeFormat);
    },

    getAddressesAttribute: function()
    {
      var addresses = core.Util.get(this.attrs, 'addressbook', []);

      return _.map(addresses, function(address)
      {
        return address.toHash();
      });
    },

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    },

    setCustomersIdAttribute: function(value)
    {
      var externalid = parseInt(value) + '';
      core.Util.set(this.attrs, 'externalid', externalid);
    },

    setCustomersFirstnameAttribute: function(value)
    {
      core.Util.set(this.attrs, 'firstname', value);
    },

    setCustomersLastnameAttribute: function(value)
    {
      core.Util.set(this.attrs, 'lastname', value);
    },

    setCustomersTelephoneAttribute: function(value)
    {
      core.Util.set(this.attrs, 'phone', value + '');
    },

    setCustomersEmailAddressAttribute: function(value)
    {
      core.Util.set(this.attrs, 'email', value);
    },

    setRewardsBalanceAttribute: function(value)
    {
      core.Util.set(this.attrs, 'custentity_rewards_balance', parseInt(value));
    },

    setCreatedAtAttribute: function(value)
    {
      core.Util.set(this.attrs, 'datecreated', core.Util.formatDate(value, core.Util.timeFormat, this.timeFormat));
    },

    setUpdatedAtAttribute: function(value)
    {
      core.Util.set(this.attrs, 'lastmodifieddate', core.Util.formatDate(value, core.Util.timeFormat, this.timeFormat));
    },

    setAddressesAttribute: function(value)
    {
      var addresses = _.map(value, function(address)
      {
        var model = new this.sublists.addressbook(address, {mutate: true});
        return model;
      }, this);

      core.Util.set(this.attrs, 'addressbook', addresses);
    }
  });
})(core);

(function(core)
{
  core.CustomerSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'customers_id',
      'created_at',
      'updated_at'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCustomersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'datecreated');
      var date = moment(value, this.timeFormat).format(core.Util.timeFormat);
      date = date != 'Invalid date' ? date : null;
      return date;
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'lastmodifieddate');
      var date = moment(value, this.timeFormat).format(core.Util.timeFormat);
      date = date != 'Invalid date' ? date : null;
      return date;
    }
  });
})(core);

(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordClass: core.Customer,
    searchClass: core.CustomerSearchResult,

    searchColumns: [
      'externalid',
      'datecreated',
      'lastmodifieddate'
    ],

    // scopes

    byCategoryId: function(category_id)
    {
      return this.where('category', 'is', category_id);
    },

    lastModifiedOnOrAfter: function(date)
    {
      return this.where('lastmodifieddate', 'onorafter', date);
    },

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      var models = results.map(function(result)
      {
        return new this.searchClass(result);
      }, this);

      return models;
    },

    create: function(attrs)
    {
      var model = new this.recordClass(attrs, {mutate: true});

      // this model will have id set on it, but might be missing some sublist ids
      model = core.Repository.prototype.create.call(this, model);

      // reload model so ids are set on sublists etc
      model = this.find(model.get('id'));

      return model;
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
    },

    destroy: function(id)
    {
      var model = this.find(id);
      if ( ! model) return false;
      return core.Repository.prototype.destroy.call(this, model);
    },

    destroyByExternalId: function(external_id)
    {
      var model = this.findByExternalId(external_id);
      if ( ! model) return false;
      return core.Repository.prototype.destroy.call(this, model);
    }
  });
})(core);

(function(core)
{
  core.CustomersController = core.Controller.extend(
  {
    initialize: function()
    {
      this.customers = new core.CustomerRepository();
    },

    index: function()
    {
      var customers = this.customers
                          .filter(input.get('filters', []))
                          .orderBy('lastmodifieddate', 'ASC')
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(customers.toHash());
    },

    show: function()
    {
      var validator = new core.Validator(input, {ns_id: 'required'}, {customers_id : 'required'});

      if (validator.passes())
      {
        try
        {
          var customer = input.has('ns_id')
                       ? this.customers.find(input.get('ns_id'))
                       : this.customers.findByExternalId(input.get('customers_id'));

          return customer ? this.okay(customer.toHash()) : this.notFound();
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    store: function()
    {
      var validator = new core.Validator(input, {
        customers_id           : 'required',
        customers_firstname    : 'required',
        customers_lastname     : 'required',
        customers_telephone    : 'required',
        customers_email_address: 'required'
      });

      if (validator.passes())
      {
        // set defaults
        var attrs = _.defaults(input.only(
          'customers_id',
          'customers_firstname',
          'customers_lastname',
          'customers_telephone',
          'customers_email_address',
          'rewards_balance',
          'category',
          'pricelevel',
          'isperson',
          'taxable',
          'addresses'
        ), {
          category  : 3,   // Retail
          pricelevel: 5,   // Retail Pricing
          isperson  : 'T', // Individual
          taxable   : 'T'  // Taxable
        });

        try
        {
          var customer = this.customers.create(attrs);

          return this.created(customer.toHash());
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    update: function()
    {
      var validator = new core.Validator(input, {
        ns_id: 'required',
      });

      if (validator.passes())
      {
        // get what we need
        var attrs = input.only(
          'ns_id',
          'customers_id',
          'customers_firstname',
          'customers_lastname',
          'customers_telephone',
          'customers_email_address',
          'rewards_balance',
          'category',
          'pricelevel',
          'isperson',
          'taxable',
          'addresses'
        );

        try
        {
          var customer = this.customers.update(attrs);

          return this.okay(customer.toHash());
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    // destroy: function()
    // {
    //   var validator = new core.Validator(input, {ns_id: 'required'}, {customers_id : 'required'});
    //
    //   if (validator.passes())
    //   {
    //     try
    //     {
    //       var success = input.has('ns_id') ?
    //                     this.customers.destroy(input.get('ns_id')) :
    //                     this.customers.destroyByExternalId(input.get('customers_id'));
    //
    //       // returns are ignored for delete requests?
    //       // return success ? this.okay([]) : this.notFound();
    //     }
    //     catch(e)
    //     {
    //       // return this.internalServerError(e); // returns are ignored for delete requests?
    //       this.internalServerError(e);
    //     }
    //   }
    //   else
    //   {
    //     // return this.badRequest(validator.toHash()); // returns are ignored for delete requests?
    //     this.badRequest(validator.toHash());
    //   }
    // }
  });
})(core);

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

    index: function()
    {
      var inventoryItems = this.inventoryItems
                               .filter(input.get('filters', []))
                               .orderBy('lastmodifieddate', 'ASC')
                               .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(inventoryItems.toHash());
    },

    show: function()
    {
      var validator = new core.Validator(input, {ns_id: 'required'}, {product_legacy_id : 'required'});

      if (validator.passes())
      {
        try
        {
          var inventoryItem = input.has('ns_id')
                            ? this.inventoryItems.find(input.get('ns_id'))
                            : this.inventoryItems.findByExternalId(input.get('product_legacy_id'));

          return inventoryItem ? this.okay(inventoryItem.toHash()) : this.notFound();
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
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
          'product_legacy_id'
        );

        try
        {
          var inventoryItem = this.inventoryItems.update(attrs);
          return this.okay(inventoryItem.toHash());
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);

(function(core)
{
  core.SalesOrderItem = core.Model.extend(
  {
    recordType: 'salesorderitem',

    fields: {
      'item'      : 'int',    // item id
      'quantity'  : 'int',   // quantity
      'rate'      : 'float', // price
      'amount'    : 'float', // line item price
      'istaxable' : 'int'
    },

    visible: [
      'products_ns_id',
      'products_quantity',
      'products_price'
    ],

    getProductsNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'item');
    },

    getProductsQuantityAttribute: function()
    {
      return core.Util.get(this.attrs, 'quantity');
    },

    getProductsPriceAttribute: function()
    {
      return core.Util.get(this.attrs, 'rate')
    }
  });
})(core);

(function(core)
{
  core.SalesOrder = core.Model.extend(
  {
    recordType: 'salesorder',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',    // ns_id
      'externalid'       : 'string', // orders_id
      'entity'           : 'int',    // customers ns_id

      'authcode'         : 'string',

      // set these as defaults for now
      'class'            : 'int',    // web, retail, etc
      'location'         : 'int',

      // 'discountitem' : 'notsure',
      'email'            : 'string',

      // shipping
      'shipaddressee'    : 'string',
      'shipaddr1'        : 'string',
      'shipaddr2'        : 'string',
      'shipcity'         : 'string',
      'shipstate'        : 'string',
      'shipzip'          : 'string',
      'shipcountry'      : 'string',

      // shipping method
      'shipmethod'       : 'int',
      'shipcarrier'      : 'string',

      'paymentmethod'    : 'int',

      // totals
      'discounttotal'    : 'float',
      'subtotal'         : 'float',
      'shippingcost'     : 'float',
      'taxtotal'         : 'float',
      'total'            : 'float',

      'giftcertapplied'  : 'int',
      'promotionapplied' : 'int',

      'custbody14'       : 'string', // comments

      // 'taxrate' : 'float',

      'createddate'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    sublists: {
      'item' : core.SalesOrderItem
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'orders_id',
      'customers_ns_id',
      'customers_email_address',
      'delivery_name',
      'delivery_street_address',
      'delivery_street_address_2',
      'delivery_city',
      'delivery_state',
      'delivery_postcode',
      'delivery_country',
      'products',
      // 'item',
      'created_at',
      'updated_at'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getOrdersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCustomersNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'entity');
    },

    getCustomersEmailAddressAttribute: function()
    {
      return core.Util.get(this.attrs, 'email');
    },

    getDeliveryNameAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipaddressee');
    },

    getDeliveryStreetAddressAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipaddr1');
    },

    getDeliveryStreetAddress2Attribute: function()
    {
      return core.Util.get(this.attrs, 'shipaddr2');
    },

    getDeliveryCityAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipcity');
    },

    getDeliveryStateAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipstate');
    },

    getDeliveryPostcodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipzip');
    },

    getDeliveryCountryAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipcountry');
    },

    getProductsAttribute: function()
    {
      return _.map(core.Util.get(this.attrs, 'item', []), function(item)
      {
        return item.toHash();
      });
    },

    getCreatedAtAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'createddate'), this.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'lastmodifieddate'), this.timeFormat);
    },
  });
})(core);

// totals & payment
//   "shippingcostoverridden",
//   "getauth",
//   "currency",
//   "ispaypal",
//   "taxamount2override",
//   "methodtokenized",
//   "paypalprocessed",
//   "overrideshippingcost",
//   "oldpaypaltranid",
//   "ispaymethcc",

// general
//   "tranid", //   "transactionnumber",

// uncategorized
//   "type",
//   "fedexservicename",
//   "promodiscount",
//   "shipcomplete",
//   "paypalauthid",
//   "salesrep",

//   "paymentprocessingmode",
//   "billisresidential",

//   "persistedpromocode",
//   "paypaltoken",
//   "paypaloverride",
//   "orderstatus",
//   "discountrate",
//   "couponcode",
//   "promocode",
//   "paypalprocess",
//   "terms",
//   "item_total",

//   "shipoverride",
//   "paypaltranid",
//   "pendingpaypalauth",
//   "customercode",
//   "trancardid",
//   "paypalpayerid",

//   "shipisresidential",
//   "thirdpartycarrier",
//   "paypalauthiddisp",
//   "synceventfield",
//   "linked",
//   "class",
//   "taxamountoverride",
//   "trandate",
//   "paypalstatus",
// ]

(function(core)
{
  core.SalesOrderSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'orders_id',
      'created_at',
      'updated_at'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getOrdersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'datecreated');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'lastmodifieddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    }
  });
})(core);

(function(core)
{
  core.SalesOrderRepository = core.Repository.extend(
  {
    recordClass: core.SalesOrder,
    searchClass: core.SalesOrderSearchResult,

    searchColumns: [
      'externalid',
      'datecreated',
      'lastmodifieddate'
    ],

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      return results.map(function(result)
      {
        return new this.searchClass(result);
      }, this);
    },

    // create: function(attrs)
    // {
    //   var model = new this.recordClass(attrs, {mutate: true});
    //
    //   // this model will have id set on it, but might be missing some sublist ids
    //   model = core.Repository.prototype.create.call(this, model);
    //
    //   // reload model so ids are set on sublists etc
    //   model = this.find(model.get('id'));
    //
    //   return model;
    // },
    //
    // update: function(attrs)
    // {
    //   var model = this.find(attrs.id);
    //   if ( ! model) return false;
    //   model.set(attrs);
    //
    //   // this model might be missing some sublist ids
    //   model = core.Repository.prototype.update.call(this, model);
    //
    //   // reload model so ids are set on sublists etc
    //   model = this.find(model.get('id'));
    //
    //   return model;
    // },
  });
})(core);

(function(core)
{
  core.SalesOrdersController = core.Controller.extend(
  {
    initialize: function()
    {
      this.salesOrders = new core.SalesOrderRepository();
    },

    index: function()
    {
      var salesOrders = this.salesOrders
                          .filter(input.get('filters', []))
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(salesOrders.toHash());
    },

    show: function()
    {
      var validator = new core.Validator(input, {ns_id: 'required'}, {orders_id : 'required'});

      if (validator.passes())
      {
        var salesOrder = input.has('ns_id')
                       ? this.salesOrders.find(input.get('ns_id'))
                       : this.salesOrders.findByExternalId(input.get('orders_id'));

        return this.okay({model: salesOrder.toHash(), record: nlapiLoadRecord('salesorder', input.get('ns_id'))});

        return salesOrder ? this.okay(salesOrder.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);

(function(core)
{
  core.CashSaleItem = core.SalesOrderItem.extend(
  {
    fields: {
      'quantity' : 'int',   // quantity
      'rate'     : 'float', // price
      'amount'   : 'float', // line item price
      'taxcode'  : 'int',   // tax code
      'location' : 'int',
    }
  });
})(core);

(function(core)
{
  core.CashSale = core.SalesOrder.extend(
  {
    recordType: 'cashsale',

    sublists: {
      item: core.CashSaleItem
    }
  });
})(core);

(function(core)
{
  core.CashSaleSearchResult = core.SalesOrderSearchResult.extend({});
})(core);

(function(core)
{
  core.CashSaleRepository = core.SalesOrderRepository.extend(
  {
    recordClass: core.CashSale,
    searchClass: core.CashSaleSearchResult
  });
})(core);

(function(core)
{
  core.CashSalesController = core.Controller.extend(
  {
    initialize: function()
    {
      this.cachSales = new core.CashSaleRepository();
    },

    index: function()
    {
      var cachSales = this.cachSales
                          .filter(input.get('filters', []))
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(cachSales.toHash());
    },

    show: function()
    {
      var validator = new core.Validator(input, {ns_id: 'required'}, {orders_id : 'required'});

      if (validator.passes())
      {
        var cachSale = input.has('ns_id')
                     ? this.cachSales.find(input.get('ns_id'))
                     : this.cachSales.findByExternalId(input.get('orders_id'));

        return cachSale ? this.okay(cachSale.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);

(function(core)
{
  core.GiftCertificate = core.Model.extend(
  {
    recordType: 'giftcertificate',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'giftcertcode'     : 'string',
      'originalamount'   : 'float',
      'amountremaining'  : 'float',
      'expirationdate'   : 'timestamp',
      'createddate'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'gift_cards_id',
      'gift_cards_code',
      'gift_cards_amount',
      'gift_cards_amount_remaining',
      'date_end',
      'date_added',
      'date_updated'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getGiftCardsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getGiftCardsCodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'giftcertcode');
    },

    getGiftCardsAmountAttribute: function()
    {
      return core.Util.get(this.attrs, 'originalamount');
    },

    getGiftCardsAmountRemainingAttribute: function()
    {
      return core.Util.get(this.attrs, 'amountremaining');
    },

    getDateEndAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'expirationdate'), this.timeFormat)
    },

    getDateAddedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'createddate'), this.timeFormat)
    },

    getDateUpdatedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'lastmodifieddate'), this.timeFormat)
    },

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    }
  });
})(core);

(function(core)
{
  core.GiftCertificateSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'giftcertcode'     : 'string',
      'originalamount'   : 'float',
      'amountremaining'  : 'float',
      'expirationdate'   : 'timestamp',
      'createddate'      : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'gift_cards_code',
      'gift_cards_amount',
      'gift_cards_amount_remaining',
      'date_end',
      'date_added'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getGiftCardsCodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'giftcertcode');
    },

    getGiftCardsAmountAttribute: function()
    {
      return core.Util.get(this.attrs, 'originalamount');
    },

    getGiftCardsAmountRemainingAttribute: function()
    {
      return core.Util.get(this.attrs, 'amountremaining');
    },

    getDateEndAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'expirationdate'), this.timeFormat)
    },

    getDateAddedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'createddate'), this.timeFormat)
    }
  });
})(core);

(function(core)
{
  core.GiftCertificateRepository = core.Repository.extend(
  {
    recordClass: core.GiftCertificate,
    searchClass: core.GiftCertificateSearchResult,

    searchColumns: [
      // 'externalid',
      'giftcertcode',
      'originalamount',
      'amountremaining',
      'expirationdate',
      'createddate'
      // 'lastmodifieddate'
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
  core.GiftCertificatesController = core.Controller.extend(
  {
    initialize: function()
    {
      this.giftCertificates = new core.GiftCertificateRepository();
    },

    index: function()
    {
      var giftCertificates = this.giftCertificates
                                 .filter(input.get('filters', []))
                                 .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(giftCertificates.toHash());
    },

    show: function()
    {
      var validator = new core.Validator(input, {ns_id: 'required'}, {gift_cards_id : 'required'});

      // return nlapiLoadRecord('giftcertificate', input.get('ns_id'));

      if (validator.passes())
      {
        try
        {
          var giftCertificate = input.has('ns_id')
                              ? this.giftCertificates.find(input.get('ns_id'))
                              : this.giftCertificates.findByExternalId(input.get('gift_cards_id'));

          return giftCertificate ? this.okay(giftCertificate.toHash()) : this.notFound();
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
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
          'gift_cards_id'
        );

        try
        {
          var giftCertificate = this.giftCertificates.update(attrs);
          return this.okay(giftCertificate.toHash());
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);

(function(core)
{
  core.Promotion = core.Model.extend(
  {
    recordType: 'promotioncode',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'code'             : 'string',
      'description'      : 'string',
      'discount'         : 'float',
      'discounttype'     : 'string',
      'usetype'          : 'string',
      'startdate'        : 'timestamp',
      'enddate'          : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'coupons_id'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCouponsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'code');
    },

    // getCreatedAtAttribute: function()
    // {
    //   return core.Util.formatDate(core.Util.get(this.attrs, 'createddate'), this.timeFormat);
    // },
    //
    // getUpdatedAtAttribute: function()
    // {
    //   return core.Util.formatDate(core.Util.get(this.attrs, 'lastmodifieddate'), this.timeFormat);
    // },

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    }
  });
})(core);

(function(core)
{
  core.PromotionSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'         : 'int',
      'externalid' : 'string',
      'code'       : 'string'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'coupons_id'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCouponsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'code');
    }
  });
})(core);

(function(core)
{
  core.PromotionRepository = core.Repository.extend(
  {
    recordClass: core.Promotion,
    searchClass: core.PromotionSearchResult,

    searchColumns: [
      'externalid',
      'code'
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
  core.PromotionsController = core.Controller.extend(
  {
    initialize: function()
    {
      this.promotions = new core.PromotionRepository();
    },

    index: function()
    {
      // var input      = new core.Input(datain).parseDates().parseArrays();
      var promotions = this.promotions
                               .filter(input.get('filters', []))
                              //  .orderBy('lastmodifieddate', 'ASC')
                               .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(promotions.toHash());
    },

    show: function()
    {
      // var input     = new core.Input(datain);
      var validator = new core.Validator(input, {ns_id: 'required'}, {coupons_id : 'required'});

      if (validator.passes())
      {
        try
        {
          var promotion = input.has('ns_id')
                        ? this.promotions.find(input.get('ns_id'))
                        : this.promotions.findByExternalId(input.get('coupons_id'));

          return promotion ? this.okay(promotion.toHash()) : this.notFound();
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
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
          'coupons_id'
        );

        try
        {
          var promotion = this.promotions.update(attrs);
          return this.okay(promotion.toHash());
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
