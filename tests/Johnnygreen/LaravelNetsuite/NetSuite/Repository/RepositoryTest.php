<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

class RepositoryTest extends \PHPUnit_Framework_TestCase {

  public function setUp()
  {
    $this->repository = new Repository([
      'account'   => '',
      'email'     => '',
      'signature' => '',
      'role'      => ''
    ]);
  }

  public function testBuildAuthentication()
  {
    echo "YEAHHH";

    // $this->
    // buildAuthorization()
  }

}
