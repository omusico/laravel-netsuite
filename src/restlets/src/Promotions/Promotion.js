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
      'custrecord_categories_id'      : 'int',
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
      'items' : 'InventoryItem'
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
      return core.Util.get(this.attrs, 'code');
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
      return _.filter(_.map(core.Util.get(this.attrs, 'items', []), function(item)
      {
        return item.get('externalid');
      }, this), this);
    },

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    }
  });
})(core);
