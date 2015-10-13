(function(core)
{
  core.SalesOrderItem = core.Model.extend(
  {
    recordType: 'salesorderitem',

    fields: {
      'item'      : 'int',   // item id
      'quantity'  : 'int',   // quantity
      'rate'      : 'float', // price
      'amount'    : 'float', // line item price
      'istaxable' : 'int'
    },

    visible: [
      'products_ns_id',
      'products_quantity',
      'products_price',
      'products_tax'
    ],

    getProductsNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'item');
    },

    getProductsQuantityAttribute: function()
    {
      return core.Util.get(this.attrs, 'quantity');
    },

    getProductsPriceAttribute: function()
    {
      return core.Util.get(this.attrs, 'rate')
    },

    getProductsTax: function()
    {
      return core.Util.get(this.attrs, 'istaxable');
    }
  });
})(core);
