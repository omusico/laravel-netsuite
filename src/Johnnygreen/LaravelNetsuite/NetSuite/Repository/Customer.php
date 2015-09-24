<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

class Customer extends Repository {

  public $model           = 'Johnnygreen\LaravelNetSuite\NetSuite\Customer';
  public $controller      = 'CustomersController';
  // public $endpoint_crud   = 'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=26&deploy=5';
  // public $endpoint_search = 'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=27&deploy=2';

  // public function findByExternalId($customers_id)
  // {
  //   return parent::findByExternalId(compact('customers_id'));
  // }

}
