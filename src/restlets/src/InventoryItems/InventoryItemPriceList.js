(function(core)
{
  core.InventoryItemPriceList = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'pricelevel'     : 'int',
      'pricelevelname' : 'object',
      'price_1_'       : 'float',
      'currency'       : 'int'
    },

    // matrices: [
    //   'currency',
    //   'price'
    // ],

    visible: [
      'ns_id',
      'price_list_name',
      'price',
      'currency_id',
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'pricelevel');
    },

    getPriceListNameAttribute: function()
    {
      return core.Util.get(this.attrs, 'pricelevelname');
    },

    getPriceAttribute: function()
    {
      return core.Util.get(this.attrs, 'price_1_');
    },

    getCurrencyIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'currency');
    }
  });
})(core);
