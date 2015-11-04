(function(core)
{
  core.GiftCertificate = core.Model.extend(
  {
    recordType: 'giftcertificate',

    // these are custrecords with seconds!
    // timeFormat: 'M/D/YYYY h:mm:ss a',

    // fields to be parsed on input
    fields: {
      'id'                              : 'int',
      'externalid'                      : 'string',
      'giftcertcode'                    : 'string',
      'originalamount'                  : 'float',
      'amountremaining'                 : 'float',
      'expirationdate'                  : 'timestamp',
      'createddate'                     : 'timestamp',
      'lastmodifieddate'                : 'timestamp',
      'custitemnumber_lastmodifieddate' : 'string'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'gift_cards_code',
      'gift_cards_amount',
      'gift_cards_amount_remaining',
      'date_end',
      'date_added',
      'date_updated'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getGiftCardsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
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
      return core.Util.formatDate(core.Util.get(this.attrs, 'expirationdate'), this.timeFormat);
    },

    getDateAddedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'createddate'), this.timeFormat);
    },

    getDateUpdatedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'custitemnumber_lastmodifieddate'), 'M/D/YYYY h:mm:ss a');
    },

    // 'id'               : 'int',
    // 'ns_id',
    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    },

    // 'externalid'       : 'string',
    // 'gift_cards_id',
    setGiftCardsIdAttribute: function(value)
    {
      core.Util.set(this.attrs, 'externalid', value);
    },

    // 'giftcertcode'     : 'string',
    // 'gift_cards_code',
    setGiftCardsCodeAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'giftcertcode', value);
    },

    // 'originalamount'   : 'float',
    // 'gift_cards_amount',
    setGiftCardsAmountAttribute: function(value)
    {
      core.Util.set(this.attrs, 'originalamount', value);
    },

    // 'amountremaining'  : 'float',
    // 'gift_cards_amount_remaining',
    setGiftCardsAmountRemainingAttribute: function(value)
    {
      core.Util.set(this.attrs, 'amountremaining', value);
    },

    // 'expirationdate'   : 'timestamp',
    // 'date_end',
    setDateEndAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'expirationdate', value);
    },

    // 'createddate'      : 'timestamp',
    // 'date_added',
    setDateAddedAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'createddate', value);
    },

    // // 'lastmodifieddate' : 'timestamp'
    // // 'date_updated'
    // setDateUpdateddAttribute: function(value)
    // {
    //   // if (value) core.Util.set(this.attrs, 'custitemnumber_lastmodifieddate', core.Util.formatDate(value, 'M/D/YYYY h:mm:ss a', core.Util.timeFormat ));
    // },

  });
})(core);
