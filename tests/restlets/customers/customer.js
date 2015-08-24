
describe('core.Customer', function()
{
  var customer = new core.Customer({id: 1, firstname: 'Johnny', lastname: 'Green'});

  describe('#parse', function()
  {
    it('should parse the input object for correct types', function()
    {
      var output = customer.parse({id: '1', firstname: 99});

      expect(output.id).to.be.a('Number');
      expect(output.firstname).to.be.a('String');
    });
  });
});
