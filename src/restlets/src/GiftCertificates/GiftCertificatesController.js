(function(core)
{
  core.GiftCertificatesController = core.Controller.extend(
  {
    initialize: function()
    {
      this.giftCertificates = new core.GiftCertificateRepository();
    },

    index: function()
    {
      var giftCertificates = this.giftCertificates
                                 .filter(input.get('filters', []))
                                 .sort(input.get('sorts', []))
                                 .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(giftCertificates.toHash());
    },

    show: function()
    {
      // return nlapiLoadRecord('giftcertificate', input.get('ns_id'));

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

    store: function()
    {
      var validator = new core.Validator(input, {
        gift_cards_id               : 'required',
        gift_cards_code             : 'required',
        gift_cards_amount           : 'required',
        // gift_cards_amount_remaining : 'required'
      });

      if (validator.passes())
      {
        var attrs = _.defaults(input.only(
          // 'ns_id',
          'gift_cards_id',
          'gift_cards_code',
          'gift_cards_amount',
          'gift_cards_amount_remaining',
          'date_end'
          // 'date_added',
          // 'date_updated'
        ), {
          'gift_cards_amount_remaining' : input.get('gift_cards_amount')
        });

        try
        {
          var giftCertificate = this.giftCertificates.create(attrs);
          return this.created(giftCertificate.toHash());
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

    update: function()
    {

      var validator = new core.Validator(input, {ns_id: 'required'}) ;

      if (validator.passes())
      {
        // get what we need
        var attrs = input.only(
          'ns_id',
          'gift_cards_id',
          'gift_cards_code',
          'gift_cards_amount',
          'gift_cards_amount_remaining',
          'date_end'
          // 'date_added',
          // 'date_updated'
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
