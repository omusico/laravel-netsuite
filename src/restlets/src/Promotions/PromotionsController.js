(function(core)
{
  core.PromotionsController = core.Controller.extend(
  {
    initialize: function()
    {
      this.promotions = new core.PromotionRepository();
    },

    index: function()
    {
      var promotions = this.promotions
                           .filter(input.get('filters', []))
                           .sort(input.get('sorts', []))
                           .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(promotions.toHash());
    },

    show: function()
    {
      return nlapiLoadRecord('promotioncode', input.get('ns_id'));

      var validator = new core.Validator(input, {ns_id: 'required'}, {coupons_id : 'required'});

      if (validator.passes())
      {
        try
        {
          var promotion = input.has('ns_id')
                        ? this.promotions.find(input.get('ns_id'))
                        : this.promotions.findByExternalId(input.get('coupons_id'));

          return promotion ? this.okay(promotion.toHash()) : this.notFound();
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
        coupons_id : 'required'
      });

      if (validator.passes())
      {
        var attrs = _.defaults(input.only(
          'coupons_id',
          'coupons_discount_type',
          'coupons_discount_amount'
        ), {
          'discount': 3466 // Customer Accommodation
        });

        try
        {
          var promotion = this.promotions.create(attrs);

          return this.created(promotion.toHash());
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
      var validator = new core.Validator(input, {ns_id: 'required'});

      if (validator.passes())
      {
        var attrs = input.only(
          'ns_id'
        );

        try
        {
          var promotion = this.promotions.update(attrs);
          return this.okay(promotion.toHash());
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
