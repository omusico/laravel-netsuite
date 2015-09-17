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
      'lastmodifieddate' : 'timestamp'
    },

    // sublists to be parsed on input
    sublists: {
      'addressbook' : core.Address
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'customers_id',
      'customers_firstname',
      'customers_lastname',
      'customers_telephone',
      'customers_email_address',
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

    setNsIdAttribute: function(value)
    {
      core.Util.set(this.attrs, 'id', value);
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

(function(core)
{
  core.CustomerSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'customers_id',
      'created_at',
      'updated_at'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCustomersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'datecreated');
      var date = moment(value, this.timeFormat).format(core.Util.timeFormat);
      date = date != 'Invalid date' ? date : null;
      return date;
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'lastmodifieddate');
      var date = moment(value, this.timeFormat).format(core.Util.timeFormat);
      date = date != 'Invalid date' ? date : null;
      return date;
    }
  });
})(core);

(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordClass: core.Customer,
    searchClass: core.CustomerSearchResult,

    searchColumns: [
      'externalid',
      'datecreated',
      'lastmodifieddate'
    ],

    // scopes

    byCategoryId: function(category_id)
    {
      return this.where('category', 'is', category_id);
    },

    lastModifiedOnOrAfter: function(date)
    {
      return this.where('lastmodifieddate', 'onorafter', date);
    },

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      return results.map(function(result)
      {
        return new this.searchClass(result);
      }, this);
    },

    create: function(attrs)
    {
      var model = new this.recordClass(attrs, {mutate: true});

      // this model will have id set on it, but might be missing some sublist ids
      model = core.Repository.prototype.create.call(this, model);

      // reload model so ids are set on sublists etc
      model = this.find(model.get('id'));

      return model;
    },

    update: function(attrs)
    {
      var model = this.find(attrs.ns_id);

      if ( ! model) return false;
      model.set(attrs);

      // this model might be missing some sublist ids
      model = core.Repository.prototype.update.call(this, model);

      // reload model so ids are set on sublists etc
      model = this.find(model.get('id'));

      return model;
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
                          .orderBy('lastmodifieddate', 'ASC')
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(customers.toHash());
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {ns_id: 'required'}, {customers_id : 'required'});

      if (validator.passes())
      {
        var customer = input.has('ns_id') ? this.customers.find(input.get('ns_id')) : this.customers.findByExternalId(input.get('customers_id'));
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
        customers_id           : 'required',
        customers_firstname    : 'required',
        customers_lastname     : 'required',
        customers_telephone    : 'required',
        customers_email_address: 'required'
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
          category  : 3,   // Retail
          pricelevel: 5,   // Retail Pricing
          isperson  : 'T', // Individual
          taxable   : 'T'  // Taxable
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
      var input     = new core.Input(datain).parseArrays();
      var validator = new core.Validator(input, {
        ns_id                  : 'required',
        // customers_id           : 'required',
        // customers_firstname    : 'required',
        // customers_lastname     : 'required',
        // customers_telephone    : 'required',
        // customers_email_address: 'required'
      });
      if (validator.passes())
      {
        // get what we need
        var attrs = input.only(
          'ns_id',
          'customers_id',
          'customers_firstname',
          'customers_lastname',
          'customers_telephone',
          'customers_email_address',
          'addresses'
        );

        try
        {
          var customer = this.customers.update(attrs);
        }
        catch(e)
        {
          return this.internalServerError(e);
        }

        return this.okay(customer.toHash());
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    // destroy: function(datain)
    // {
    //   var input     = new core.Input(datain);
    //   var validator = new core.Validator(input, {ns_id: 'required'}, {customers_id : 'required'});
    //
    //   if (validator.passes())
    //   {
    //     try
    //     {
    //       var success = input.has('ns_id') ?
    //                     this.customers.destroy(input.get('ns_id')) :
    //                     this.customers.destroyByExternalId(input.get('customers_id'));
    //
    //       // returns are ignored for delete requests?
    //       // return success ? this.okay([]) : this.notFound();
    //     }
    //     catch(e)
    //     {
    //       // return this.internalServerError(e); // returns are ignored for delete requests?
    //       this.internalServerError(e);
    //     }
    //   }
    //   else
    //   {
    //     // return this.badRequest(validator.toHash()); // returns are ignored for delete requests?
    //     this.badRequest(validator.toHash());
    //   }
    // }
  });
})(core);
