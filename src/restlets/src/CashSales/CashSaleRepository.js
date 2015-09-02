(function(core)
{
  core.CashSaleRepository = core.SalesOrderRepository.extend(
  {
    recordClass: core.CachSale,
    searchClass: core.CachSaleSearchResult,
  });
})(core);
