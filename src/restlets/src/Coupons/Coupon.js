(function(core)
{
  core.Coupon = core.Model.extend(
  {
    recordType: 'couponcode',

    // fields to be parsed on input
    fields: {
      'id' : 'int'
    },

    // fields to be parsed on output
    visible: [
      'ns_id'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    }
  });
})(core);
