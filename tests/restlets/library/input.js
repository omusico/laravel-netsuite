describe('core.Input', function()
{
  var data  = {firstname: 'Johnny', lastname: 'Green'};
  var input = new core.Input(data);

  describe('#all', function()
  {
    it('should return all the same values that were input', function()
    {
      expect(input.all()).to.deep.equal(data);
    });
  });

  describe('#only', function()
  {
    it('should return only the input keys present in the arguments', function()
    {
      expect(input.only('firstname')).to.deep.equal({firstname: 'Johnny'});
    });
  });

  describe('#except', function()
  {
    it('should return only the input keys not present in the arguments', function()
    {
      expect(input.except('firstname')).to.deep.equal({lastname: 'Green'});
    });
  });
});
