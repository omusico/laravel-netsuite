(function(core)
{
  core.CouponsController = core.Controller.extend(
  {
    initialize: function()
    {
      this.coupons = new core.CouponRepository();
    },

    index: function()
    {
      var coupons = this.coupons
                        .filter(input.get('filters', []))
                        .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(coupons.toHash());
    },

    show: function()
    {
      var validator = new core.Validator(input, {ns_id: 'required'}, {coupons_id : 'required'});

      if (validator.passes())
      {
        try
        {
          var coupon = input.has('ns_id')
                        ? this.coupons.find(input.get('ns_id'))
                        : this.coupons.findByExternalId(input.get('coupons_id'));

          return coupon ? this.okay(coupon.toHash()) : this.notFound();
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
      var validator = new core.Validator(input, {ns_id: 'required'});

      if (validator.passes())
      {
        // get what we need
        var attrs = input.only(
          'ns_id'
        );

        try
        {
          var coupon = this.coupons.update(attrs);
          return this.okay(coupon.toHash());
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
