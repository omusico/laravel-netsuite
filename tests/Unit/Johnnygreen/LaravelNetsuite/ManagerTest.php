<?php namespace Johnnygreen\LaravelNetSuite;

class ManagerTest extends \TestCase {

  public function testInstantiateManager()
  {
    $this->assertInstanceOf('Johnnygreen\LaravelNetSuite\Manager', \NetSuite::getFacadeRoot());
  }

  public function testGetRepository()
  {
    $this->assertInstanceOf('Johnnygreen\LaravelNetSuite\NetSuite\Repository\Customer', \NetSuite::getRepository('Customer'));
  }

}
