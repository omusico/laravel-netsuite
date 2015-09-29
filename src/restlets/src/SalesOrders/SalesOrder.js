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

      // customer is a nesteded entity
      // 'email'            : 'string',
      // 'telephone'        : 'string',

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

      // 'giftcertredemption' : 'object',
      'couponcode'         : 'object',

      'giftcertapplied'  : 'int',
      'promotionapplied' : 'int',

      'custbody14'       : 'string', // comments

      // 'taxrate' : 'float',

      'createddate'      : 'timestamp',
      'lastmodifieddate' : 'timestamp'
    },

    sublists: {
      'item'               : core.SalesOrderItem,
      'giftcertredemption' : core.SalesOrderGiftCertRedemption
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'orders_id',
      'customers_ns_id',
      // 'customers_email_address',
      // 'customers_telephone',
      'delivery_name',
      'delivery_street_address',
      'delivery_street_address_2',
      'delivery_city',
      'delivery_state',
      'delivery_postcode',
      'delivery_country',
      'payment_method',
      'orders_products',
      'orders_status',
      'gift_certificates',
      'date_purchased',
      'last_modified',

      'orders_totals'
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

    // getCustomersIdAttribute: function()
    // {
    //   var ns_id = core.Util.get(this.attrs, 'entity');
    //
    //   if (ns_id)
    //   {
    //     var customer = new core.CustomerRepository().find(ns_id);
    //
    //     if (customer)
    //     {
    //       return customer.get('externalid');
    //     }
    //   }
    //
    //   return null;
    // },
    //
    // getCustomersEmailAddressAttribute: function()
    // {
    //   var ns_id = core.Util.get(this.attrs, 'entity');
    //
    //   if (ns_id)
    //   {
    //     var customer = new core.CustomerRepository().find(ns_id);
    //
    //     if (customer)
    //     {
    //       return customer.get('customers_email_address');
    //     }
    //   }
    //
    //   return null;
    // },
    //
    // getCustomersTelephoneAttribute: function()
    // {
    //   var ns_id = core.Util.get(this.attrs, 'entity');
    //
    //   if (ns_id)
    //   {
    //     var customer = new core.CustomerRepository().find(ns_id);
    //
    //     if (customer)
    //     {
    //       return customer.get('customers_telephone');
    //     }
    //   }
    //
    //   return null;
    // },

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

    getOrdersProductsAttribute: function()
    {
      return _.map(core.Util.get(this.attrs, 'item', []), function(item)
      {
        return item.toHash();
      });
    },

    getOrdersStatusAttribute: function()
    {
      return core.Util.get({
        // Sales Order:Pending Approval	SalesOrd:A
        A: 1,
        // Sales Order:Pending Fulfillment	SalesOrd:B
        B: 2,
        // Sales Order:Cancelled	SalesOrd:C
        C: 6,
        // Sales Order:Partially Fulfilled	SalesOrd:D
        D: 2,
        // Sales Order:Pending Billing/Partially Fulfilled	SalesOrd:E
        E: 2,
        // Sales Order:Pending Billing	SalesOrd:F
        F: 2,
        // Sales Order:Billed	SalesOrd:G
        G: 2,
        // Sales Order:Closed	SalesOrd:H
        H: 6
      }, core.Util.get(this.attrs, 'orderstatus', 'A'), 1);
    },

    getGiftCertificatesAttribute: function()
    {
      return _.map(core.Util.get(this.attrs, 'giftcertredemption', []), function(item)
      {
        return item.toHash();
      }, this);
    },

    getOrdersTotalsAttribute: function()
    {
      core.Log.debug('redemption', this.attrs);
      return [
        {
          class: 'ot_discount_coupon',
          value: core.Util.get(this.attrs, 'discounttotal', 0),
          coupon_id: core.Util.get(this.attrs, 'couponcode.name')
        },
        {
          class: 'ot_subtotal',
          value: core.Util.get(this.attrs, 'subtotal', 0),
        },
        {
          class: 'ot_tax',
          value: core.Util.get(this.attrs, 'taxtotal', 0),
        },
        {
          class: 'ot_total',
          value: core.Util.get(this.attrs, 'total', 0)
        },
        {
          class: 'ot_giftcard',
          value: core.Util.get(this.attrs, 'giftcertapplied', 0),
          gift_cards_code: core.Util.get(this.attrs, 'giftcertredemption.0.authcode.name')
        }
      ];
    },

    getDatePurchasedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'createddate'), this.timeFormat);
    },

    getLastModifiedAttribute: function()
    {
      return core.Util.formatDate(core.Util.get(this.attrs, 'lastmodifieddate'), this.timeFormat);
    }
  });
})(core);
