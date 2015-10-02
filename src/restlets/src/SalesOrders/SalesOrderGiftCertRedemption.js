(function(core)
{
  core.SalesOrderGiftCertRedemption = core.Model.extend(
  {
    recordType: 'giftcertredemption',

    // fields to be parsed on input
    fields: {
      'authcode'             : 'int',
      'externalid'           : 'string',
      'authcode_display'     : 'string',
      "authcodeamtremaining" : 'float',
      "authcodeapplied"      : 'float',
      "giftcertavailable"    : 'float'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      // 'gift_cards_id',
      'gift_cards_code',
      'gift_cards_amount',
      'gift_cards_amount_remaining'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'authcode');
    },

    getGiftCardsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getGiftCardsCodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'authcode_display');
    },

    getGiftCardsAmountAttribute: function()
    {
      return core.Util.get(this.attrs, 'giftcertavailable');
    },

    getGiftCardsAmountRemainingAttribute: function()
    {
      return core.Util.get(this.attrs, 'authcodeamtremaining');
    }
  });
})(core);
