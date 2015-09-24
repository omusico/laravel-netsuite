describe('core.Router', function()
{
  core.TestController = core.Controller.extend(
  {
    index  : function() { return 'index'; },
    show   : function() { return 'show'; },
    store  : function() { return 'store'; },
    update : function() { return 'update'; },
    destroy: function() { return 'destroy'; }
  });

  describe('#resource', function()
  {
    var router = new core.Router();
    router.resource('test', 'TestController');

    it('should register 5 routes', function()
    {
      expect(router.parser.routes.length).to.equal(5);
    });

    it('should match get test to index method', function()
    {
      var method = router.match('get', 'test');
      expect(method()).to.equal('index');
    });

    it('should match get test/:id to show method', function()
    {
      var method = router.match('get', 'test/4');
      expect(method()).to.equal('show');
    });

    it('should match post test/:id to store method', function()
    {
      var method = router.match('post', 'test/4');
      expect(method()).to.equal('store');
    });

    it('should match put test/:id to update method', function()
    {
      var method = router.match('put', 'test/4');
      expect(method()).to.equal('update');
    });

    it('should match delete test/:id to destroy method', function()
    {
      var method = router.match('delete', 'test/4');
      expect(method()).to.equal('destroy');
    });
  });

  describe('#get', function()
  {
    var router = new core.Router();
    router.get('test', function() { return 'test'; });

    it('should register 1 route', function()
    {
      expect(router.parser.routes.length).to.equal(1);
    });

    it('should match get test to closure', function()
    {
      var method = router.match('get', 'test');
      expect(method()).to.equal('test');
    });

    it('should not match post test', function()
    {
      var method = router.match('post', 'test');
      expect(method).to.equal(null);
    });
  });
});
