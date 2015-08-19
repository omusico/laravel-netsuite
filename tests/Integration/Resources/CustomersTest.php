<?php namespace Resources;

class CustomersTest extends \TestCase {

  public function testSearch()
  {
    $customers_id = 8672;
    $customers = \NetSuite::getRepository('Customer');
    $customer  = $customers->where('externalid', 'is', $customers_id)->first();
    $this->assertEquals($customers_id, $customer->customers_id);
  }

  public function testShow()
  {
    // test the show endpoint with internal id
    $id        = 9279;
    $customers = \NetSuite::getRepository('Customer');
    $customer  = $customers->find($id);
    $this->assertEquals($id, $customer->id);

    // test the show endpoint with external id
    $customers_id = 8672;
    $customers    = \NetSuite::getRepository('Customer');
    $customer     = $customers->findByExternalId(compact('customers_id'));
    $this->assertEquals($customers_id, $customer->customers_id);
  }

}
