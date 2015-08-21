<?php namespace Resources;

use Johnnygreen\LaravelNetSuite\NetSuite\Customer;

class CustomersTest extends \TestCase {

  public function setUp()
  {
    $this->repository = \NetSuite::getRepository('Customer');
  }

  public function testStore()
  {
    $attributes = [
      'customers_id'            => 1000001,
      'customers_firstname'     => 'Test',
      'customers_lastname'      => 'Customer',
      'customers_telephone'     => '123-123-1234',
      'customers_email_address' => 'test@mzwallace.com'
    ];

    $model = $this->repository->create($attributes);
    $this->assertInstanceOf('Johnnygreen\LaravelNetSuite\NetSuite\Customer', $model);

    foreach($attributes as $key => $value)
    {
      $this->assertEquals($value, $model->$key);
    }

    return $model;
  }

  /**
   * @depends testStore
   */
  public function testShow($model)
  {
    // test the show endpoint with internal id
    $customer = $this->repository->find($model->id);
    $this->assertEquals($model->id, $customer->id);

    echo "<pre>".print_r($model, true)."</pre>"; exit;

    // test the show endpoint with external id
    $customer = $this->repository->findByExternalId(['customers_id' => $model->customers_id]);
    $this->assertEquals($model->customers_id, $customer->customers_id);
    return $model;
  }

  /**
   * @depends testShow
   */
  public function testSearch($model)
  {
    $customer = $this->repository->where('externalid', 'is', $model->customers_id)->first();
    $this->assertEquals($model->customers_id, $customer->customers_id);
    return $model;
  }

  /**
   * @depends testSearch
   */
  public function testUpdate($model)
  {
    // $model->customers_firstname = '';
    // $customer = $this->repository->update($model);
    // $this->assertEquals($model->customers_firstname, $customer->customers_firstname);
    return $model;
  }

  /**
   * @depends testUpdate
   */
  public function testDestroy($model)
  {
    $this->repository->destroy($model->id);
    $customer = $this->repository->find($model->id);
    $this->assertNull($customer);
  }

}
