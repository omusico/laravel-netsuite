describe('core.Model', function()
{
  var model = new core.Model({id: 1, firstname: 'Johnny', lastname: 'Green'});

  model.visible = ['id', 'firstname'];

  model.getFirstnameAttribute = function(value)
  {
    return value.toUpperCase();
  };

  model.setEmailAddressAttribute = function(value)
  {
    this.attrs.email = value;
  };

  model.hasEmailAddressAttribute = function(key)
  {
    return this.has('email');
  };

  describe('#get', function()
  {
    it('should return the value from the attributes using a key', function()
    {
      expect(model.get('lastname')).to.equal(model.attrs.lastname);
    });

    it('should return null when an attribute is not present', function()
    {
      expect(model.get('not_present')).to.equal(null);
    });

    it('should return the fallback when an attribute is not present and a fallback is input', function()
    {
      expect(model.get('not_present', 'a fallback value')).to.equal('a fallback value');
    });

    it('should mutate output when a get mutator is present', function()
    {
      expect(model.get('firstname')).to.equal('JOHNNY');
    });
  });

  describe('#set', function()
  {
    it('should set a value on the attributes using a key and value', function()
    {
      model.set('phone', '123-123-1234');
      expect('123-123-1234').to.equal(model.attrs.phone);
      model.unset('phone');
    });

    it('should mutate input when a set mutator is present', function()
    {
      model.set('email_address', 'test@example.com');
      expect(model.attrs.email).to.equal('test@example.com');
      model.unset('email_address');
    });
  });

  describe('#has', function()
  {
    it('should return true when an attribute is present', function()
    {
      expect(model.has('firstname')).to.equal(true);
    });

    it('should return false when an attribute is not present', function()
    {
      expect(model.has('not_present')).to.equal(false);
    });

    it('should still work when a has mutator is present but no actual value', function()
    {
      expect(model.has('email_address')).to.equal(true);
    });
  });

  describe('#unset', function()
  {
    it('should delete a value from attributes', function()
    {
      model.set('test', true).unset('test');
      expect(model.attrs.test).to.equal(undefined);
    });
  });

  describe('#toHash', function()
  {
    it('should return visible keys only', function()
    {
      expect(_.keys(model.toHash())).to.deep.equal(model.visible);
    });

    it('should mutate output when a get mutator is present', function()
    {
      expect(model.toHash().firstname).to.equal('JOHNNY');
    });
  });
});
