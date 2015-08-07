<?php namespace Johnnygreen\LaravelNetSuite\NetSuite;

use Guzzle\Http\Client;

class Repository {

  // the guzzle instance
  public $client;

  // api resource name
  // public $resource;

  // the model name
  public $model;

  // config settings
  public $config;

  public function __construct($endpoint = null, $config = [])
  {
    $this->setConfig($config);
    $this->setClient(new Client($endpoint));
  }

  public function setConfig($config)
  {
    $this->config = $config;
    return $this;
  }

  public function getConfig()
  {
    return $this->config;
  }

  public function setClient($client)
  {
    $this->client = $client;
    return $this;
  }

  public function getClient()
  {
    return $this->client;
  }

  // public function setResource($resource)
  // {
  //   $this->resource = $resource;
  // }
  //
  // public function getResource()
  // {
  //   return $this->resource;
  // }

  public function setModel($model)
  {
    $this->model = $model;
  }

  public function getModel()
  {
    return $this->model;
  }

  public function buildAuthorization()
  {
    extract($this->getConfig());
    return "NLAuth nlauth_account: {$account}, nlauth_email: {$email}, nlauth_signature: {$signature}, nlauth_role: {$role}"
  }

  // helpers for request / response

  public function request($method, $url = null, $body = null, $headers = null)
  {
    $method = strtoupper($method);

    if ($method == 'GET' and ! empty($body))
    {
      $query = '';
      $query = http_build_query($body);
      $url   = "{$url}?{$query}";
    }

    $this->request = $this->getClient()->createRequest($method, $url, $headers, $body);
    $this->request->setHeader('Authorization', $this->buildAuthorization());
    $this->request->setHeader('Content-Type', 'application/json');
    $this->request->setHeader('Accept',       'application/json');

    return $this->request;
  }

  public function send()
  {
    try
    {
      $this->response = $this->request->send();
    }
    catch (\Exception $e)
    {
      $this->response = $e->getResponse();
    }

    return $this->response;
  }

  public function response()
  {
    return $this->response;
  }

  public function responseOkay()
  {
    return isset($this->response) ? $this->response->isSuccessful() : false;
  }

  // helpers for converting return json data into models

  public function convertArrayToModel(Array $attributes)
  {
    $class = $this->model;
    $model = new $class;
    $model->setRawAttributes($attributes);
    return $model;
  }

  public function convertArrayToCollection(Array $array)
  {
    $class = $this->model;
    $collection = with(new $class)->newCollection($array);

    return $collection->map(function($attributes)
    {
      return $this->convertArrayToModel($attributes);
    });
  }

  public function convertArrayToPaginator(Array $array, $total, $per_page = 15)
  {
    $items = $this->convertArrayToCollection($array);
    return \Paginator::make($items->all(), $total, $per_page);
  }

  public function convertResponseToModel()
  {
    return $this->response()->isSuccessful() ? $this->convertArrayToModel($this->response()->json()) : null;
  }

  public function convertResponseToCollection()
  {
    return $this->convertArrayToCollection($this->response()->isSuccessful() ? $this->response()->json() : []);
  }

  public function convertResponseToPaginator($per_page = 15)
  {
    $items = $this->response()->isSuccessful() ? array_get($this->response()->json(), 'data') : [];
    $total = array_get($this->response()->json(), 'total', 0);
    return $this->convertArrayToPaginator($items, $total, $per_page);
  }
}
