var gulp   = require('gulp');
var concat = require('gulp-concat');
var upload = require('gulp-nsupload');

var buildDir  = 'src/restlets/dist/';
var baseDir   = 'src/restlets/src/';
var vendorDir = 'src/restlets/vendor/';

// ordering matters here
var library = [
  vendorDir + 'lodash/lodash.min.js',
  vendorDir + 'moment/min/moment.min.js',
  baseDir + 'Library/Core.js',
  baseDir + 'Library/Log.js',
  baseDir + 'Library/Util.js',
  baseDir + 'Library/Base.js',
  baseDir + 'Library/Model.js',
  baseDir + 'Library/Input.js',
  baseDir + 'Library/Validator.js',
  baseDir + 'Library/Controller.js',
  baseDir + 'Library/Router.js',
  baseDir + 'Library/Repository.js'
];

var customers = [
  baseDir + 'Customers/Address.js',
  baseDir + 'Customers/Customer.js',
  baseDir + 'Customers/CustomerSearchResult.js',
  baseDir + 'Customers/CustomerRepository.js',
  baseDir + 'Customers/CustomersController.js'
];

var inventoryItems = [
  baseDir + 'InventoryItems/InventoryItemLocation.js',
  baseDir + 'InventoryItems/InventoryItemPriceList.js',
  baseDir + 'InventoryItems/InventoryItem.js',
  baseDir + 'InventoryItems/InventoryItemSearchResult.js',
  baseDir + 'InventoryItems/InventoryItemRepository.js',
  baseDir + 'InventoryItems/InventoryItemsController.js'
];

var salesOrders = [
  baseDir + 'SalesOrders/SalesOrder.js',
  baseDir + 'SalesOrders/SalesOrderSearchResult.js',
  baseDir + 'SalesOrders/SalesOrderRepository.js',
  baseDir + 'SalesOrders/SalesOrdersController.js'
];

var bootstraps = [
  baseDir + 'Bootstraps/**/*.js'
];

gulp.task('library', function()
{
  gulp.src(library)
      .pipe(concat('library.js'))
      .pipe(gulp.dest(buildDir));
});

gulp.task('customers', function()
{
  gulp.src(customers)
      .pipe(concat('customers.js'))
      .pipe(gulp.dest(buildDir));
});

gulp.task('inventoryItems', function()
{
  gulp.src(inventoryItems)
      .pipe(concat('inventory_items.js'))
      .pipe(gulp.dest(buildDir));
});

gulp.task('salesOrders', function()
{
  gulp.src(salesOrders)
      .pipe(concat('sales_orders.js'))
      .pipe(gulp.dest(buildDir));
});

gulp.task('bootstraps', function()
{
  gulp.src(bootstraps)
      .pipe(gulp.dest(buildDir));
});

gulp.task('upload', function()
{
  gulp.src(buildDir + '**/*.js')
      .pipe(upload(require('./netsuite.json')));
});

gulp.task('watch', function()
{
  gulp.watch(library,               ['library']);
  gulp.watch(customers,             ['customers']);
  gulp.watch(inventoryItems,        ['inventoryItems']);
  gulp.watch(salesOrders,           ['salesOrders']);
  gulp.watch(bootstraps,            ['bootstraps']);
  gulp.watch(buildDir + '**/*.js',  ['upload']);
});

gulp.task('default', ['library', 'customers', 'inventoryItems', 'salesOrders', 'bootstraps', 'upload']);
