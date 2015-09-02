(function(core)
{
  core.SalesOrderItem = core.Model.extend(
  {
    recordType: 'salesorderitem',

    fields: {
      'quantity' : 'int',   // quantity
      'rate'     : 'float', // price
      'amount'   : 'float', // line item price
      'taxcode'  : 'int',   // tax code
      'location' : 'int',
    }
  });
})(core);
