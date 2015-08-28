(function(core)
{
  core.Customer = core.Model.extend(
  {
    recordType: 'customer',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string', // this must be a string or it will add a .0 to the end, you got me...
      'firstname'        : 'string',
      'lastname'         : 'string',
      'phone'            : 'string',
      'email'            : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp',
      'category'         : 'int',
      'pricelevel'       : 'int',
      'isperson'         : 'string',
      'taxable'          : 'string'
    },

    // sublists to be parsed on input
    sublists: {
      'addressbook' : core.Address
    },

    // fields to be parsed on output
    visible: [
      'id',
      'customers_id',
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
      var value = core.Util.get(this.attrs, 'datecreated');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'lastmodifieddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getAddressesAttribute: function()
    {
      var addresses = core.Util.get(this.attrs, 'addressbook', []);

      return _.map(addresses, function(address)
      {
        return address.toHash();
      });
    },

    setCustomersIdAttribute: function(value)
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

    setCreatedAtAttribute: function(value)
    {
      value = moment(value, core.Util.timeFormat).format(this.timeFormat);
      core.Util.set(this.attrs, 'datecreated', value);
    },

    setUpdatedAtAttribute: function(value)
    {
      value = moment(value, core.Util.timeFormat).format(this.timeFormat);
      core.Util.set(this.attrs, 'lastmodifieddate', value);
    },

    setAddressesAttribute: function(value)
    {
      var addresses = _.map(value, function(address)
      {
        var model = new this.sublists.addressbook(address, {mutate: true});
        return model;
      }, this);

      core.Util.set(this.attrs, 'addressbook', addresses);
    }
  });
})(core);
