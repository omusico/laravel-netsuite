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
      // return nlapiLoadRecord('promotioncode', input.get('ns_id'));

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
        coupons_id              : 'required',
        coupons_discount_type   : 'required',
        coupons_discount_amount : 'required'
      });

      if (validator.passes())
      {
        var attrs = _.defaults(input.only(
          // 'ns_id',
          'coupons_id',
          'coupons_categories_id',
          'coupons_description',
          'coupons_discount_type',
          'coupons_discount_amount',
          // 'coupons_max_use',
          // 'coupons_number_available',
          'coupons_min_order_type',
          'coupons_min_order',
          'coupons_date_start',
          'coupons_date_end',
          'coupons_full_price',
          // 'created_at',
          // 'updated_at',
          'coupons_products'
        ), {
          'coupons_full_price' : 0,
          'discount'           : 3466 // Customer Accommodation
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
          'ns_id',
          'coupons_id',
          'coupons_categories_id',
          'coupons_description',
          'coupons_discount_type',
          'coupons_discount_amount',
          // 'coupons_max_use',
          // 'coupons_number_available',
          'coupons_min_order_type',
          'coupons_min_order',
          'coupons_date_start',
          'coupons_date_end',
          'coupons_full_price',
          // 'created_at',
          // 'updated_at',
          'coupons_products'
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
