(function(core)
{
  core.Customer = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'int',
      'firstname'        : 'string',
      'lastname'         : 'string',
      'phone'            : 'string',
      'email'            : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    // sublists to be parsed on input
    sublists: {
      'addressbook': core.Address
    },

    // fields to be parsed on output
    visible: [
      'id',
      'external_id',
      'firstname',
      'lastname',
      'telephone',
      'email_address',
      'created_at',
      'updated_at',
      'addresses'
    ],

    getIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getExternalIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getFirstnameAttribute: function()
    {
      return core.Util.get(this.attrs, 'firstname', '');
    },

    getLastnameAttribute: function()
    {
      return core.Util.get(this.attrs, 'lastname', '');
    },

    getTelephoneAttribute: function()
    {
      return core.Util.get(this.attrs, 'phone', '');
    },

    getEmailAddressAttribute: function()
    {
      return core.Util.get(this.attrs, 'email', '');
    },

    getCreatedAtAttribute: function()
    {
      return core.Util.get(this.attrs, 'datecreated');
    },

    getUpdatedAtAttribute: function()
    {
      return core.Util.get(this.attrs, 'lastmodifieddate');
    },

    getAddressesAttribute: function()
    {
      return core.Util.get(this.attrs, 'addressbook');
    }
  });
})(core);
