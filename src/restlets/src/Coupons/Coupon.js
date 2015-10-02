(function(core)
{
  core.Coupon = core.Model.extend(
  {
    recordType: 'couponcode',

    // fields to be parsed on input
    fields: {
      'id'      : 'int',
      'code'    : 'string'
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

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    }
  });
})(core);
