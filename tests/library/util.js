describe('core.Util', function()
{
  describe('#snakeCase', function()
  {
    it('should transform camel case to snake case', function()
    {
      expect(core.Util.snakeCase('CamelCase')).to.equal('camel_case');
      expect(core.Util.snakeCase('CamelCaseCamelCase')).to.equal('camel_case_camel_case');
    });

    it('should ignore snake case input', function()
    {
      expect(core.Util.snakeCase('snake_case')).to.equal('snake_case');
      expect(core.Util.snakeCase('Snake_Case')).to.equal('Snake_Case');
    });
  });

  describe('#camelCase', function()
  {
    it('should transform snake case to camel case', function()
    {
      expect(core.Util.camelCase('snake_case')).to.equal('snakeCase');
      expect(core.Util.camelCase('snake_case_snake_case')).to.equal('snakeCaseSnakeCase');
    });

    it('should ignore camel case input', function()
    {
      expect(core.Util.camelCase('CamelCase')).to.equal('CamelCase');
      expect(core.Util.camelCase('camelCase')).to.equal('camelCase');
    });
  });

  describe('#get', function()
  {
    it('should get a value from a nested object', function()
    {
      expect(core.Util.get({customer: {name: 'Johnny'}}, 'customer.name')).to.equal('Johnny');
    });

    it('should get a value from a nested array', function()
    {
      expect(core.Util.get({customer: {name: 'Johnny'}}, 'customer.name')).to.equal('Johnny');
    });

    it('should get a value from a mixed array object', function()
    {
      expect(core.Util.get([{name: 'Johnny'}], '0.name')).to.equal('Johnny');
    });

    it('should return null when the input is null', function()
    {
      expect(core.Util.get(null, '0.name')).to.equal(null);
    });

    it('should return null when the value cannot be found', function()
    {
      expect(core.Util.get({name: 'Johnny'}, '0.name')).to.equal(null);
    });
  });

  describe('#set', function()
  {
    it('should set a value on a nested object', function()
    {
      expect(core.Util.set({}, 'customer.name', 'Johnny')).to.deep.equal({customer: {name: 'Johnny'}});
    });

    it('should set a value on a nested array', function()
    {
      expect(core.Util.set([], '0.0', 'Johnny')).to.deep.equal([['Johnny']]);
    });

    it('should set a value on a mixed array object', function()
    {
      expect(core.Util.set([], '0.name', 'Johnny')).to.deep.equal([{name: 'Johnny'}]);
    });

    it('should set a value on a deeply nested mixed array object', function()
    {
      expect(core.Util.set({}, 'filters.0.name', 'Johnny')).to.deep.equal({filters: [{name: 'Johnny'}]});
    });

    it('should set a value on a mixed array object with existing values', function()
    {
      expect(core.Util.set([{email: 'test@example.com'}], '0.name', 'Johnny')).to.deep.equal([{name: 'Johnny', email: 'test@example.com'}]);
    });

    it('should not set a value on any object that it could break', function()
    {
      expect(core.Util.set([{email: 'test@example.com'}], 'name', 'Johnny')).to.deep.equal([{email: 'test@example.com'}]);
    });
  });
});
