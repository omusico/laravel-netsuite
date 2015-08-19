<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

class RepositoryTest extends \TestCase {

  public function setUp()
  {
    parent::setUp();
    $this->repository = new Repository($this->app['config']->get('NetSuite::config'));
  }

  public function testBuildAuthentication()
  {
    extract($this->app['config']->get('NetSuite::config'));
    $authorization = "NLAuth nlauth_account={$account}, nlauth_email={$email}, nlauth_signature={$signature}, nlauth_role={$role}";
    $this->assertEquals($this->repository->buildAuthorization(), $authorization);
  }

}
