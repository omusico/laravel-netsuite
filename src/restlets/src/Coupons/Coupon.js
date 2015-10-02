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
