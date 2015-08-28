(function(core)
{
  core.InventoryItem = core.Model.extend(
  {
    recordType: 'inventoryitem',

    // fields to be parsed on input
    // fields: {
    //   'id'               : 'int',
    //   'externalid'       : 'string', // this must be a string or it will add a .0 to the end, you got me...
    //   'firstname'        : 'string',
    //   'lastname'         : 'string',
    //   'phone'            : 'string',
    //   'email'            : 'string',
    //   'datecreated'      : 'timestamp',
    //   'lastmodifieddate' : 'timestamp',
    //   'category'         : 'int',
    //   'pricelevel'       : 'int',
    //   'isperson'         : 'string',
    //   'taxable'          : 'string'
    // },

    // sublists to be parsed on input
    // sublists: {
    //   'addressbook' : core.Address
    // },

    // fields to be parsed on output
    // visible: [
    //   'id',
    //   'customers_id',
    //   'customers_firstname',
    //   'customers_lastname',
    //   'customers_telephone',
    //   'customers_email_address',
    //   'created_at',
    //   'updated_at',
    //   'addresses'
    // ],
  });
})(core);
