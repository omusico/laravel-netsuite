try
{
  new core.Router()
          .resource('promotions', 'PromotionsController')
          .start('promotions', this);
}
catch (e)
{
  new core.Controller().internalServerError(e);
}
