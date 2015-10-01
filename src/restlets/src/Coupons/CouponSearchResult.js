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
