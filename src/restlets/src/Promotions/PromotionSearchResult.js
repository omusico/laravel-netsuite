(function(core)
{
  core.PromotionSearchResult = core.Model.extend(
  {
    // these are custrecords with seconds!
    timeFormat : 'M/D/YYYY h:mm:ss a',

    // fields to be parsed on input
    fields: {
      'id'                          : 'int',
      'code'                        : 'string',
      'custrecord_createddate'      : 'timestamp',
      'custrecord_lastmodifieddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'coupons_id',
      'created_at',
      'updated_at',
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
      return core.Util.get(this.attrs, 'custrecord_createddate');
    },

    getUpdatedAtAttribute: function()
    {
      return core.Util.get(this.attrs, 'custrecord_lastmodifieddate');
    }
  });
})(core);
