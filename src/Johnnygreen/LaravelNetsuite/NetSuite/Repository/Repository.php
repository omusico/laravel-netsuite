<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

use Guzzle\Http\Client;

class Repository implements RepositoryInterface {

  // the model name
  public $model;

  // config settings
  public $config;

  // crud and search endpoints
  public $endpoints = [
    'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=41&deploy=1'
  ];

  // search filters
  public $filters;

  // internals
  public $request;
  public $response;
  public $error;


  public function __construct($config = null)
  {
    if ( ! is_null($config)) $this->setConfig($config);
    $this->setClient(new Client);
  }

  public function getEndpoint($index = 0)
  {
    return array_get($this->endpoints, $index);
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

  public function setModel($model)
  {
    $this->model = $model;
    return $this;
  }

  public function getModel()
  {
    return $this->model;
  }

  public function getUrl($id = null)
  {
    return rtrim("{$this->url}/{$id}", '/');
  }

  public function buildAuthorization()
  {
    extract($this->getConfig());
    return "NLAuth nlauth_account={$account}, nlauth_email={$email}, nlauth_signature={$signature}, nlauth_role={$role}";
  }

  // helpers for request / response

  public function requestResource($method, $url, $body = [])
  {
    // builds request
    return $this->request('GET', $this->getEndpoint(), compact('method', 'url') + $body);

  }

  public function request($method, $url = null, $body = null, $headers = null)
  {
    $method = strtoupper($method);

    if (in_array($method, ['GET', 'DELETE']) and ! empty($body))
    {
      $query  = http_build_query($body);
      $pieces = explode('?', $url);
      $url    = $pieces[0];
      $query  = "{$pieces[1]}&{$query}";
      $url    = "{$url}?{$query}";
      $body   = null;
    }
    else
    {
      $body = json_encode($body);
    }

    $this->request = $this->client->createRequest($method, $url, $headers, $body);
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
    return object_get($this, 'response');
  }

  public function responseIsSuccessful()
  {
    if (isset($this->response))
    {
      try
      {
        $this->error = array_get($this->response->json(), 'error', null);
      }
      catch (\Exception $exception)
      {
        $this->error = [
          'code'    => 500,
          'message' => $exception->getMessage()
        ];
      }

      return $this->response->isSuccessful() && empty($this->error);
    }

    $this->error = [
      'code'    => 500,
      'message' => 'Response is not set.'
    ];

    return false;
  }

  public function getError()
  {
    if ( ! isset($this->error)) $this->responseIsSuccessful();

    return object_get($this, 'error');
  }

  public function getErrorCode()
  {
    return array_get($this->getError(), 'code');
  }

  public function getErrorMessage()
  {
    return array_get($this->getError(), 'message');
  }

  public function hasError()
  {
    return ! empty($this->getError());
  }

  public function hasErrorCode($code)
  {
    return $this->getErrorCode() == $code;
  }

  public function where($key, $operator, $value)
  {
    $this->filters[] = compact('key', 'operator', 'value');
    return $this;
  }

  public function paginate($per_page = null, $page = null)
  {
    $filters = $this->filters;
    $this->requestResource('GET', $this->getUrl(), compact('per_page', 'page', 'filters'));
    $this->send();
    return $this->convertResponseToCollection();
  }

  public function get()
  {
    $per_page   = 10;
    $page       = 1;
    $collection = $this->convertArrayToCollection([]);

    do
    {
      $items = $this->paginate($per_page, $page++);
      $collection = $collection->merge($this->convertArrayToCollection($items));
    }
    while( ! $items->isEmpty());

    return $collection;
  }

  public function yieldChunk($per_page = 20)
  {
    $page = 1;

    do
    {
      $items = $this->paginate($per_page, $page++);
      yield $items;
    }
    while( ! $items->isEmpty());
  }

  public function chunk($per_page = 20, $callback)
  {
    $page = 1;

    do
    {
      $items = $this->paginate($per_page, $page++);
      $callback($items);
    }
    while( ! $items->isEmpty());
  }

  public function first()
  {
    return $this->paginate(1, 1)->first();
  }

  public function find($ns_id)
  {
    $this->requestResource('GET', $this->getUrl($ns_id), compact('ns_id'));
    $this->send();
    return $this->convertResponseToModel();
  }

  // $external_id should be an array (i.e. ['customers_id' => 8672])
  public function findByExternalId($external_id)
  {
    // 'customers/:id'
    $this->requestResource('GET', $this->getUrl(reset($external_id)), $external_id);
    $this->send();
    return $this->convertResponseToModel();
  }

  public function create($attributes = [])
  {
    $this->requestResource('POST', $this->getUrl(), $attributes);
    $this->send();
    return $this->convertResponseToModel();
  }

  public function update($attributes)
  {
    $this->requestResource('PUT', $this->getUrl(array_get($attributes, 'ns_id')), $attributes);
    $this->send();
    return $this->convertResponseToModel();
  }

  public function destroy($ns_id)
  {
    $this->requestResource('DELETE', $this->getUrl($ns_id), compact('ns_id'));
    $this->send();
    return $this->responseIsSuccessful();
  }

  // $external_id should be an array (i.e. ['customers_id' => 8672])
  public function destroyByExternalId($external_id)
  {
    $this->request('DELETE', $this->getUrl(reset($external_id)), $external_id);
    $this->send();
    return $this->responseIsSuccessful();
  }

  // helpers for converting return json data into models
  public function convertArrayToModel(Array $attributes)
  {
    $class = $this->model;
    $model = new $class($attributes);
    $model->exists = ! is_null($model->getKey());

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
    if ($this->responseIsSuccessful())
    {
      return $this->convertArrayToModel($this->response->json());
    }
    else if ($this->hasErrorCode(404) || $this->hasErrorCode('RCRD_DSNT_EXIST'))
    {
      return null;
    }

    throw new RepositoryException($this->getErrorMessage() ?: 'There was an error communicating with the restlet.', (int)$this->getErrorCode() ?: 500);
  }

  public function convertResponseToCollection()
  {
    if ($this->responseIsSuccessful())
    {
      return $this->convertArrayToCollection($this->response->json());
    }

    throw new RepositoryException($this->getErrorMessage() ?: 'There was an error communicating with the restlet.', (int)$this->getErrorCode() ?: 500);
  }
}
