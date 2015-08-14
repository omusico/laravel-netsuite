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
    }

    set
  });
})(core);

(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordType: 'customer',
    recordClass: core.Customer,

    byCategoryId: function(category_id)
    {
      return this.where('category', 'is', category_id);
    },

    lastModifiedAfter: function(date)
    {
      return this.where('lastmodifieddate', 'onorafter', date);
    }
  });
})(core);

(function(core)
{
  core.CustomersController = core.Controller.extend(
  {
    initialize: function()
    {
      this.customers = new core.CustomerRepository();
    },

    index: function(datain)
    {
      var input     = new core.Input(datain).parseDates().parseArrays();
      var validator = new core.Validator(input, []);

      if (validator.passes())
      {
        // return nlapiLoadRecord('customer', 9279);

        var customers = this.customers
                            .filter(input.get('filters', []))
                            .paginate(input.get('page', 1), input.get('per_page', 1000));

        return this.okay(customers.toHash());
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['id']);

      if (validator.passes())
      {
        // return nlapiLoadRecord('customer', 9279);

        var customer = this.customers.findByExternalId(input.get('id'));
        return customer ? this.okay(customer.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    store: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['first_name']);

      if (validator.passes())
      {
        var customer = this.customers.create(input.toHash());
        return this.created(customer.toHash());
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    update: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['id']);

      if (validator.passes())
      {
        var customer = this.customers.update(input.toHash());
        return this.okay(customer.toHash());
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    destroy: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['id']);

      if (validator.passes())
      {
        this.customers.destroy(input.get('id'));
        return this.okay([]);
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);

try
{
  new core.Router()
          .resource('customers', 'CustomersController')
          .start('customers', this);
}
catch (e)
{
  new core.Controller().internalServerError(e.message);
}
