try
{
  new core.Router()
          .resource('gift_certificates', 'GiftCertificatesController')
          .start('gift_certificates', this);
}
catch (e)
{
  new core.Controller().internalServerError(e);
}
