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

    it('should return the proper falsie value unless that value is undefined', function()
    {
      expect(core.Util.get({name: {first: false}},     'name.first')).to.equal(false);
      expect(core.Util.get({name: {first: 0}},         'name.first')).to.equal(0);
      expect(core.Util.get({name: {first: ''}},        'name.first')).to.equal('');
      expect(core.Util.get({name: {first: null}},      'name.first')).to.equal(null);
      expect(core.Util.get({name: {first: undefined}}, 'name.first')).to.equal(null);

      expect(core.Util.get({name: {first: false}},     'name.first', 'test')).to.equal(false);
      expect(core.Util.get({name: {first: 0}},         'name.first', 'test')).to.equal(0);
      expect(core.Util.get({name: {first: ''}},        'name.first', 'test')).to.equal('');
      expect(core.Util.get({name: {first: null}},      'name.first', 'test')).to.equal('test');
      expect(core.Util.get({name: {first: undefined}}, 'name.first', 'test')).to.equal('test');
    });

    it('should return fallback when value is undefined and fallback is not undefined', function()
    {
      expect(core.Util.get({}, 'name', 'Johnny')).to.equal('Johnny');
      expect(core.Util.get({}, 'name', null)).to.equal(null);
      expect(core.Util.get({}, 'name', false)).to.equal(false);
      expect(core.Util.get({}, 'name', '')).to.equal('');
      expect(core.Util.get({}, 'name', [])).to.deep.equal([]);
      expect(core.Util.get({}, 'name', {})).to.deep.equal({});
      expect(core.Util.get({}, 'name', 0)).to.equal(0);

      expect(core.Util.get({}, 'name', 1)).to.equal(1);
      expect(core.Util.get({}, 'name', true)).to.equal(true);
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
