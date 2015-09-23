(function(core)
{
  core.GiftCertificate = core.Model.extend(
  {
    recordType: 'giftcertificate',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'giftcertcode'     : 'string',
      'originalamount'   : 'float',
      'amountremaining'  : 'float',
      'expirationdate'   : 'timestamp',
      'createddate'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'created_at',
      'updated_at'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'createddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'lastmodifieddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    setNsIdAttribute: function(value)
    {
      core.Util.set(this.attrs, 'id', value);
    }
  });
})(core);

(function(core)
{
  core.GiftCertificateSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'          : 'int',
      'createddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    }
  });
})(core);

(function(core)
{
  core.GiftCertificateRepository = core.Repository.extend(
  {
    recordClass: core.GiftCertificate,
    searchClass: core.GiftCertificateSearchResult,

    searchColumns: [
      'createddate'
    ],

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      return results.map(function(result)
      {
        return new this.searchClass(result);
      }, this);
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
    }
  });
})(core);

(function(core)
{
  core.GiftCertificatesController = core.Controller.extend(
  {
    initialize: function()
    {
      this.giftCertificates = new core.GiftCertificateRepository();
    },

    index: function(datain)
    {
      var input            = new core.Input(datain).parseDates().parseArrays();
      var giftCertificates = this.giftCertificates
                               .filter(input.get('filters', []))
                               .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(giftCertificates.toHash());
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {ns_id: 'required'}, {gift_cards_id : 'required'});

      if (validator.passes())
      {
        try
        {
          var giftCertificate = input.has('ns_id')
                              ? this.giftCertificates.find(input.get('ns_id'))
                              : this.giftCertificates.findByExternalId(input.get('gift_cards_id'));

          return giftCertificate ? this.okay(giftCertificate.toHash()) : this.notFound();
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    },

    update: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {ns_id: 'required'});

      if (validator.passes())
      {
        // get what we need
        var attrs = input.only(
          'ns_id',
          'gift_cards_id'
        );

        try
        {
          var giftCertificate = this.giftCertificates.update(attrs);
          return this.okay(giftCertificate.toHash());
        }
        catch(e)
        {
          return this.internalServerError(e);
        }
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
