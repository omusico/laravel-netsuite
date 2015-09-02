(function(core)
{
  core.CashSale = core.SalesOrder.extend(
  {
    recordType: 'cashsale',

    sublists: {
      item: core.CashSaleItem
    }
  });
})(core);
