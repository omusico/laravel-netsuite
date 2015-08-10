(function(core)
{
  core.Customer = core.Model.extend(
  {
    visible: [
      'id',
      'firstname',
      'lastname',
      'phone',
      'addressbook'
    ],

    fields: {
      'id'       : 'int',
      'firstname': 'string',
      'lastname' : 'string',
      'phone'    : 'string'
    },

    sublists: {
      'addressbook': core.Address
    }
  });
})(core);
