var _ = require('lodash');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackClientConfig = require('./webpack.config.js')[0];
var spawn = require('child_process').spawn;
var node;

gulp.task('default', ['webpack-dev-server','server-task','server']);

gulp.task('webpack-dev-server', function(callback) {
	// modify some webpack config options
	var myConfig = _.clone(webpackClientConfig);
  var compiler = webpack(myConfig);

	// Start a webpack-dev-server
	var server = new WebpackDevServer(compiler, {
    publicPath: myConfig.output.publicPath,
    stats: {
			colors: true
		}
	});
  server.listen(myConfig.devServer.port)
});

gulp.task('server', function() {
  gulp.watch('./app/server/index.js', ['server-task']);
  gulp.watch('./app/server/**/*.js',  ['server-task']);
});

gulp.task('server-task', function() {
  if (node) node.kill()
  node = spawn('node', ['app/server/index.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});
