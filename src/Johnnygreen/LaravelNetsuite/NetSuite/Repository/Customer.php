<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

class Customer extends Repository {

  public $model          = 'Johnnygreen\LaravelNetSuite\NetSuite\Customer';
  public $endpoint_batch = 'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=27&deploy=1';
  public $endpoint       = 'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=26&deploy=2';

}
