<?php namespace Johnnygreen\LaravelNetSuite\NetSuite;

use GuzzleHttp\Client;

class Request {

  public $config;
  public $data;
  public $template;
  
  public function setConfig($config)
  {
    $this->$config = $config;
  }
  
  public function setData($data)
  {
    $this->data = $data;
  }
  
  public function setTemplate($template)
  {
    $this->template = $template;
  }

  // WIP
  public function send()
  {
    $body    = \View::make($this->template, $this->data)->render();
    $client  = new Client;
    $request = $client->createRequest('POST', array_get($this->config, 'endpoint'), [
      'headers' => [],
      'body'    => $body
    ]);

    try
    {
      return $client->send($request);
    }
    catch(\Exception $e)
    {
      $api_down_exception = new ApiDownException("NetSuite API is down - {$e->getMessage()}");
      // \Bugsnag::notifyException($api_down_exception);
      throw $api_down_exception;
    }
  }

}
