<?php namespace Johnnygreen\LaravelNetSuite\NetSuite;

use Johnnygreen\LaravelNetSuite\NetSuite\Model;

class Customer extends Model {

  protected $fillable = [
    'ns_id',
    'customers_id',
    'customers_firstname',
    'customers_lastname',
    'customers_telephone',
    'customers_email_address',
    'created_at',
    'updated_at',
    'addresses'
  ];

  public function getName()
  {
    return "{$this->customers_firstname} {$this->customers_lastname}";
  }

}
