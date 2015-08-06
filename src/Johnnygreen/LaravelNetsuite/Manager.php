<?php namespace Johnnygreen\LaravelNetSuite;

class Manager {

  public function setConfig($config)
  {
    $this->config = $config;
    return $this;
  }

  public function getConfig()
  {
    return object_get($this, 'config');
  }

}
