(function(core)
{
  core.InventoryItemSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    // fields: {
    //   'id'               : 'int',
    //   'externalid'       : 'string',
    //   'datecreated'      : 'timestamp',
    //   'lastmodifieddate' : 'timestamp'
    // },

    // fields to be parsed on output
    // visible: [
    //   'id',
    //   'customers_id',
    //   'created_at',
    //   'updated_at'
    // ],

    // getCustomersIdAttribute: function()
    // {
    //   return core.Util.get(this.attrs, 'externalid');
    // },
    //
    // getCreatedAtAttribute: function()
    // {
    //   var value = core.Util.get(this.attrs, 'datecreated');
    //   return moment(value, this.timeFormat).format('YYYY-MM-DD HH:mm:ss');
    // },
    //
    // getUpdatedAtAttribute: function()
    // {
    //   var value = core.Util.get(this.attrs, 'lastmodifieddate');
    //   return moment(value, this.timeFormat).format('YYYY-MM-DD HH:mm:ss');
    // }
  });
})(core);
