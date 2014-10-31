/** 

To install node dependencies:

npm install --save gulp gulp-livereload serve-static connect

To use liveReload, add this to your page:

<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>

*/
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    dest = './www';

gulp.task('server', function(next) {
  var server = connect();
  var PORT = process.env.PORT || 8000;
  server
    .use(serveStatic(dest))
    .listen(PORT, function() {
      console.log(">>> Listening on port ", PORT);
      next();
    });
});

gulp.task('watch', ['server'], function() {
  var server = livereload();
  gulp.watch(dest + '/**').on('change', function(file) {
      server.changed(file.path);
  });
});

gulp.task('default', ['watch']);
