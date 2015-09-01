(function(core)
{
  core.InventoryItemLocation = core.Model.extend(
  {
    recordType: '',

    // fields to be parsed on input
    fields: {
      'locationid'        : 'int',
      'location_display'  : 'string',
      'quantityavailable' : 'int'
    },

    visible: [
      'ns_id',
      'name',
      'quantity'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'locationid');
    },

    getNameAttribute: function()
    {
      return core.Util.get(this.attrs, 'location_display');
    },

    getQuantityAttribute: function()
    {
      return core.Util.get(this.attrs, 'quantityavailable');
    },
  });
})(core);
