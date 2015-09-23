(function(core)
{
  core.Promotion = core.Model.extend(
  {
    recordType: 'promotioncode',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'code'             : 'string',
      'description'      : 'string',
      'discount'         : 'float',
      'discounttype'     : 'string',
      'usetype'          : 'string',
      'startdate'        : 'timestamp',
      'enddate'          : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'coupons_id'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCouponsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'code');
    },

    // getCreatedAtAttribute: function()
    // {
    //   var value = core.Util.get(this.attrs, 'createddate');
    //   return moment(value, this.timeFormat).format(core.Util.timeFormat);
    // },
    //
    // getUpdatedAtAttribute: function()
    // {
    //   var value = core.Util.get(this.attrs, 'lastmodifieddate');
    //   return moment(value, this.timeFormat).format(core.Util.timeFormat);
    // },

    setNsIdAttribute: function(value)
    {
      core.Util.set(this.attrs, 'id', value);
    }
  });
})(core);

(function(core)
{
  core.PromotionSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'         : 'int',
      'externalid' : 'string',
      'code'       : 'string'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'coupons_id'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getCouponsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'code');
    }
  });
})(core);

(function(core)
{
  core.PromotionRepository = core.Repository.extend(
  {
    recordClass: core.Promotion,
    searchClass: core.PromotionSearchResult,

    searchColumns: [
      'externalid',
      'code'
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
  core.PromotionsController = core.Controller.extend(
  {
    initialize: function()
    {
      this.promotions = new core.PromotionRepository();
    },

    index: function(datain)
    {
      var input      = new core.Input(datain).parseDates().parseArrays();
      var promotions = this.promotions
                               .filter(input.get('filters', []))
                              //  .orderBy('lastmodifieddate', 'ASC')
                               .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(promotions.toHash());
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
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

    update: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {ns_id: 'required'});

      if (validator.passes())
      {
        // get what we need
        var attrs = input.only(
          'ns_id',
          'coupons_id'
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
