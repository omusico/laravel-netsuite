<?php namespace Johnnygreen\LaravelNetSuite\NetSuite;

use Johnnygreen\LaravelNetSuite\NetSuite\Model;

class GiftCertificate extends Model {

  protected $fillable = [
    'ns_id',
    'gift_cards_id',
  ];

}
