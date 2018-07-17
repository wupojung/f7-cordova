const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const shell = require('gulp-shell');

var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./package.json'));


// Server
function server() {
  connect.server({
    root: ['./'],
    livereload: false,
    port: '3000',
  });
}

gulp.task('server', () => {
  //if (env === 'development') watch.all();
  server();
  gulp.src('./web/www/index.html').pipe(gopen({ uri: 'http://localhost:3000/web/www/' }));
});


gulp.task('drop-app', () => {
  gulp.src('./app/').pipe(clean());
});

gulp.task('create-app', shell.task([
  'cordova create app '+json.appid+'  '+json.displayName
]));

gulp.task('clean-app', () => {
  console.log("cleaning  floder -> ./app/www");
  gulp.src('./app/www').pipe(clean());
});

gulp.task('setup-app',shell.task([
  'echo Copying Web To App ...',
  'xcopy "./web/www" "./app/www" /E /I /Q /Y',
  'echo Add Browser platforms for cordova ...',
  'cd app && cordova platforms add browser',
]));


gulp.task('run-app',shell.task([
  'echo Starting Server for Debug...',
  'cd app && cordova serve',
]));


gulp.task('build-app', () => runSequence(
	'drop-app'
	,'create-app'
	,'clean-app'
	,'setup-app'
));
