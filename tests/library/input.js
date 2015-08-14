describe('core.Input', function()
{
  var input = new core.Input({firstname: 'Johnny', lastname: 'Green'});

  describe('#only', function()
  {
    it('it should return only the input keys present in the arguments', function()
    {
      expect(input.only('firstname')).to.deep.equal({firstname: 'Johnny'});
    });
  });

  describe('#except', function()
  {
    it('it should return only the input keys not present in the arguments', function()
    {
      expect(input.except('firstname')).to.deep.equal({lastname: 'Green'});
    });
  });
});
