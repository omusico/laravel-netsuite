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
      'customers_id',
      'customers_external_id',
      'customers_firstname',
      'customers_lastname',
      'customers_telephone',
      'customers_email_address',
      'created_at',
      'updated_at',
      'addresses'
    ],

    getCustomersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCustomersExternalIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCustomersFirstnameAttribute: function()
    {
      return core.Util.get(this.attrs, 'firstname', '');
    },

    getCustomersLastnameAttribute: function()
    {
      return core.Util.get(this.attrs, 'lastname', '');
    },

    getCustomersTelephoneAttribute: function()
    {
      return core.Util.get(this.attrs, 'phone', '');
    },

    getCustomersEmailAddressAttribute: function()
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
    },

    setCustomersIdAttribute: function(value)
    {
      core.Util.set(this.attrs, 'id', value);
    },

    setCustomersExternalIdAttribute: function(value)
    {
      core.Util.set(this.attrs, 'externalid', value);
    },

    setCustomersFirstnameAttribute: function(value)
    {
      core.Util.set(this.attrs, 'firstname', value);
    },

    setCustomersLastnameAttribute: function(value)
    {
      core.Util.set(this.attrs, 'lastname', value);
    },

    setCustomersTelephoneAttribute: function(value)
    {
      core.Util.set(this.attrs, 'phone', value + '');
    },

    setCustomersEmailAddressAttribute: function(value)
    {
      core.Util.set(this.attrs, 'email', value);
    },

    setCustomersCategoryIdAttribute: function(value)
    {
      core.Util.set(this.attrs, 'category', value);
    }
  });
})(core);
