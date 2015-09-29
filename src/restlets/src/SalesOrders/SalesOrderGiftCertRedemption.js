(function(core)
{
  core.SalesOrderGiftCertRedemption = core.Model.extend(
  {
    recordType: 'giftcertredemption',

    fields: {
      'authcode'          : 'int',    // item id
      'authcode_display'  : 'string', // item id
      'authcodeapplied'   : 'float',  // quantity
    },

    visible: [
      'ns_id',
      'gift_cards_code',
      'authcodeapplied'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'authcode');
    },

    getGiftCardsCodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'authcode_display');
    },

    getAuthcodeappliedAttribute: function()
    {
      return core.Util.get(this.attrs, 'authcodeapplied');
    }
  });
})(core);
