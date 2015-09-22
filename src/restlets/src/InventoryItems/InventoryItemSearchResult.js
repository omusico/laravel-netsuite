(function(core)
{
  core.InventoryItemSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'         : 'int',
      'externalid' : 'string',
      'created'    : 'timestamp',
      'modified'   : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'product_legacy_id',
      'created_at',
      'updated_at'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getProductLegacyIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'created');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'modified');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    }
  });
})(core);
