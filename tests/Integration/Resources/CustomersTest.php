<?php namespace Resources;

use Johnnygreen\LaravelNetSuite\NetSuite\Customer;

class CustomersTest extends \TestCase {

  public function setUp()
  {
    $this->repository  = \NetSuite::getRepository('Customer');
    $this->destructive = false;
  }

  /**
   * @depends testStore
   */
  public function testShow($model)
  {
    // test the show endpoint with internal id
    $customer = $this->repository->find($model->ns_id);
    $this->assertInstanceOf('Johnnygreen\LaravelNetSuite\NetSuite\Customer', $customer);
    $this->assertEquals($model->ns_id, $customer->ns_id);

    // test the show endpoint with external id
    $customer = $this->repository->findByExternalId(['customers_id' => $model->customers_id]);
    $this->assertInstanceOf('Johnnygreen\LaravelNetSuite\NetSuite\Customer', $model);
    $this->assertEquals($model->customers_id, $customer->customers_id);

    return $model;
  }

  /**
   * @depends testShow
   */
  public function testSearch($model)
  {
    $customer = $this->repository->where('externalid', 'is', $model->customers_id)->first();
    $this->assertInstanceOf('Johnnygreen\LaravelNetSuite\NetSuite\Customer', $customer);
    $this->assertEquals($model->customers_id, $customer->customers_id);

    return $model;
  }

}
