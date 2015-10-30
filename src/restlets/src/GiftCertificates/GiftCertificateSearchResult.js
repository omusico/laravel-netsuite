(function(core)
{
  core.GiftCertificateSearchResult = core.Model.extend(
  {

    // these are custrecords with seconds!
    timeFormat : 'M/D/YYYY h:mm:ss a',

    // fields to be parsed on input
    fields: {
      'id'                              : 'int',
      'giftcertcode'                    : 'string',
      'createddate'                     : 'timestamp',
      'custitemnumber_lastmodifieddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'gift_cards_code',
      'date_added',
      'date_updated'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getGiftCardsCodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'giftcertcode');
    },

    getDateAddedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'createddate'), this.timeFormat);
    },

    getDateUpdatedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'custitemnumber_lastmodifieddate'), this.timeFormat);
    }
  });

})(core);
