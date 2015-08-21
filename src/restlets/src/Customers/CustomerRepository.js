(function(core)
{
  core.CustomerRepository = core.Repository.extend(
  {
    recordClass: core.Customer,

    // scopes

    byCategoryId: function(category_id)
    {
      return this.where('category', 'is', category_id);
    },

    lastModifiedAfter: function(date)
    {
      return this.where('lastmodifieddate', 'onorafter', date);
    },

    create: function(attrs)
    {
      var model = new this.recordClass();
      model.set(attrs);
      // return model.toNewRecord();
      return core.Repository.prototype.create.call(this, model);
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
