(function(core)
{
  core.SalesOrderRepository = core.Repository.extend(
  {
    recordClass: 'SalesOrder',
    searchClass: 'SalesOrderSearchResult',

    searchColumns: [
      'externalid',
      'datecreated',
      'lastmodifieddate'
    ],

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      return results.map(function(result)
      {
        return new core[this.searchClass](result);
      }, this);
    },

    create: function(attrs)
    {
      var model = new core[this.recordClass](attrs, {mutate: true});

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
