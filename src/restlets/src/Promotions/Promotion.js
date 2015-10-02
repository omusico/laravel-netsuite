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
      'custrecord_category_id'      : 'int',
      'description'                 : 'string',
      'discounttype'                : 'string',
      'rate'                        : 'string',
      // 'coupons_max_use',
      // 'coupons_number_available',
      'minimumorderamount'          : 'float',
      'custrecord_min_order_type'   : 'string',
      'startdate'                   : 'date',
      'enddate'                     : 'date',
      'custrecord_full_price'       : 'int',
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
      'coupons_category_id',
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

    getCouponsCategoryIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'custrecord_category_id');
    },

    getCouponsDescriptionAttribute: function()
    {
      return core.Util.get(this.attrs, 'description', '');
    },

    getCouponsDiscountTypeAttribute: function()
    {
      return core.Util.get(this.attrs, 'discounttype') != 'percent'
           ? 'amount'
           : 'percent';
    },

    getCouponsDiscountAmountAttribute: function()
    {
      return core.Util.get(this.attrs, 'discounttype') == 'percent'
           ? Math.abs(parseFloat(core.Util.get(this.attrs, 'rate')) / 100)
           : parseFloat(core.Util.get(this.attrs, 'rate'));
    },

    getCouponsMinOrderTypeAttribute: function()
    {
      return core.Util.get(this.attrs, 'custrecord_min_order_type');
    },

    getCouponsMinOrderAttribute: function()
    {
      return core.Util.get(this.attrs, 'minimumorderamount');
    },

    getCouponsDateStartAttribute: function()
    {
      return core.Util.get(this.attrs, 'startdate');
    },

    getCouponsDateEndAttribute: function()
    {
      return core.Util.get(this.attrs, 'enddate');
    },

    getCouponsFullPriceAttribute: function()
    {
      return core.Util.get(this.attrs, 'custrecord_full_price');
    },

    getCreatedAtAttribute: function()
    {
      return core.Util.get(this.attrs, 'custrecord_createddate');
    },

    getUpdatedAtAttribute: function()
    {
      return core.Util.get(this.attrs, 'custrecord_lastmodifieddate');
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
