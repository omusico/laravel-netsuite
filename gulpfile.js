var gulp   = require('gulp');
var concat = require('gulp-concat');
var upload = require('gulp-nsupload');

var buildDir = 'src/restlets/dist/';
var baseDir  = 'src/restlets/src/';

// ordering matters here
var library = [
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
  baseDir + 'Customers/**/*.js'
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

gulp.task('upload', function()
{
  var config = require('./netsuite.json');
  if (config) gulp.src(buildDir + '**/*.js').pipe(upload(config));
});

gulp.task('watch', function()
{
  gulp.watch(library,   ['library']);
  gulp.watch(customers, ['customers']);
  gulp.watch(buildDir,  ['upload']);
});

gulp.task('default', ['library', 'customers', 'upload']);
