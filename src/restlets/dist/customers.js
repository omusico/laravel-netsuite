(function(core)
{
  core.Address = core.Model.extend(
  {
    visible: [
      'id'
    ],

    fields: {
      'id' : 'int'
    }
  });
})(core);

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

(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordType: 'customer',
    recordClass: core.Customer
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
      var input = new core.Input(datain);
      return this.customers.paginate(input.page, input.per_page);
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['id']);

      if (validator.passes()) {
        var customer = this.customers.findByExternalId(input.get('id'));
        return customer ? customer.toHash() : this.notFound();
      } else {
        return this.badRequest(validator.toHash());
      }
    },

    store: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['firstName']);

      if (validator.passes()) {
        var customer = this.customers.create(input.toHash());
        return customer.toJSON();
      } else {
        return this.badRequest(validator.toHash());
      }
    },

    update: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['id']);

      if (validator.passes()) {
        var customer = this.customers.update(input.toHash());
        return customer.toJSON();
      } else {
        return this.badRequest(validator.toHash());
      }
    },

    destroy: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, ['id']);

      if (validator.passes()) {
        this.customers.destroy(input.get('id'));
        return '[]';
      } else {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);

try
{
  new core.Router().resource('customers', 'CustomersController').start('customers', this);
}
catch (e)
{
  new core.Controller().internalServerError(e.message);
}
