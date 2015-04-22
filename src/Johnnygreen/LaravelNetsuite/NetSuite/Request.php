<?php namespace Johnnygreen\LaravelNetSuite\NetSuite;

use Guzzle\Http\Client;

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
    $request = $client->post($this->data['endpoint'], ['content-type' => 'text/xml; charset=UTF8'], $body);

    try
    {
      return $client->send($request);
    }
    catch(\Exception $e)
    {
      $api_down_exception = new ApiDownException('FedEx API is down.');
      \Bugsnag::notifyException($api_down_exception);
      throw $api_down_exception;
    }
  }

  public function setData($key, $value)
  {
    $this->data[$key] = $value;
  }

}
