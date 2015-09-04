<?php namespace Resources;

use Johnnygreen\LaravelNetSuite\NetSuite\Customer;

class CustomersTest extends \TestCase {

  public function setUp()
  {
    $this->repository  = \NetSuite::getRepository('Customer');
    $this->destructive = false;
  }

  public function testStore()
  {
    if ($this->destructive)
    {
      $attributes = [
        'customers_id'            => '1000001',
        'customers_firstname'     => 'Test',
        'customers_lastname'      => 'Customer',
        'customers_telephone'     => '123-123-1234',
        'customers_email_address' => 'test@mzwallace.com'
      ];

      $customer = $this->repository->create($attributes);
      $this->assertInstanceOf('Johnnygreen\LaravelNetSuite\NetSuite\Customer', $customer);

      foreach($attributes as $key => $value)
      {
        $this->assertEquals($value, $customer->$key);
      }
    }
    else
    {
      $customer = new Customer(['ns_id' => 9279, 'customers_id' => '8672']);
    }

    return $customer;
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

  /**
   * @depends testSearch
   */
  public function testUpdate($model)
  {
    if ($this->destructive)
    {
      $model->customers_firstname = 'New First Name';
      $customer = $this->repository->update($model);
      $this->assertInstanceOf('Johnnygreen\LaravelNetSuite\NetSuite\Customer', $customer);
      $this->assertEquals($model->customers_firstname, $customer->customers_firstname);
    }

    return $model;
  }

  /**
   * @depends testUpdate
   */
  public function testDestroy($model)
  {
    if ($this->destructive)
    {
      $success = $this->repository->destroy($model->ns_id);
      $this->assertTrue($success);

      $customer = $this->repository->find($model->ns_id);
      $this->assertNull($customer);
    }
  }

}
