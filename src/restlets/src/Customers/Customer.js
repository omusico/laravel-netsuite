(function(core)
{
  core.Customer = core.Model.extend(
  {
    visible: [
      'id',
      'firstname',
      'lastname',
      'phone',
    ]
  });
})(core);
