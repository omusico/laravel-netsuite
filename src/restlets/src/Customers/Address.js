(function(core)
{
  core.Address = core.Model.extend(
  {
    visible: [
      'id',
      'entry_street_address',
      'entry_street_address_2',
      'entry_postcode',
      'entry_city',
      'entry_state',
      'entry_country'
    ],

    fields: {
      'id'                   : 'int',
      'addr1_initialvalue'   : 'string',
      'addr2_initialvalue'   : 'string',
      'zip_initialvalue'     : 'string',
      'city_initialvalue'    : 'string',
      'state_initialvalue'   : 'string',
      'country_initialvalue' : 'string'
    },

    getEntryStreetAddressAttribute: function()
    {
      return this.attrs.addr1_initialvalue;
    },

    getEntryStreetAddress2Attribute: function()
    {
      return this.attrs.addr2_initialvalue;
    },

    getEntryPostcodeAttribute: function()
    {
      return this.attrs.zip_initialvalue;
    },

    getEntryCityAttribute: function()
    {
      return this.attrs.city_initialvalue;
    },

    getEntryStateAttribute: function()
    {
      return this.attrs.state_initialvalue;
    },

    getEntryCountryAttribute: function()
    {
      return this.attrs.country_initialvalue;
    }
  });
})(core);
