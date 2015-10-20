(function(core)
{
  core.PromotionItem = core.Model.extend(
  {
    // these are custrecords with seconds!
    timeFormat : 'M/D/YYYY h:mm:ss a',

    // fields to be parsed on input
    fields: {
      'item' : 'int',
    },

    // fields to be parsed on output
    visible: [
      'ns_id'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'item');
    }

  });
})(core);
