<?php namespace Johnnygreen\LaravelNetSuite\NetSuite;

use Johnnygreen\LaravelNetSuite\NetSuite\Model;

class Promotion extends Model {

  protected $fillable = [
    'ns_id',
    'coupons_id',
  ];

}
