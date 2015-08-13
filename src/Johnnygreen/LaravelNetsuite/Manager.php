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

  public function getRepository($name)
  {
    $class_name = "Johnnygreen\\LaravelNetSuite\\NetSuite\Repository\\{$name}";
    return new $class_name($this->config);
  }

}
