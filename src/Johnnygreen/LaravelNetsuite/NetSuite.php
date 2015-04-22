<?php namespace Johnnygreen\Netsuite;

class NetSuite {

  public $config;

  public function __construct()
  {

  }

  public function setConfig(Array $config)
  {

  }

  public function setAuth(Array $auth)
  {
    $this->auth_driver = array_get($auth, 'driver', 'email');
    $this->credentials = array_get($auth, 'credentials', []);
  }

}
