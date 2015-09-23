(function(core)
{
  core.InventoryItemsController = core.Controller.extend(
  {
    initialize: function()
    {
      this.inventoryItems = new core.InventoryItemRepository();
    },

    index: function(datain)
    {
      var input          = new core.Input(datain).parseDates().parseArrays();
      var inventoryItems = this.inventoryItems
                               .filter(input.get('filters', []))
                               .orderBy('lastmodifieddate', 'ASC')
                               .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(inventoryItems.toHash());
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {ns_id: 'required'}, {product_legacy_id : 'required'});

      if (validator.passes())
      {
        try
        {
          var inventoryItem = input.has('ns_id')
                            ? this.inventoryItems.find(input.get('ns_id'))
                            : this.inventoryItems.findByExternalId(input.get('product_legacy_id'));

          return inventoryItem ? this.okay(inventoryItem.toHash()) : this.notFound();
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
          'product_legacy_id'
        );

        try
        {
          var inventoryItem = this.inventoryItems.update(attrs);
          return this.okay(inventoryItem.toHash());
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
