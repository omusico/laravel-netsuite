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
