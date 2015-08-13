<?php namespace Johnnygreen\LaravelNetSuite\NetSuite\Repository;

interface RepositoryInterface {

  public function paginate($per_page, $page);
  public function create($attributes = []);
  public function find($id);
  public function update($model);
  public function destroy($id);

}
