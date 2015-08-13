(function(core)
{
  core.Address = core.Model.extend(
  {
    fields: {
      'id'                      : 'int',
      'addressee_initialvalue'  : 'string',
      'addr1_initialvalue'      : 'string',
      'addr2_initialvalue'      : 'string',
      'zip_initialvalue'        : 'string',
      'city_initialvalue'       : 'string',
      'state_initialvalue'      : 'string',
      'country_initialvalue'    : 'string'
    },

    visible: [
      'id',
      'name',
      'street_address',
      'street_address_2',
      'postcode',
      'city',
      'state',
      'country'
    ],

    getNameAttribute: function()
    {
      return core.Util.get(this.attrs, 'addressee_initialvalue', '');
    },

    getStreetAddressAttribute: function()
    {
      return core.Util.get(this.attrs, 'addr1_initialvalue', '');
    },

    getStreetAddress2Attribute: function()
    {
      return core.Util.get(this.attrs, 'addr2_initialvalue', '');
    },

    getPostcodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'zip_initialvalue', '');
    },

    getCityAttribute: function()
    {
      return core.Util.get(this.attrs, 'city_initialvalue', '');
    },

    getStateAttribute: function()
    {
      return core.Util.get(this.attrs, 'state_initialvalue', '');
    },

    getCountryAttribute: function()
    {
      return core.Util.get(this.attrs, 'country_initialvalue', '');
    }
  });
})(core);
