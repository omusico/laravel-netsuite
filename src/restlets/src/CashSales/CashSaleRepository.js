(function(core)
{
  core.CashSaleRepository = core.SalesOrderRepository.extend(
  {
    recordClass: 'CashSale',
    searchClass: 'CashSaleSearchResult'
  });
})(core);
