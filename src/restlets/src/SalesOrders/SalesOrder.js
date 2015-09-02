(function(core)
{
  core.SalesOrder = core.Model.extend(
  {
    recordType: 'salesorder',

    // fields to be parsed on input
    fields: {
      'id'               : 'int',    // ns_id
      'externalid'       : 'string', // orders_id
      'class'            : 'int',    // web, retail, etc
      'authcode'         : 'string',

      'location'         : 'int',

      // shipping
      'shipaddressee'    : 'string',
      'shipaddress'      : 'string',
      'shipcity'         : 'string',
      'shipstate'        : 'string',
      'shipzip'          : 'string',
      'shipcountry'      : 'string',
      'shipmethod'       : 'string',
      'shipcarrier'      : 'string',
      'shipping_rate'    : 'string',

      // totals
      'discounttotal'    : 'notsure',
      'discountitem'     : 'notsure',
      'shippingcost'     : 'float',
      'subtotal'         : 'float',
      'total'            : 'float',

      'createddate'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    sublists: {
      'item' : core.SalesOrderItem
    },

    // fields to be parsed on output
    // visible: [
    //   'ns_id',
    //   'orders_id'
    // ],

    // getNsIdAttribute: function()
    // {
    //   return core.Util.get(this.attrs, 'id');
    // },
    //
    // getOrdersIdAttribute: function()
    // {
    //   return core.Util.get(this.attrs, 'externalid');
    // },
    //
    // getCreatedAtAttribute: function()
    // {
    //   var value = core.Util.get(this.attrs, 'createddate');
    //   return moment(value, this.timeFormat).format(core.Util.timeFormat);
    // },
    //
    // getUpdatedAtAttribute: function()
    // {
    //   var value = core.Util.get(this.attrs, 'lastmodifieddate');
    //   return moment(value, this.timeFormat).format(core.Util.timeFormat);
    // }
  });
})(core);

// billings
//   "billaddress",
//   "billingaddress2_set",

// totals & payment
//   "shippingcostoverridden",
//   "promotionapplied",
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
//   "email",
//   "baserecordtype",
//   "tranid", //   "transactionnumber",
//   "externalid",
//   "message",
//   "isonlinetransaction",
//   "saleseffectivedate",
//   "location",
//   "createddate",
//   "lastmodifieddate",

// uncategorized
//   "type",
//   "fedexservicename",
//   "promodiscount",
//   "shipcomplete",
//   "paypalauthid",
//   "salesrep",
//   "shippingaddress_text",

//   "paymentprocessingmode",
//   "billisresidential",

//   "persistedpromocode",
//   "paypaltoken",
//   "paymentmethod",
//   "linkedtrackingnumbers",
//   "overallunbilledorders",
//   "shipaddresslist",
//   "paypaloverride",
//   "orderstatus",
//   "discountrate",
//   "couponcode",
//   "shadow_shipaddress",
//   "billaddresslist",
//   "promocode",
//   "oldpaypalstatus",
//   "paypalprocess",
//   "terms",
//   "authcode",
//   "item_total",

//   "shipoverride",
//   "paypaltranid",
//   "pendingpaypalauth",
//   "webstore",
//   "customercode",
//   "trancardid",
//   "paypalpayerid",

//   "shipisresidential",
//   "thirdpartycarrier",
//   "paypalauthiddisp",
//   "synceventfield",
//   "linked",
//   "shippingaddress2_set",
//   "status",
//   "class",
//   "shippingaddress_type",
//   "taxamountoverride",
//   "trandate",
//   "giftcertapplied",
//   "paypalstatus",
// ]
