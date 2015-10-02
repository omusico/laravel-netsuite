(function(core)
{
  core.PromotionRepository = core.Repository.extend(
  {
    recordClass: 'Promotion',
    searchClass: 'PromotionSearchResult',

    searchColumns: [
      'internalid',
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
