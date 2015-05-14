<?php namespace Johnnygreen\LaravelNetSuite\NetSuite;

use GuzzleHttp\Client;

class Request {

  public $data;
  public $template;

  public function setTemplate($template)
  {
    $this->template = $template;
  }

  public function send()
  {
    $body    = \View::make($this->template, $this->data)->render();
    $client  = new Client;
    $request = $client->createRequest('POST', $this->config['endpoint'], [
      'headers' => ['content-type' => 'text/xml; charset =UTF8'],
      'body'    => $body
    ]);

    try
    {
      return $client->send($request);
    }
    catch(\Exception $e)
    {
      $api_down_exception = new ApiDownException("FedEx API is down - {$e->getMessage()}");
      \Bugsnag::notifyException($api_down_exception);
      throw $api_down_exception;
    }
  }

  public function setData($key, $value)
  {
    $this->data[$key] = $value;
  }

}
