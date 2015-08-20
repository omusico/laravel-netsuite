<?php namespace Johnnygreen\LaravelNetSuite\NetSuite;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model {

  public function getName()
  {
    return "{$this->customers_firstname} {$this->customers_lastname}";
  }

}
