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
  name  : 'promotions',
  files : [
    baseDir + 'Promotions/Promotion.js',
    baseDir + 'Promotions/PromotionItem.js',
    baseDir + 'Promotions/PromotionSearchResult.js',
    baseDir + 'Promotions/PromotionRepository.js',
    baseDir + 'Promotions/PromotionsController.js'
  ]
}, {
  name  : 'coupons',
  files : [
    baseDir + 'Coupons/Coupon.js',
    baseDir + 'Coupons/CouponSearchResult.js',
    baseDir + 'Coupons/CouponRepository.js',
    baseDir + 'Coupons/CouponsController.js'
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
    baseDir + 'SalesOrders/SalesOrderGiftCertRedemption.js',
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
}];

gulp.task('library', function()
{
  return gulp.src(library)
             .pipe(concat('library.js'))
             .pipe(gulp.dest(buildDir));
});

gulp.task('resources', function()
{
  return gulp.src([].concat.apply([], resources.map(function(resource) { return resource.files; })))
             .pipe(concat('resources.js'))
             .pipe(gulp.dest(buildDir));
});

gulp.task('bootstraps', function()
{
  return gulp.src(bootstraps)
             .pipe(gulp.dest(buildDir));
});

gulp.task('upload', ['library', 'resources', 'bootstraps'], function(file)
{
  gulp.src(buildDir + '**/*.js')
      .pipe(upload(require('./netsuite.json')));
});

gulp.task('watch', function()
{
  gulp.watch(library, ['library']);

  gulp.watch([].concat.apply([], resources.map(function(resource) { return resource.files; })), ['resources']);

  // only copy over bootstrap that changed
  gulp.watch(bootstraps, null, function(file)
  {
    gulp.src(file.path)
        .pipe(gulp.dest(buildDir));
  });

  // only upload the file that changes
  gulp.watch(buildDir + '**/*.js', null, function(file)
  {
    gulp.src(file.path)
        .pipe(upload(require('./netsuite.json')));
  });
});

gulp.task('default', ['upload']);
