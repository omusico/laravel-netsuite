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
      'ns_id',
      'entry_firstname',
      'entry_lastname',
      'entry_street_address',
      'entry_street_address_2',
      'entry_postcode',
      'entry_city',
      'entry_state',
      'entry_country'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getEntryFirstnameAttribute: function()
    {
      return core.Util.get(core.Util.get(this.attrs, 'addressee', '').split(' '), '0', '');
    },

    getEntryLastnameAttribute: function()
    {
      return _.rest(core.Util.get(this.attrs, 'addressee', '').split(' ')).join(' ');
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

    setNsIdAttribute: function(value)
    {
      core.Util.set(this.attrs, 'id', value);
    },

    setEntryAddresseeAttribute: function(value)
    {
      core.Util.set(this.attrs, 'addressee', value);
    },

    setEntryStreetAddressAttribute: function(value)
    {
      core.Util.set(this.attrs, 'addr1', value);
    },

    setEntryStreetAddress2Attribute: function(value)
    {
      core.Util.set(this.attrs, 'addr2', value);
    },

    setEntryPostcodeAttribute: function(value)
    {
      core.Util.set(this.attrs, 'zip', value);
    },

    setEntryCityAttribute: function(value)
    {
      core.Util.set(this.attrs, 'city', value);
    },

    setEntryStateAttribute: function(value)
    {
      core.Util.set(this.attrs, 'state', value);
    },

    setEntryCountryAttribute: function(value)
    {
      core.Util.set(this.attrs, 'country', value);
    }
  });
})(core);
