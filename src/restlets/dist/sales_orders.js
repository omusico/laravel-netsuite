(function(core)
{
  core.SalesOrderItem = core.Model.extend(
  {
    recordType: 'salesorderitem',

    fields: {
      'item'      : 'int',    // item id
      'quantity'  : 'int',   // quantity
      'rate'      : 'float', // price
      'amount'    : 'float', // line item price
      'istaxable' : 'int'
    },

    visible: [
      'products_ns_id',
      'products_quantity',
      'products_price'
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

        return this.okay({model: salesOrder.toHash(), record: nlapiLoadRecord('salesorder', input.get('ns_id'))});

        return salesOrder ? this.okay(salesOrder.toHash()) : this.notFound();
      }
      else
      {
        return this.badRequest(validator.toHash());
      }
    }
  });
})(core);
