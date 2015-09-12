<?php namespace Resources;

class ProductsTest extends \TestCase {

  public function setUp()
  {
    $this->repository  = \NetSuite::getRepository('InventoryItem');
    $this->destructive = false;
  }

  public function testShow()
  {
    $products_id = '3114';

    // test the show endpoint with external id
    $product = $this->repository->findByExternalId(['products_id' => $products_id]);
    $this->assertInstanceOf($this->repository->model, $product);
    $this->assertEquals($product->products_id, $product->products_id);

    $ns_id = $product->ns_id;

    // test the show endpoint with internal id
    $product = $this->repository->find($ns_id);
    $this->assertInstanceOf($this->repository->model, $product);
    $this->assertEquals($product->ns_id, $ns_id);
  }

  public function testSearch()
  {
    $products_id = '3114';
    $product = $this->repository->where('externalid', 'is', $products_id)->first();
    $this->assertInstanceOf($this->repository->model, $product);
    $this->assertEquals($product->products_id, $products_id);
  }

}
