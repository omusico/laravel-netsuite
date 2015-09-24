(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordClass: core.Customer,
    searchClass: core.CustomerSearchResult,

    searchColumns: [
      'externalid',
      'datecreated',
      'lastmodifieddate'
    ],

    // scopes

    byCategoryId: function(category_id)
    {
      return this.where('category', 'is', category_id);
    },

    lastModifiedOnOrAfter: function(date)
    {
      return this.where('lastmodifieddate', 'onorafter', date);
    },

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      var models = results.map(function(result)
      {
        return new this.searchClass(result);
      }, this);

      return models;
    },

    create: function(attrs)
    {
      var model = new this.recordClass(attrs, {mutate: true});

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

      // this model might be missing some sublist ids
      model = core.Repository.prototype.update.call(this, model);

      // reload model so ids are set on sublists etc
      model = this.find(model.get('id'));

      return model;
    },

    destroy: function(id)
    {
      var model = this.find(id);
      if ( ! model) return false;
      return core.Repository.prototype.destroy.call(this, model);
    },

    destroyByExternalId: function(external_id)
    {
      var model = this.findByExternalId(external_id);
      if ( ! model) return false;
      return core.Repository.prototype.destroy.call(this, model);
    }
  });
})(core);
