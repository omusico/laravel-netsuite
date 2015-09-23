(function(core)
{
  core.GiftCertificateSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'giftcertcode'     : 'string',
      'originalamount'   : 'float',
      'amountremaining'  : 'float',
      'expirationdate'   : 'timestamp',
      'createddate'      : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'gift_cards_code',
      'gift_cards_amount',
      'gift_cards_amount_remaining',
      'date_end',
      'date_added'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getGiftCardsCodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'giftcertcode');
    },

    getGiftCardsAmountAttribute: function()
    {
      return core.Util.get(this.attrs, 'originalamount');
    },

    getGiftCardsAmountRemainingAttribute: function()
    {
      return core.Util.get(this.attrs, 'amountremaining');
    },

    getDateEndAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'expirationdate'), this.timeFormat)
    },

    getDateAddedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'createddate'), this.timeFormat)
    }
  });
})(core);
