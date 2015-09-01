(function(core)
{
  core.SalesOrder = core.Model.extend(
  {
    recordType: 'salesorder',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'orders_id'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getOrdersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'createddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'lastmodifieddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    }
  });
})(core);
