(function(core)
{
  core.Promotion = core.Model.extend(
  {
    recordType: 'promotioncode',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'name'             : 'string',
      'description'      : 'string',
      'discount'         : 'string',
      'discounttype'     : 'string',
      'usetype'          : 'string',
      'startdate'        : 'date',
      'enddate'          : 'date'
    },

    sublists: {
      'items' : 'InventoryItem'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'name',
      'description',
      'discount',
      'discounttype',
      'usetype',
      'startdate',
      'enddate',
      'codes',
      'items'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCodesAttribute: function()
    {
      return _.map(core.Util.get(this.attrs, 'code', []), function(code)
      {
        return code.toHash();
      }, this);
    },

    // getCouponsIdAttribute: function()
    // {
    //   return core.Util.get(this.attrs, 'code');
    // },

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    }
  });
})(core);
