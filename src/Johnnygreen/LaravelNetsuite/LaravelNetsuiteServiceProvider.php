<?php namespace Johnnygreen\LaravelNetSuite;

use Illuminate\Support\ServiceProvider;

class LaravelNetSuiteServiceProvider extends ServiceProvider {

	/**
	 * Indicates if loading of the provider is deferred.
	 *
	 * @var bool
	 */
	protected $defer = true;

	/**
	 * Bootstrap the application events.
	 *
	 * @return void
	 */
	public function boot()
	{
		$this->package('johnnygreen/laravel-netsuite', 'NetSuite');

		$this->app['netsuite'] = $this->app->share(function($app)
		{
			$manager = new Manager();
			$manager->setConfig($app['config']->get('NetSuite::config'));
			return $manager;
		});
	}

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
		//
	}

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return array('netsuite');
	}

}
