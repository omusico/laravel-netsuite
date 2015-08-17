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

(function(core)
{
  core.Customer = core.Model.extend(
  {
    recordType: 'customer',

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
      return core.Util.get(this.attrs, 'datecreated');
    },

    getUpdatedAtAttribute: function()
    {
      return core.Util.get(this.attrs, 'lastmodifieddate');
    },

    getAddressesAttribute: function()
    {
      var addresses = core.Util.get(this.attrs, 'addressbook', []);
      return _.map(addresses, function(address) { return address.toHash(); });
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

(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordClass: core.Customer,

    // scopes

    byCategoryId: function(category_id)
    {
      return this.where('category', 'is', category_id);
    },

    lastModifiedAfter: function(date)
    {
      return this.where('lastmodifieddate', 'onorafter', date);
    },

    create: function(attrs)
    {
      var model = new this.recordClass();
      model.set(attrs);
      return core.Repository.prototype.create.call(this, model);
    },

    destroy: function(id)
    {
      var model = this.find(id);
      if ( ! model) return false;
      return core.Repository.prototype.destroy.call(this, model);
    },

    destroyByExternalId: function(external_id)
    {
      var model = this.findByExternalId(external_id);
      if ( ! model) return false;
      return core.Repository.prototype.destroy.call(this, model);
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
      var customers = this.customers
                          .filter(input.get('filters', []))
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(customers.toHash());
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {id: 'required'}, {customers_id : 'required'});

      if (validator.passes())
      {
        // return nlapiLoadRecord('customer', 9279);

        var customer = input.has('id') ? this.customers.find(input.get('id')) : this.customers.findByExternalId(input.get('customers_id'));
        return customer ? this.okay(customer.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    store: function(datain)
    {
      var input = new core.Input(datain).parseArrays();

      var validator = new core.Validator(input, {
        // 'customers_id'           : 'required',
        'customers_firstname'    : 'required',
        'customers_lastname'     : 'required',
        'customers_telephone'    : 'required',
        'customers_email_address': 'required'
      });

      if (validator.passes())
      {
        // set defaults
        var attrs = _.defaults(input.only(
          'customers_id',
          'customers_firstname',
          'customers_lastname',
          'customers_telephone',
          'customers_email_address',
          'addresses'
        ), {
          category:   3,   // Retail
          pricelevel: 5,   // Retail Pricing
          isperson:   'T', // Individual
          taxable:    'T'  // Taxable
        });

        var customer = this.customers.create(attrs);

        return this.created(customer.toHash());
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    update: function(datain)
    {
      // var input     = new core.Input(datain);
      // var validator = new core.Validator(input);
      //
      // if (validator.passes())
      // {
      //   var customer = this.customers.update(input.toHash());
      //   return this.okay(customer.toHash());
      // }
      // else
      // {
      //   return this.badRequest(validator.toHash());
      // }
    },

    destroy: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {id: 'required'}, {customers_id : 'required'});

      if (validator.passes())
      {
        try
        {
          var success = input.has('id') ?
                        this.customers.destroy(input.get('id')) :
                        this.customers.destroyByExternalId(input.get('customers_id'));

          // returns are ignored for delete requests?
          // return success ? this.okay([]) : this.notFound();
        }
        catch(e)
        {
          // returns are ignored for delete requests?
          this.internalServerError(e);
        }
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
