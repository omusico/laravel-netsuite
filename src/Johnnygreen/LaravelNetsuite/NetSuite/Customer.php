<?php namespace Johnnygreen\LaravelNetSuite\NetSuite;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model {

  protected $fillable = [
    'id',
    'customers_id',
    'customers_firstname',
    'customers_lastname',
    'customers_telephone',
    'customers_email_address',
    'created_at',
    'updated_at',
    'addresses'
  ];

  protected function getDateFormat()
	{
		return 'Y-m-d H:i:s';
	}

  public function getName()
  {
    return "{$this->customers_firstname} {$this->customers_lastname}";
  }

}
