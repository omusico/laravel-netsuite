var gulp   = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
  console.log('There is no default task.');
});

var fileList = [
  'src/restlets/Lib/Core.js',
  'src/restlets/Lib/Log.js',
  'src/restlets/Lib/Util.js',
  'src/restlets/Lib/Base.js',
  'src/restlets/Lib/Model.js',
  'src/restlets/Lib/Controller.js',
  'src/restlets/Lib/Repository.js',
  'src/restlets/Customers/**/*.js'
];

gulp.task('customers', function() {
  gulp
  .src(fileList)
  .pipe(concat('customers.js'))
  .pipe(gulp.dest('src/restlets/'));
});

gulp.task('watch', function () {
  var watcher = gulp.watch(fileList, ['customers']); // watch the same files in our scripts task

  // watcher.on('change', function (event) {
  //   if (event.type === 'deleted') {                   // if a file is deleted, forget about it
  //     delete cached.caches.scripts[event.path];       // gulp-cached remove api
  //     remember.forget('scripts', event.path);         // gulp-remember remove api
  //   }
  // });
});
