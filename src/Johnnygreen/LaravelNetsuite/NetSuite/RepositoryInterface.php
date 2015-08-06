<?php namespace Johnnygreen\LaravelNetSuite\NetSuite;

interface RepositoryInterface {

  public function paginate();
  public function create();
  public function find();
  public function update();
  public function destroy();

}
