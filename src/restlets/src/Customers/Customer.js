(function(core)
{
  core.Customer = core.Model.extend(
  {
    visible: [
      'customers_id',
      'customers_firstname',
      'customers_lastname',
      'customers_telephone',
      'customers_email_address',
      'created_at',
      'updated_at',
      'addresses'
    ],

    fields: {
      'id'               : 'int',
      'firstname'        : 'string',
      'lastname'         : 'string',
      'phone'            : 'string',
      'email'            : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    sublists: {
      'addressbook': core.Address
    },

    getCustomersIdAttribute: function()
    {
      return this.attrs.id;
    },

    getCustomersFirstnameAttribute: function()
    {
      return this.attrs.firstname;
    },

    getCustomersLastnameAttribute: function()
    {
      return this.attrs.lastname;
    },

    getCustomersTelephoneAttribute: function()
    {
      return this.attrs.phone;
    },

    getCustomersEmailAddressAttribute: function()
    {
      return this.attrs.email;
    },

    getCreatedAtAttribute: function()
    {
      return this.attrs.datecreated;
    },

    getUpdatedAtAttribute: function()
    {
      return this.attrs.lastmodifieddate;
    }
  });
})(core);
