
describe('core.Customer', function()
{
  var customer = new core.Customer({id: 1, firstname: 'Johnny', lastname: 'Green'});

  it('should have fields, sublists, and visible attrs', function()
  {
    expect(customer.fields).to.be.an('Object');
    expect(customer.sublists).to.be.an('Object');
    expect(customer.visible).to.be.an('Array');
    expect(_.keys(customer.fields).length).to.be.above(0);
    expect(_.keys(customer.sublists).length).to.be.above(0);
    expect(customer.visible.length).to.be.above(0);
  });

  describe('#constructor', function()
  {
    var customer1 = new core.Customer({id: 1, customers_firstname: 'Johnny', customers_lastname: 'Green'}, {mutate: true});

    it('should mutate input if that option is passed in', function()
    {
      expect(customer1.get('firstname')).to.be.a('String');
      expect(customer1.attrs.customers_firstname).to.equal(undefined);
      expect(customer1.get('lastname')).to.be.a('String');
      expect(customer1.attrs.customers_lastname).to.equal(undefined);
    });

    // var customer2 = new core.Customer({id: 1, firstname: 'Johnny', lastname: 'Green'}, {parse: true});
    //
    // it('should parse input if that option is passed in', function()
    // {
    //   var output = customer.parse({id: '1', firstname: 99});
    //
    //   expect(output.id).to.be.a('Number');
    //   expect(output.firstname).to.be.a('String');
    // });
  });

  describe('#parse', function()
  {
    var customer = new core.Customer({id: 1, firstname: 'Johnny', lastname: 'Green'});

    it('should parse the input object for correct types', function()
    {
      var output = customer.parse({id: '1', firstname: 99});

      expect(output.id).to.be.a('Number');
      expect(output.firstname).to.be.a('String');
    });
  });
});
