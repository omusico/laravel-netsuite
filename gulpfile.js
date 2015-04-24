var gulp   = require('gulp');
var concat = require('gulp-concat');

var buildDir = 'src/restlets/';

// ordering matters here
var library = [
  'src/restlets/Lib/Core.js',
  'src/restlets/Lib/Log.js',
  'src/restlets/Lib/Util.js',
  'src/restlets/Lib/Base.js',
  'src/restlets/Lib/Model.js',
  'src/restlets/Lib/Input.js',
  'src/restlets/Lib/Validator.js',
  'src/restlets/Lib/Controller.js',
  'src/restlets/Lib/Repository.js'
];

var customers = [
  'src/restlets/Customers/**/*.js'
];

gulp.task('default', function() {
  console.log('There is no default task.');
});

gulp.task('library', function()
{
  gulp
  .src(library)
  .pipe(concat('library.js'))
  .pipe(gulp.dest(buildDir));
});

gulp.task('customers', function()
{
  gulp
  .src(customers)
  .pipe(concat('customers.js'))
  .pipe(gulp.dest(buildDir));
});

gulp.task('watch', function()
{
  var libwatcher = gulp.watch(library,   ['library']);
  var cwatcher   = gulp.watch(customers, ['customers']);
});
