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
      'category'         : 'int',
      'pricelevel'       : 'int',
      'isperson'         : 'string',
      'taxable'          : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp',

      'custentity_rewards_balance' : 'int'
    },

    // sublists to be parsed on input
    sublists: {
      'addressbook' : 'Address'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'customers_id',
      'customers_firstname',
      'customers_lastname',
      'customers_telephone',
      'customers_email_address',
      'rewards_balance',
      'created_at',
      'updated_at',
      'addresses'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

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

    getRewardsBalanceAttribute: function()
    {
      return core.Util.get(this.attrs, 'custentity_rewards_balance', 0);
    },

    getCreatedAtAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'datecreated'), this.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'lastmodifieddate'), this.timeFormat);
    },

    getAddressesAttribute: function()
    {
      var addresses = core.Util.get(this.attrs, 'addressbook', []);

      return _.map(addresses, function(address)
      {
        return address.toHash();
      });
    },

    setNsIdAttribute: function(value)
    {
      if (value) core.Util.set(this.attrs, 'id', value);
    },

    setCustomersIdAttribute: function(value)
    {
      var externalid = parseInt(value) + '';
      core.Util.set(this.attrs, 'externalid', externalid);
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

    setRewardsBalanceAttribute: function(value)
    {
      core.Util.set(this.attrs, 'custentity_rewards_balance', parseInt(value));
    },

    setCreatedAtAttribute: function(value)
    {
      core.Util.set(this.attrs, 'datecreated', core.Util.formatDate(value, core.Util.timeFormat, this.timeFormat));
    },

    setUpdatedAtAttribute: function(value)
    {
      core.Util.set(this.attrs, 'lastmodifieddate', core.Util.formatDate(value, core.Util.timeFormat, this.timeFormat));
    },

    setAddressesAttribute: function(value)
    {
      var addresses = _.map(value, function(address)
      {
        var model = new core[this.sublists.addressbook](address, {mutate: true});
        return model;
      }, this);

      core.Util.set(this.attrs, 'addressbook', addresses);
    }
  });
})(core);
