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
    //   return core.Util.formatDate(core.Util.get(this.attrs, 'createddate'), this.timeFormat);
    // },
    //
    // getUpdatedAtAttribute: function()
    // {
    //   return core.Util.formatDate(core.Util.get(this.attrs, 'lastmodifieddate'), this.timeFormat);
    // },
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

(function(core)
{
  core.SalesOrderSearchResult = core.Model.extend(
  {
    // fields to be parsed on input
    fields: {
      'id'               : 'int',
      'externalid'       : 'string',
      'datecreated'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'orders_id',
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

    getCreatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'datecreated');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    },

    getUpdatedAtAttribute: function()
    {
      var value = core.Util.get(this.attrs, 'lastmodifieddate');
      return moment(value, this.timeFormat).format(core.Util.timeFormat);
    }
  });
})(core);

(function(core)
{
  core.SalesOrderRepository = core.Repository.extend(
  {
    recordClass: core.SalesOrder,
    searchClass: core.SalesOrderSearchResult,

    searchColumns: [
      'externalid',
      'datecreated',
      'lastmodifieddate'
    ],

    get: function()
    {
      var results = core.Repository.prototype.get.call(this);

      return results.map(function(result)
      {
        return new this.searchClass(result);
      }, this);
    },

    // create: function(attrs)
    // {
    //   var model = new this.recordClass(attrs, {mutate: true});
    //
    //   // this model will have id set on it, but might be missing some sublist ids
    //   model = core.Repository.prototype.create.call(this, model);
    //
    //   // reload model so ids are set on sublists etc
    //   model = this.find(model.get('id'));
    //
    //   return model;
    // },
    //
    // update: function(attrs)
    // {
    //   var model = this.find(attrs.id);
    //   if ( ! model) return false;
    //   model.set(attrs);
    //
    //   // this model might be missing some sublist ids
    //   model = core.Repository.prototype.update.call(this, model);
    //
    //   // reload model so ids are set on sublists etc
    //   model = this.find(model.get('id'));
    //
    //   return model;
    // },
  });
})(core);

(function(core)
{
  core.SalesOrdersController = core.Controller.extend(
  {
    initialize: function()
    {
      this.salesOrders = new core.SalesOrderRepository();
    },

    index: function()
    {
      var salesOrders = this.salesOrders
                          .filter(input.get('filters', []))
                          .paginate(input.get('page', 1), input.get('per_page', 10));

      return this.okay(salesOrders.toHash());
    },

    show: function()
    {
      var validator = new core.Validator(input, {ns_id: 'required'}, {orders_id : 'required'});

      if (validator.passes())
      {
        var salesOrder = input.has('ns_id')
                       ? this.salesOrders.find(input.get('ns_id'))
                       : this.salesOrders.findByExternalId(input.get('orders_id'));

        return salesOrder ? this.okay(salesOrder.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
