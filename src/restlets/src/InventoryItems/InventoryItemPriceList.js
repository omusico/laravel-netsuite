(function(core)
{
  core.InventoryItemPriceList = core.Model.extend(
  {
    recordType: '',

    // fields to be parsed on input
    fields: {
      'currency'  : 'int',
      'pricelist' : 'object'
    },

    visible: [
      'pricelist',
      'currency_id',
      'currency_name'
    ],

    getPriceAttribute: function()
    {
      core.Log.debug('prices', core.Util.get(this.attrs, 'pricelist'));

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
