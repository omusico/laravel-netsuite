<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

class RepositoryTest extends \TestCase {

  public function setUp()
  {
    parent::setUp();
    $this->repository = new Repository($this->app['config']->get('NetSuite::config'));

    // testing as customer repo
    $this->repository->setModel('Johnnygreen\LaravelNetSuite\NetSuite\Customer');
    $this->repository->setSearchEndpoint('https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=27&deploy=2');
    $this->repository->setCrudEndpoint('https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=26&deploy=5');
  }

  public function testBuildAuthentication()
  {
    extract($this->app['config']->get('NetSuite::config'));
    $authorization = "NLAuth nlauth_account={$account}, nlauth_email={$email}, nlauth_signature={$signature}, nlauth_role={$role}";
    $this->assertEquals($this->repository->buildAuthorization(), $authorization);
  }

  public function testBadRequest()
  {
    try
    {
      $customer = $this->repository->create([]);
      $this->fail();
    }
    catch(\Exception $exception)
    {
      $this->assertInstanceOf('Johnnygreen\LaravelNetSuite\NetSuite\Repository\RepositoryException', $exception);
      $this->assertTrue($this->repository->hasError());
      $this->assertArrayHasKey('code', $this->repository->getError());
      $this->assertArrayHasKey('message', $this->repository->getError());
      $this->assertEquals('400', $this->repository->getErrorCode());
    }

    try
    {
      $customer = $this->repository->findByExternalId(0);
      $this->fail();
    }
    catch(\Exception $exception)
    {
      $this->assertInstanceOf('Johnnygreen\LaravelNetSuite\NetSuite\Repository\RepositoryException', $exception);
      $this->assertTrue($this->repository->hasError());
      $this->assertArrayHasKey('code', $this->repository->getError());
      $this->assertArrayHasKey('message', $this->repository->getError());
      $this->assertEquals('400', $this->repository->getErrorCode());
    }
  }

  public function testNotFound()
  {
    $customer = $this->repository->find(1);
    $this->assertNull($customer);
    $this->assertTrue($this->repository->hasError());
    $this->assertArrayHasKey('code', $this->repository->getError());
    $this->assertArrayHasKey('message', $this->repository->getError());
    $this->assertEquals('RCRD_DSNT_EXIST', $this->repository->getErrorCode());

    $customer = $this->repository->findByExternalId(['customers_id' => 0]);
    $this->assertNull($customer);
    $this->assertTrue($this->repository->hasError());
    $this->assertArrayHasKey('code', $this->repository->getError());
    $this->assertArrayHasKey('message', $this->repository->getError());
    $this->assertEquals('404', $this->repository->getErrorCode());
  }

}
