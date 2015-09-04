<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

class CashSale extends Repository {

  public $model          = 'Johnnygreen\LaravelNetSuite\NetSuite\CashSale';
  public $endpoint_batch = 'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=34&deploy=1';
  public $endpoint       = 'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=33&deploy=1';

}
