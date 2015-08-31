(function(core)
{
  core.InventoryItemPriceList = core.Model.extend(
  {
    recordType: '',

    // fields to be parsed on input
    // fields: {
    //   'currency'  : 'object',
    //   'pricelist' : 'object'
    // },

    visible: [
      'pricelist',
      'currency_id',
      'currency_name'
    ],

    getPricelistAttribute: function()
    {
      core.Log.debug('prices', this.attrs);

      return core.Util.get(this.attrs, 'pricelist');
    },

    getCurrencyIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'currency.internalid');
    },

    getCurrencyNameAttribute: function()
    {
      return core.Util.get(this.attrs, 'currency.name');
    }
  });
})(core);
