(function(core)
{
  core.InventoryItemLocation = core.Model.extend(
  {
    recordType: '',

    // fields to be parsed on input
    fields: {
      'location_display'  : 'string',
      'quantityavailable' : 'int'
    },

    visible: [
      'name',
      'quantity'
    ],

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
