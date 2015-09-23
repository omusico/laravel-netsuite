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
