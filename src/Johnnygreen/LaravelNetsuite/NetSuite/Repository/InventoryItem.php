<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

class InventoryItem extends Repository {

  public $model          = 'Johnnygreen\LaravelNetSuite\NetSuite\InventoryItem';
  public $endpoint_batch = 'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=29&deploy=1';
  public $endpoint       = 'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=30&deploy=1';

}
