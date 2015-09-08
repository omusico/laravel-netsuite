(function(core)
{
  core.CashSaleRepository = core.SalesOrderRepository.extend(
  {
    recordClass: core.CashSale,
    searchClass: core.CashSaleSearchResult
  });
})(core);
