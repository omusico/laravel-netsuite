(function(core)
{
  core.GiftCertificateRepository = core.Repository.extend(
  {
    recordClass: core.GiftCertificate,
    searchClass: core.GiftCertificateSearchResult,

    searchColumns: [
      // 'externalid',
      'giftcertcode',
      'originalamount',
      'amountremaining',
      'expirationdate',
      'createddate'
      // 'lastmodifieddate'
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
