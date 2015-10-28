(function(core)
{
  core.PromotionRepository = core.Repository.extend(
  {
    recordClass: 'Promotion',
    searchClass: 'PromotionSearchResult',

    searchColumns: [
      'internalid',
      'externalid',
      'code',
      'custrecord_createddate',
      'custrecord_lastmodifieddate'
    ],

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      return results.map(function(result)
      {
        return new core[this.searchClass](result);
      }, this);
    },

    findByExternalId: function(code)
    {
      return this.where('code', 'is', code.toUpperCase()).first();
    },

    create: function(attrs)
    {
      var model = new core[this.recordClass](attrs, {mutate: true});
      var timeFormat = (new core.Promotion).timeFormat;
      model.set('custrecord_createddate', moment().format(timeFormat));
      model.set('custrecord_lastmodifieddate', moment().format(timeFormat));

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
      model.set('custrecord_lastmodifieddate', moment().format((new core.Promotion).timeFormat));

      // core.Log.debug('model', model.attrs);

      // this model might be missing some sublist ids
      model = core.Repository.prototype.update.call(this, model);

      // reload model so ids are set on sublists etc
      model = this.find(model.get('id'));

      return model;
    }
  });
})(core);
