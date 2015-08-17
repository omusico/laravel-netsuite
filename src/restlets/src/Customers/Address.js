(function(core)
{
  core.Address = core.Model.extend(
  {
    fields: {
      'id'        : 'int',
      'addressee' : 'string',
      'addr1'     : 'string',
      'addr2'     : 'string',
      'zip'       : 'string',
      'city'      : 'string',
      'state'     : 'string',
      'country'   : 'string'
    },

    visible: [
      'id',
      'entry_firstname',
      'entry_lastname',
      'entry_street_address',
      'entry_street_address_2',
      'entry_postcode',
      'entry_city',
      'entry_state',
      'entry_country'
    ],

    getEntryFirstnameAttribute: function()
    {
      return core.Util.get(core.Util.get(this.attrs, 'addressee', '').split(' '), '0', '');
    },

    getEntryLastnameAttribute: function()
    {
      return core.Util.get(core.Util.get(this.attrs, 'addressee', '').split(' '), '1', '');
    },

    getEntryStreetAddressAttribute: function()
    {
      return core.Util.get(this.attrs, 'addr1', '');
    },

    getEntryStreetAddress2Attribute: function()
    {
      return core.Util.get(this.attrs, 'addr2', '');
    },

    getEntryPostcodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'zip', '');
    },

    getEntryCityAttribute: function()
    {
      return core.Util.get(this.attrs, 'city', '');
    },

    getEntryStateAttribute: function()
    {
      return core.Util.get(this.attrs, 'state', '');
    },

    getEntryCountryAttribute: function()
    {
      return core.Util.get(this.attrs, 'country', '');
    },

    setEntryFirstnameAttribute: function(value)
    {
      var name = core.Util.get(this.attrs, 'addressee');
      if (name !== "") name = value + ' ' + name;
      return core.Util.set(this.attrs, 'addressee', name);
    },

    setEntryLastnameAttribute: function(value)
    {
      var name = core.Util.get(this.attrs, 'addressee');
      if (name !== "") name = name + ' ' + name;
      return core.Util.set(this.attrs, 'addressee', name);
    },

    setEntryStreetAddressAttribute: function(value)
    {
      return core.Util.set(this.attrs, 'addr1', value);
    },

    setEntryStreetAddress2Attribute: function(value)
    {
      return core.Util.set(this.attrs, 'addr2', value);
    },

    setEntryPostcodeAttribute: function(value)
    {
      return core.Util.set(this.attrs, 'zip', value);
    },

    setEntryCityAttribute: function(value)
    {
      return core.Util.set(this.attrs, 'city', value);
    },

    setEntryStateAttribute: function(value)
    {
      return core.Util.set(this.attrs, 'state', value);
    },

    setEntryCountryAttribute: function(value)
    {
      return core.Util.set(this.attrs, 'country', value);
    }
  });
})(core);
