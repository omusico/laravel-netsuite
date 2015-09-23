(function(core)
{
  core.GiftCertificateSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'          : 'int',
      'createddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    }
  });
})(core);
