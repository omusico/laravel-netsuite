<?php namespace Johnnygreen\Netsuite;

class NetSuite {

  // token or email
  public $auth_driver;

  // credentials hash
  public $credentials;

  public function __construct()
  {

  }

  public function setConfig(Array $config)
  {

  }

  public function setAuth(Array $auth)
  {
    $this->setAuthDriver(array_get($auth, 'driver', 'email'));
    $this->setCredentials(array_get($auth, 'credentials', []));
  }

  public function setAuthDriver($auth_driver)
  {
    $this->auth_driver = $auth_driver;
  }

  public function setCredentials($credentials)
  {
    $this->credentials = $credentials;
  }

}
