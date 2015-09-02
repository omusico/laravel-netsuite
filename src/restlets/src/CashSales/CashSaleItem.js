(function(core)
{
  core.CashSaleItem = core.SalesOrderItem.extend(
  {
    fields: {
      'quantity' : 'int',   // quantity
      'rate'     : 'float', // price
      'amount'   : 'float', // line item price
      'taxcode'  : 'int',   // tax code
      'location' : 'int',
    }
  });
})(core);
