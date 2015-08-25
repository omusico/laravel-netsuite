describe('window', function()
{
  it('should have index function defined', function()
  {
    expect(window).to.have.ownProperty('index');
  });

  it('should have show function defined', function()
  {
    expect(window).to.have.ownProperty('show');
  });

  it('should have store function defined', function()
  {
    expect(window).to.have.ownProperty('store');
  });

  it('should have update function defined', function()
  {
    expect(window).to.have.ownProperty('update');
  });

  it('should have destroy function defined', function()
  {
    expect(window).to.have.ownProperty('destroy');
  });
});
