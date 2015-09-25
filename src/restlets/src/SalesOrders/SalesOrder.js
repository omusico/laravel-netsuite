(function(core)
{
  core.SalesOrder = core.Model.extend(
  {
    recordType: 'salesorder',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',    // ns_id
      'externalid'       : 'string', // orders_id
      'entity'           : 'int',    // customers ns_id

      'authcode'         : 'string',

      // set these as defaults for now
      'class'            : 'int',    // web, retail, etc
      'location'         : 'int',

      // 'discountitem' : 'notsure',
      'email'            : 'string',

      // shipping
      'shipaddressee'    : 'string',
      'shipaddr1'        : 'string',
      'shipaddr2'        : 'string',
      'shipcity'         : 'string',
      'shipstate'        : 'string',
      'shipzip'          : 'string',
      'shipcountry'      : 'string',

      // shipping method
      'shipmethod'       : 'int',
      'shipcarrier'      : 'string',

      'paymentmethod'    : 'int',

      // totals
      'discounttotal'    : 'float',
      'subtotal'         : 'float',
      'shippingcost'     : 'float',
      'taxtotal'         : 'float',
      'total'            : 'float',

      'giftcertapplied'  : 'int',
      'promotionapplied' : 'int',

      'custbody14'       : 'string', // comments

      // 'taxrate' : 'float',

      'createddate'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    sublists: {
      'item' : core.SalesOrderItem
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'orders_id',
      'customers_ns_id',
      'customers_email_address',
      'delivery_name',
      'delivery_street_address',
      'delivery_street_address_2',
      'delivery_city',
      'delivery_state',
      'delivery_postcode',
      'delivery_country',
      'products',
      // 'item',
      'created_at',
      'updated_at'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getOrdersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCustomersNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'entity');
    },

    getCustomersEmailAddressAttribute: function()
    {
      return core.Util.get(this.attrs, 'email');
    },

    getDeliveryNameAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipaddressee');
    },

    getDeliveryStreetAddressAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipaddr1');
    },

    getDeliveryStreetAddress2Attribute: function()
    {
      return core.Util.get(this.attrs, 'shipaddr2');
    },

    getDeliveryCityAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipcity');
    },

    getDeliveryStateAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipstate');
    },

    getDeliveryPostcodeAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipzip');
    },

    getDeliveryCountryAttribute: function()
    {
      return core.Util.get(this.attrs, 'shipcountry');
    },

    getProductsAttribute: function()
    {
      return _.map(core.Util.get(this.attrs, 'item', []), function(item)
      {
        return item.toHash();
      });
    },

    getCreatedAtAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'createddate'), this.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'lastmodifieddate'), this.timeFormat);
    },
  });
})(core);

// totals & payment
//   "shippingcostoverridden",
//   "getauth",
//   "currency",
//   "ispaypal",
//   "taxamount2override",
//   "methodtokenized",
//   "paypalprocessed",
//   "overrideshippingcost",
//   "oldpaypaltranid",
//   "ispaymethcc",

// general
//   "tranid", //   "transactionnumber",

// uncategorized
//   "type",
//   "fedexservicename",
//   "promodiscount",
//   "shipcomplete",
//   "paypalauthid",
//   "salesrep",

//   "paymentprocessingmode",
//   "billisresidential",

//   "persistedpromocode",
//   "paypaltoken",
//   "paypaloverride",
//   "orderstatus",
//   "discountrate",
//   "couponcode",
//   "promocode",
//   "paypalprocess",
//   "terms",
//   "item_total",

//   "shipoverride",
//   "paypaltranid",
//   "pendingpaypalauth",
//   "customercode",
//   "trancardid",
//   "paypalpayerid",

//   "shipisresidential",
//   "thirdpartycarrier",
//   "paypalauthiddisp",
//   "synceventfield",
//   "linked",
//   "class",
//   "taxamountoverride",
//   "trandate",
//   "paypalstatus",
// ]
