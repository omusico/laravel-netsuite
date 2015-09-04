<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

class SalesOrder extends Repository {

  public $model           = 'Johnnygreen\LaravelNetSuite\NetSuite\SalesOrder';
  public $endpoint_crud   = 'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=31&deploy=1';
  public $endpoint_search = 'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=32&deploy=1';

}
