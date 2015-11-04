(function(core)
{
  core.GiftCertificateRepository = core.Repository.extend(
  {
    recordClass: 'GiftCertificate',
    searchClass: 'GiftCertificateSearchResult',

    searchColumns: [
      'internalid',
      // 'externalid',
      'giftcertcode',
      'originalamount',
      'amountremaining',
      'expirationdate',
      'createddate',
      'custitemnumber_lastmodifieddate'
    ],

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      return results.map(function(result)
      {
        return new core[this.searchClass](result);
      }, this);
    },

    findByExternalId: function(giftcertcode)
    {
      return this.where('giftcertcode', 'is', giftcertcode.toUpperCase()).first();
    },

    create: function(attrs)
    {
      attrs.custitemnumber_lastmodifieddate = moment().format('M/D/YYYY h:mm:ss a');
      var model = new core[this.recordClass](attrs, {mutate: true});

      // call superclass
      model = core.Repository.prototype.create.call(this, model);

      // reload model as per usual
      model = this.find(model.get('id'));

      return model;
    },

    update: function(attrs)
    {
      var model = this.find(attrs.ns_id);
      if ( ! model) return false;
      attrs.custitemnumber_lastmodifieddate = moment().format('M/D/YYYY h:mm:ss a');
      model.set(attrs);

      // this model might be missing some sublist ids
      model = core.Repository.prototype.update.call(this, model);

      // reload model so ids are set on sublists etc
      model = this.find(model.get('id'));

      return model;
    }

  });
})(core);
