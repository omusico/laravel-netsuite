<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

interface RepositoryInterface {

  public function paginate($per_page, $page);
  public function create();
  public function find();
  public function update();
  public function destroy();

}
