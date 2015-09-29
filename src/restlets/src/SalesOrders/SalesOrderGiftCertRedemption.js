(function(core)
{
  core.SalesOrderGiftCertRedemption = core.Model.extend(
  {
    recordType: 'giftcertredemption',

    fields: {
      // 'gift_certificate_code': 'string',
      'authcode'             : 'int',    // item id
      // 'name'                 : 'string', // item id
      'authcodeamtremaining' : 'float',  // quantity
      'authcodeapplied'      : 'float',  // price
      'giftcertavailable'    : 'float'   // line item price
    },

    visible: [
      'ns_id',
      'gift_cards_code',
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'authcode');
    },

    getGiftCardsCodeAttribute: function()
    {
      return JSON.stringify(this.attrs);
    },
  });
})(core);
