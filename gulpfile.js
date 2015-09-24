var gulp   = require('gulp');
var concat = require('gulp-concat');
var upload = require('gulp-nsupload');

var buildDir = 'src/restlets/dist/';
var baseDir  = 'src/restlets/src/';
var npmDir   = 'src/../node_modules/';
var bowerDir = 'src/../bower_components/';

// ordering matters here
var library = [
  bowerDir + 'lodash/lodash.min.js',
  bowerDir + 'moment/min/moment.min.js',
  npmDir   + 'path-parser/dist/umd/path-parser.js',
  baseDir  + 'Library/Core.js',
  baseDir  + 'Library/Log.js',
  baseDir  + 'Library/Util.js',
  baseDir  + 'Library/Base.js',
  baseDir  + 'Library/Model.js',
  baseDir  + 'Library/Input.js',
  baseDir  + 'Library/Validator.js',
  baseDir  + 'Library/Controller.js',
  baseDir  + 'Library/Router.js',
  baseDir  + 'Library/Repository.js'
];

var bootstraps = [
  baseDir + 'Bootstraps/**/*.js'
];

var resources = [{
  name  : 'customers',
  files : [
    baseDir + 'Customers/Address.js',
    baseDir + 'Customers/Customer.js',
    baseDir + 'Customers/CustomerSearchResult.js',
    baseDir + 'Customers/CustomerRepository.js',
    baseDir + 'Customers/CustomersController.js'
  ]
}, {
  name  : 'inventory_items',
  files : [
    baseDir + 'InventoryItems/InventoryItemLocation.js',
    baseDir + 'InventoryItems/InventoryItemPriceList.js',
    baseDir + 'InventoryItems/InventoryItem.js',
    baseDir + 'InventoryItems/InventoryItemSearchResult.js',
    baseDir + 'InventoryItems/InventoryItemRepository.js',
    baseDir + 'InventoryItems/InventoryItemsController.js'
  ]
}, {
  name  : 'sales_orders',
  files : [
    baseDir + 'SalesOrders/SalesOrderItem.js',
    baseDir + 'SalesOrders/SalesOrder.js',
    baseDir + 'SalesOrders/SalesOrderSearchResult.js',
    baseDir + 'SalesOrders/SalesOrderRepository.js',
    baseDir + 'SalesOrders/SalesOrdersController.js'
  ]
}, {
  name  : 'cash_sales',
  files : [
    baseDir + 'CashSales/CashSaleItem.js',
    baseDir + 'CashSales/CashSale.js',
    baseDir + 'CashSales/CashSaleSearchResult.js',
    baseDir + 'CashSales/CashSaleRepository.js',
    baseDir + 'CashSales/CashSalesController.js'
  ]
}, {
  name  : 'gift_certificates',
  files : [
    baseDir + 'GiftCertificates/GiftCertificate.js',
    baseDir + 'GiftCertificates/GiftCertificateSearchResult.js',
    baseDir + 'GiftCertificates/GiftCertificateRepository.js',
    baseDir + 'GiftCertificates/GiftCertificatesController.js'
  ]
}, {
  name  : 'promotions',
  files : [
    baseDir + 'Promotions/Promotion.js',
    baseDir + 'Promotions/PromotionSearchResult.js',
    baseDir + 'Promotions/PromotionRepository.js',
    baseDir + 'Promotions/PromotionsController.js'
  ]
}];

gulp.task('library', function()
{
  gulp.src(library)
      .pipe(concat('library.js'))
      .pipe(gulp.dest(buildDir));
});

gulp.task('bootstraps', function()
{
  gulp.src(bootstraps)
      .pipe(gulp.dest(buildDir));
});

gulp.task('upload', function(file)
{
  gulp.src(buildDir + '**/*.js')
      .pipe(upload(require('./netsuite.json')));
});

resources.forEach(function(resource)
{
  gulp.task(resource.name, function()
  {
    gulp.src(resource.files)
        .pipe(concat(resource.name + '.js'))
        .pipe(gulp.dest(buildDir));
  });
});

gulp.task('watch', function()
{
  var builds = buildDir + '**/*.js';

  gulp.watch(library, ['library']);

  resources.forEach(function(resource)
  {
    gulp.watch(resource.files, [resource.name]);
  });

  // only copy over bootstrap that changed
  gulp.watch(bootstraps, null, function(file)
  {
    gulp.src(file.path)
        .pipe(gulp.dest(buildDir));
  });

  // only upload the file that changes
  gulp.watch(builds, null, function(file)
  {
    gulp.src(file.path)
        .pipe(upload(require('./netsuite.json')));
  });
});

gulp.task('default', resources.map(function(resource) { return resource.name; }).concat(['library', 'bootstraps', 'upload']));
