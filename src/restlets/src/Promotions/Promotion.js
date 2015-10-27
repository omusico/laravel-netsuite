(function(core)
{
  core.Promotion = core.Model.extend(
  {
    recordType: 'promotioncode',

    // these are custrecords with seconds!
    timeFormat : 'M/D/YYYY h:mm:ss a',

    // fields to be parsed on input
    fields: {
      'id'                          : 'int',
      'code'                        : 'string',
      'custrecord_categories_id'    : 'int',
      'description'                 : 'string',
      'discounttype'                : 'string',
      'rate'                        : 'string',
      // 'coupons_max_use',
      // 'coupons_number_available',
      'minimumorderamount'          : 'float',
      'custrecord_min_order_type'   : 'string',
      'startdate'                   : 'date',
      'enddate'                     : 'date',
      'custrecord_full_price'       : 'string',
      'custrecord_createddate'      : 'timestamp',
      'custrecord_lastmodifieddate' : 'timestamp'
    },

    sublists: {
      'items' : 'PromotionItem'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'coupons_id',
      'coupons_categories_id',
      'coupons_description',
      'coupons_discount_type',
      'coupons_discount_amount',
      // 'coupons_max_use',
      // 'coupons_number_available',
      'coupons_min_order_type',
      'coupons_min_order',
      'coupons_date_start',
      'coupons_date_end',
      'coupons_full_price',
      'created_at',
      'updated_at',

      'coupons_products'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCouponsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'code').toLowerCase();
    },

    getCouponsCategoriesIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'custrecord_categories_id');
    },

    getCouponsDescriptionAttribute: function()
    {
      return core.Util.get(this.attrs, 'description', '');
    },

    getCouponsDiscountTypeAttribute: function()
    {
      if (core.Util.get(this.attrs, 'freeshipmethod') != null)
      {
        return 'shipping';
      }

      if (parseFloat(core.Util.get(this.attrs, 'rate')) == 0)
      {
        return 'no_value';
      }

      return core.Util.get(this.attrs, 'discounttype') != 'percent'
           ? 'fixed'
           : 'percent';
    },

    getCouponsDiscountAmountAttribute: function()
    {
      var discount_type   = this.get('coupons_discount_type');
      var discount_amount = core.Util.get(this.attrs, 'rate');

      switch(discount_type)
      {
        case 'percent':  return Math.abs(parseFloat(discount_amount) / 100); break;
        case 'fixed':    return parseFloat(discount_amount);                 break;
        case 'shipping': return parseInt(discount_amount);                   break;
        case 'no_value': return 0;                                           break;
        default:         return null;
      }
    },

    getCouponsMinOrderTypeAttribute: function()
    {
      return core.Util.get({
        '1': 'price',
        '2': 'amount'
      }, core.Util.get(this.attrs, 'custrecord_min_order_type', '1'), 'price');
    },

    getCouponsMinOrderAttribute: function()
    {
      return core.Util.get(this.attrs, 'minimumorderamount');
    },

    getCouponsDateStartAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'startdate'), this.dateFormat, 'YYYY-MM-DD 00:00:00');
    },

    getCouponsDateEndAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'enddate'), this.dateFormat, 'YYYY-MM-DD 23:59:59');
    },

    getCouponsFullPriceAttribute: function()
    {
      return core.Util.get(this.attrs, 'custrecord_full_price') == 'T' ? 1 : 0;
    },

    getCreatedAtAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'custrecord_createddate'), this.timeFormat, 'YYYY-MM-DD hh:mm:00');
    },

    getUpdatedAtAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'custrecord_lastmodifieddate'), this.timeFormat, 'YYYY-MM-DD hh:mm:00');
    },

    getCouponsProductsAttribute: function()
    {
      return _.map(core.Util.get(this.attrs, 'items', []), function(item)
      {
        return item.get('ns_id');
      }, this);
    },

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    },

    // 'coupons_id',
    // 'code'                        : 'string',
    setCouponsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'code', value);
    },

    // 'custrecord_categories_id'    : 'int',
    // 'coupons_categories_id',
    setCouponsCategoriesIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'custrecord_categories_id', value);
    },

    // 'description'                 : 'string',
    // 'coupons_description',
    setCouponsDescriptionAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'description', value);
    },

    // 'discounttype'                : 'string',
    // 'coupons_discount_type',
    setCouponsDiscountTypeAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'discounttype', value);
    },

    // 'rate'                        : 'string',
    // 'coupons_discount_amount',
    setCouponsDiscountAmountAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'rate', value);
    },

    // 'minimumorderamount'          : 'float',
    // 'coupons_min_order',
    setCouponsMinOrderAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'minimumorderamount', value);
    },

    // 'custrecord_min_order_type'   : 'string',
    // 'coupons_min_order_type',
    setCouponsMinOrderTypeAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'custrecord_min_order_type', value);
    },

    // 'startdate'                   : 'date',
    // 'coupons_date_start',
    setCouponsDateStartAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'startdate', value);
    },

    // 'enddate'                     : 'date',
    // 'coupons_date_end',
    setCouponsEndDateAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'enddate', value);
    },

    // 'custrecord_full_price'       : 'string',
    // 'coupons_full_price',
    setCouponsFullPriceAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'custrecord_full_price', value);
    },

    // IGNROE THESE
    // 'custrecord_createddate'      : 'timestamp',
    // 'created_at',
    // 'custrecord_lastmodifieddate' : 'timestamp'
    // 'updated_at',

    setCouponsProductsAttribute: function(item)
    {
      var promotioncodeitem = _.map(item, function(promotioncodeitem)
      {
        var model = new core[this.sublists.items](promotioncodeitem, {mutate: true});
        return model;
      }, this);

      core.Util.set(this.attrs, 'items', promotioncodeitem);
    }

  });
})(core);
