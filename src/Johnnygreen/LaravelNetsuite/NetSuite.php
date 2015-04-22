<?php namespace Johnnygreen\LaravelNetSuite;

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
    return $this;
  }

  public function setAuth(Array $auth)
  {
    $this->setAuthDriver(array_get($auth, 'driver', 'email'));
    $this->setCredentials(array_get($auth, 'credentials', []));
    return $this;
  }

  public function setAuthDriver($auth_driver)
  {
    $this->auth_driver = $auth_driver;
    return $this;
  }

  public function getAuthDriver()
  {
    return $this->auth_driver;
  }

  public function setCredentials($credentials)
  {
    $this->credentials = $credentials;
    return $this;
  }

  public function getCredentials()
  {
    return $this->credentials;
  }

}
