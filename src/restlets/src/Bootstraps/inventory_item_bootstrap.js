try
{
  new core.Router()
          .resource('inventoryItems', 'InventoryItemsController')
          .start('inventoryItems', this);
}
catch (e)
{
  new core.Controller().internalServerError(e.message);
}
