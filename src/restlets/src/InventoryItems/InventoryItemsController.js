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
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(inventoryItems.toHash());
    },

    show: function(datain)
    {
      var input     = new core.Input(datain);
      var validator = new core.Validator(input, {id: 'required'}, {products_id : 'required'});

      // return nlapiLoadRecord('inventoryitem', input.get('id'));

      if (validator.passes())
      {
        var inventoryItem = input.has('id') ? this.inventoryItems.find(input.get('id')) : this.inventoryItems.findByExternalId(input.get('products_id'));
        return inventoryItem ? this.okay(inventoryItem.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
