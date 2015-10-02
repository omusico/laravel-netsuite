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
      'addressbook' : 'Address'
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
    recordClass: 'Customer',
    searchClass: 'CustomerSearchResult',

    searchColumns: [
      'internalid',
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
        return new core[this.searchClass](result);
      }, this);

      return models;
    },

    create: function(attrs)
    {
      var model = new core[this.recordClass](attrs, {mutate: true});

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
                          .sort(input.get('sorts', []))
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(customers.toHash());
    },

    show: function()
    {
      // return nlapiLoadRecord('customer', input.get('ns_id'));

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
  core.Promotion = core.Model.extend(
  {
    recordType: 'promotioncode',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'name'             : 'string',
      'description'      : 'string',
      'discount'         : 'string',
      'discounttype'     : 'string',
      'usetype'          : 'string',
      'startdate'        : 'date',
      'enddate'          : 'date'
    },

    sublists: {
      'items' : 'InventoryItem'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'name',
      'description',
      'discount',
      'discounttype',
      'usetype',
      'startdate',
      'enddate',
      'codes',
      'items'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCodesAttribute: function()
    {
      return _.map(core.Util.get(this.attrs, 'code', []), function(code)
      {
        return code.toHash();
      }, this);
    },

    // getCouponsIdAttribute: function()
    // {
    //   return core.Util.get(this.attrs, 'code');
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
    recordClass: 'Promotion',
    searchClass: 'PromotionSearchResult',

    searchColumns: [
      'externalid',
      'code'
    ],

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      return results.map(function(result)
      {
        return new core[this.searchClass](result);
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
      var promotions = this.promotions
                           .filter(input.get('filters', []))
                           .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(promotions.toHash());
    },

    show: function()
    {
      // return nlapiLoadRecord('promotioncode', input.get('ns_id'));

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
      var validator = new core.Validator(input, {ns_id: 'required'});

      if (validator.passes())
      {
        // get what we need
        var attrs = input.only(
          'ns_id'
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

(function(core)
{
  core.Coupon = core.Model.extend(
  {
    recordType: 'couponcode',

    // fields to be parsed on input
    fields: {
      'id'      : 'int',
      'code'    : 'string',
      'used'    : 'int'
    },

    recordrefs: {
      'promotion' : 'Promotion'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'coupons_id',
      'coupons_category_id',
      'coupons_description',
      'coupons_discount',
      'coupons_discount_amount',
      // 'coupons_max_use', ???
      'coupons_number_available',
      'coupons_min_order_type',
      'coupons_min_order',
      'coupons_date_start',
      'coupons_date_end',
      'coupons_full_price'
      // 'created_at',
      // 'updated_at'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCouponsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'code');
    },

    getCouponsCategoryIdAttribute: function()
    {
      return null;
    },

    getCouponsDescriptionAttribute: function()
    {
      var promotion = core.Util.get(this.attrs, 'promotion');

      return promotion ? promotion.get('description') : '';
    },

    // 'coupons_discount',
    // 'coupons_discount_amount',
    // 'coupons_max_use',
    // 'coupons_number_available',
    // 'coupons_min_order_type',
    // 'coupons_min_order',

    getCouponsDateStartAttribute: function()
    {
      var promotion = core.Util.get(this.attrs, 'promotion');

      core.Log.debug('promotion', promotion);

      return promotion
           ? core.Util.formatDate(promotion.get('startdate'), 'M/D/YYYY', 'YYYY-MM-DD 00:00:00')
           : null;
    },

    getCouponsDateEndAttribute: function()
    {
      var promotion = core.Util.get(this.attrs, 'promotion');

      return promotion
           ? core.Util.formatDate(promotion.get('enddate'), 'M/D/YYYY', 'YYYY-MM-DD 23:59:59')
           : null;
    },

    getCouponsFullPriceAttribute: function()
    {
      return 1; // TODO: update when custom field arrives
    },

    // 'created_at',
    // 'updated_at'

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    }
  });
})(core);

(function(core)
{
  core.CouponSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'         : 'int',
      'externalid' : 'string'
    },

    // fields to be parsed on output
    visible: [
      'ns_id'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    }
  });
})(core);

(function(core)
{
  core.CouponRepository = core.Repository.extend(
  {
    recordClass: 'Coupon',
    searchClass: 'CouponSearchResult',

    searchColumns: [
      'externalid'
    ],

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      return results.map(function(result)
      {
        return new core[this.searchClass](result);
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
  core.CouponsController = core.Controller.extend(
  {
    initialize: function()
    {
      this.coupons = new core.CouponRepository();
    },

    index: function()
    {
      var coupons = this.coupons
                        .filter(input.get('filters', []))
                        .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(coupons.toHash());
    },

    show: function()
    {
      // return nlapiLoadRecord('couponcode', input.get('ns_id'));

      var validator = new core.Validator(input, {ns_id: 'required'}, {coupons_id : 'required'});

      if (validator.passes())
      {
        try
        {
          var coupon = input.has('ns_id')
                        ? this.coupons.find(input.get('ns_id'))
                        : this.coupons.findByExternalId(input.get('coupons_id'));

          return coupon ? this.okay(coupon.toHash()) : this.notFound();
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
      var validator = new core.Validator(input, {ns_id: 'required'});

      if (validator.passes())
      {
        // get what we need
        var attrs = input.only(
          'ns_id'
        );

        try
        {
          var coupon = this.coupons.update(attrs);
          return this.okay(coupon.toHash());
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
    recordClass: 'GiftCertificate',
    searchClass: 'GiftCertificateSearchResult',

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
        return new core[this.searchClass](result);
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
  core.InventoryItemLocation = core.Model.extend(
  {
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
      'locations' : 'InventoryItemLocation',
      'price'     : 'InventoryItemPriceList'
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
        record.setFieldValue(key, this.get(key));
      }, this);

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
    recordClass: 'InventoryItem',
    searchClass: 'InventoryItemSearchResult',

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
        return new core[this.searchClass](result);
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
  core.SalesOrderGiftCertRedemption = core.Model.extend(
  {
    recordType: 'giftcertredemption',

    // fields to be parsed on input
    fields: {
      'authcode'             : 'int',
      'externalid'           : 'string',
      'authcode_display'     : 'string',
      "authcodeamtremaining" : 'float',
      "authcodeapplied"      : 'float',
      "giftcertavailable"    : 'float'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      // 'gift_cards_id',
      'gift_cards_code',
      'gift_cards_amount',
      'gift_cards_amount_remaining'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'authcode');
    },

    getGiftCardsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getGiftCardsCodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'authcode_display');
    },

    getGiftCardsAmountAttribute: function()
    {
      return core.Util.get(this.attrs, 'giftcertavailable');
    },

    getGiftCardsAmountRemainingAttribute: function()
    {
      return core.Util.get(this.attrs, 'authcodeamtremaining');
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

      'custbody14'       : 'string', // comments

      // 'taxrate' : 'float',

      'createddate'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    recordrefs: {
      'entity'     : 'Customer',
      'couponcode' : 'Coupon'
    },

    sublists: {
      'item'               : 'SalesOrderItem',
      'giftcertredemption' : 'SalesOrderGiftCertRedemption'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'orders_id',
      'customers_id',
      'customers_email_address',
      'customers_telephone',
      'delivery_name',
      'delivery_street_address',
      'delivery_street_address_2',
      'delivery_city',
      'delivery_state',
      'delivery_postcode',
      'delivery_country',
      'payment_method',
      'orders_status',
      'date_purchased',
      'last_modified',

      // recordrefs
      'gift_certificates',
      'coupon',

      // sublists
      'products',
      'totals'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getOrdersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCustomersIdAttribute: function()
    {
      var customer = core.Util.get(this.attrs, 'entity');
      return customer.get('customers_id');
    },

    getCustomersEmailAddressAttribute: function()
    {
      var customer = core.Util.get(this.attrs, 'entity');
      return customer.get('customers_email_address');
    },

    getCustomersTelephoneAttribute: function()
    {
      var customer = core.Util.get(this.attrs, 'entity');
      return customer.get('customers_telephone');
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

    getOrdersStatusAttribute: function()
    {
      return core.Util.get({
        // Sales Order:Pending Approval	SalesOrd:A
        A: 1,
        // Sales Order:Pending Fulfillment	SalesOrd:B
        B: 2,
        // Sales Order:Cancelled	SalesOrd:C
        C: 6,
        // Sales Order:Partially Fulfilled	SalesOrd:D
        D: 2,
        // Sales Order:Pending Billing/Partially Fulfilled	SalesOrd:E
        E: 2,
        // Sales Order:Pending Billing	SalesOrd:F
        F: 2,
        // Sales Order:Billed	SalesOrd:G
        G: 2,
        // Sales Order:Closed	SalesOrd:H
        H: 6
      }, core.Util.get(this.attrs, 'orderstatus', 'A'), 1);
    },

    getGiftCertificatesAttribute: function()
    {
      return _.map(core.Util.get(this.attrs, 'giftcertredemption', []), function(giftcertificate)
      {
        return giftcertificate.toHash();
      }, this);
    },

    getCouponAttribute: function()
    {
      return core.Util.get(this.attrs, 'couponcode');
    },

    getProductsAttribute: function()
    {
      return _.map(core.Util.get(this.attrs, 'item', []), function(item)
      {
        return item.toHash();
      });
    },

    getTotalsAttribute: function()
    {

      var giftcardSum = _.reduce(this.get('gift_certificates'), function(total, gc){ return total + gc.authcodeapplied; }, 0);

      return [
        {
          title: 'Discount Coupon',
          text: core.Util.formatCurrency(0, 2, '-$'),
          value: '0.00',
          class: 'ot_discount_coupon',
          sort_order: 1
        },
        {
          title: 'Sub-Total:',
          text:  core.Util.formatCurrency(core.Util.get(this.attrs, 'subtotal', 0)),
          value: core.Util.get(this.attrs, 'subtotal', 0),
          class: 'ot_subtotal',
          sort_order: 2
        },
        {
          title: 'Sales Tax:',
          text: core.Util.formatCurrency(core.Util.get(this.attrs, 'taxtotal', 0)),
          value: core.Util.get(this.attrs, 'taxtotal', 0),
          class: 'ot_tax',
          sort_order: 3
        },
        {
          title: 'Duties:',
          text: '????????',
          value: '????????',
          class: 'ot_duties',
          sort_order: 4
        },
        {
          title: 'Shipping Name:',
          text:  core.Util.formatCurrency(core.Util.get(this.attrs, 'shipping', 0)),
          value: core.Util.get(this.attrs, 'shipping', 0),
          class: 'ot_shipping',
          sort_order: 5
        },
        {
          title: 'Gift Card:',
          text: core.Util.formatCurrency(giftcardSum),
          value: giftcardSum,
          class: 'ot_giftcard',
          sort_order: 6
        },
        {
          title: 'Total:',
          text: core.Util.formatCurrency(core.Util.get(this.attrs, 'total', 0)),
          value: core.Util.get(this.attrs, 'total', 0),
          class: 'ot_total',
          sort_order: 7
        }
      ];
    },

    getDatePurchasedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'createddate'), this.timeFormat);
    },

    getLastModifiedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'lastmodifieddate'), this.timeFormat);
    }
  });
})(core);

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
    recordClass: 'SalesOrder',
    searchClass: 'SalesOrderSearchResult',

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
        return new core[this.searchClass](result);
      }, this);
    },

    create: function(attrs)
    {
      var model = new core[this.recordClass](attrs, {mutate: true});

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
    },

    store: function()
    {
      var validator = new core.Validator(input, {

      });

      if (validator.passes())
      {
        // set defaults
        var attrs = _.defaults(input.only(

        ), {
          class: 3,   // web order
          location: 4 // web warehouse
        });

        try
        {
          var salesOrder = this.salesOrders.create(attrs);

          return this.created(salesOrder.toHash());
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

        );

        try
        {
          var salesOrder = this.salesOrders.update(attrs);

          return this.okay(salesOrder.toHash());
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
      item: 'CashSaleItem'
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
    recordClass: 'CashSale',
    searchClass: 'CashSaleSearchResult'
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
