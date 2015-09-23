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

    setNsIdAttribute: function(value)
    {
      core.Util.set(this.attrs, 'id', value);
    }
  });
})(core);
