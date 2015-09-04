<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

use Guzzle\Http\Client;

class Repository implements RepositoryInterface {

  // the model name
  public $model;

  // config settings
  public $config;

  // crud and search endpoints
  public $endpoint_crud;
  public $endpoint_search;

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
  }

  public function getModel()
  {
    return $this->model;
  }

  public function setCrudEndpoint($endpoint)
  {
    $this->endpoint_crud = $endpoint;
  }

  public function getCrudEndpoint()
  {
    return $this->endpoint_crud;
  }

  public function setSearchEndpoint($endpoint)
  {
    $this->endpoint_search = $endpoint;
  }

  public function getSearchEndpoint($endpoint)
  {
    return $this->endpoint_search;
  }

  public function buildAuthorization()
  {
    extract($this->getConfig());
    return "NLAuth nlauth_account={$account}, nlauth_email={$email}, nlauth_signature={$signature}, nlauth_role={$role}";
  }

  // helpers for request / response

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

    $this->request = $this->client->createRequest($method, $url, $headers, json_encode($body));
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
        $this->error = new \StdClass;
        $this->error->code = 500;
        $this->error->message = $exception->getMessage();
      }

      return $this->response->isSuccessful() && empty($this->error);
    }

    $this->error = new StdClass;
    $this->error->code = 500;
    $this->error->message = 'Response is not set.';

    return false;
  }

  public function getError()
  {
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
    if ($this->responseIsSuccessful())
    {
      return $this->convertArrayToModel($this->response->json());
    }
    else if ($this->hasErrorCode(404) || $this->hasErrorCode('RCRD_DSNT_EXIST'))
    {
      return null;
    }

    throw new RepositoryException('There was an error communicating with the restlet.', 500);
  }

  public function convertResponseToCollection()
  {
    if ($this->hasError())
    {
      throw new RepositoryException($this->getErrorMessage(), $this->getErrorCode());
    }

    return $this->convertArrayToCollection($this->responseIsSuccessful() ? $this->response->json() : []);
  }

  public function where($key, $operator, $value)
  {
    $this->filters[] = compact('key', 'operator', 'value');
    return $this;
  }

  public function paginate($per_page = null, $page = null)
  {
    $filters = $this->filters;
    $this->request('GET', $this->endpoint_search, compact('per_page', 'page', 'filters'));
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
    $this->request('GET', $this->endpoint_crud, compact('ns_id'));
    $this->send();
    return $this->convertResponseToModel();
  }

  // $external_id should be an array (i.e. ['customers_id' => 8672])
  public function findByExternalId($external_id)
  {
    $this->request('GET', $this->endpoint_crud, $external_id);
    $this->send();
    return $this->convertResponseToModel();
  }

  public function create($attributes = [])
  {
    $this->request('POST', $this->endpoint_crud, $attributes);
    $this->send();
    return $this->convertResponseToModel();
  }

  public function update($attributes)
  {
    $this->request('PUT', $this->endpoint_crud, $attributes);
    $this->send();
    return $this->convertResponseToModel();
  }

  public function destroy($ns_id)
  {
    $this->request('DELETE', $this->endpoint_crud, compact('ns_id'));
    $this->send();
    return $this->responseIsSuccessful();
  }

  // $external_id should be an array (i.e. ['customers_id' => 8672])
  public function destroyByExternalId($external_id)
  {
    $this->request('DELETE', $this->endpoint_crud, $external_id);
    $this->send();
    return $this->responseIsSuccessful();
  }
}
