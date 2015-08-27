(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordClass: core.Customer,

    searchColumns: [
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

    create: function(attrs)
    {
      var model = new this.recordClass(attrs, {mutate: true});
      return core.Repository.prototype.create.call(this, model);
    },

    update: function(attrs)
    {
      var model = this.find(attrs.id);
      if ( ! model) return false;
      model.set(attrs);
      return core.Repository.prototype.update.call(this, model);
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
