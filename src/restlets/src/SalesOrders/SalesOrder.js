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

    recordrefs: {
      'entity'     : core.Customer,
      'couponcode' : core.Coupon
    },

    sublists: {
      'item'               : core.SalesOrderItem,
      'giftcertredemption' : core.SalesOrderGiftCertRedemption
    },

    // fields to be parsed on output
    visible: [
      'ns_id',
      'orders_id',
      'customers_id',
      'customers_email_address',
      'customers_telephone',
      'delivery_name',
      'delivery_street_address',
      'delivery_street_address_2',
      'delivery_city',
      'delivery_state',
      'delivery_postcode',
      'delivery_country',
      'payment_method',
      'orders_status',
      'date_purchased',
      'last_modified',

      // recordrefs
      'gift_certificates',
      'coupon',

      // sublists
      'products',
      'totals'
    ],

    getNsIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'id');
    },

    getOrdersIdAttribute: function()
    {
      return core.Util.get(this.attrs, 'externalid');
    },

    getCustomersIdAttribute: function()
    {
      var customer = core.Util.get(this.attrs, 'entity');
      return customer.get('customers_id');
    },

    getCustomersEmailAddressAttribute: function()
    {
      var customer = core.Util.get(this.attrs, 'entity');
      return customer.get('customers_email_address');
    },

    getCustomersTelephoneAttribute: function()
    {
      var customer = core.Util.get(this.attrs, 'entity');
      return customer.get('customers_telephone');
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

    getCouponAttribute: function()
    {
      return core.Util.get(this.attrs, 'couponcode');
    },

    getProductsAttribute: function()
    {
      return _.map(core.Util.get(this.attrs, 'item', []), function(item)
      {
        return item.toHash();
      });
    },

    getTotalsAttribute: function()
    {

      var giftcardSum = _.reduce(this.get('gift_certificates'), function(total, gc){ return total + gc.authcodeapplied; }, 0);

      return [
        {
          title: 'Discount Coupon',
          text: core.Util.formatCurrency(0, 2, '-$'),
          value: '0.00',
          class: 'ot_discount_coupon',
          sort_order: 1
        },
        {
          title: 'Sub-Total:',
          text:  core.Util.formatCurrency(core.Util.get(this.attrs, 'subtotal', 0)),
          value: core.Util.get(this.attrs, 'subtotal', 0),
          class: 'ot_subtotal',
          sort_order: 2
        },
        {
          title: 'Sales Tax:',
          text: core.Util.formatCurrency(core.Util.get(this.attrs, 'taxtotal', 0)),
          value: core.Util.get(this.attrs, 'taxtotal', 0),
          class: 'ot_tax',
          sort_order: 3
        },
        {
          title: 'Duties:',
          text: '????????',
          value: '????????',
          class: 'ot_duties',
          sort_order: 4
        },
        {
          title: 'Shipping Name:',
          text:  core.Util.formatCurrency(core.Util.get(this.attrs, 'shipping', 0)),
          value: core.Util.get(this.attrs, 'shipping', 0),
          class: 'ot_shipping',
          sort_order: 5
        },
        {
          title: 'Gift Card:',
          text: core.Util.formatCurrency(giftcardSum),
          value: giftcardSum,
          class: 'ot_giftcard',
          sort_order: 6
        },
        {
          title: 'Total:',
          text: core.Util.formatCurrency(core.Util.get(this.attrs, 'total', 0)),
          value: core.Util.get(this.attrs, 'total', 0),
          class: 'ot_total',
          sort_order: 7
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
