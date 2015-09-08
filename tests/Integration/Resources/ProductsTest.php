<?php namespace Resources;

use Johnnygreen\LaravelNetSuite\NetSuite\Product;

class ProductsTest extends \Test {

  public function setUp()
  {
    $this->repository  = \NetSuite::getRepository('Product');
    $this->destructive = false;
  }

}
