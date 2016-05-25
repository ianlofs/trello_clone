var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var merge = require('webpack-merge');
var webpack = require('webpack');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/client/index.html',
  filename: 'index.html',
  inject: 'body'
});

var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const TARGET = process.env.npm_lifecycle_event;
console.log("target event is " + TARGET);


var commonClientConfig = {
  context: path.join(__dirname, 'app', 'client'),
  name: "Trello Clone Client",
  entry: "./index.js",
  target: "web",
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
      },
      {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
      },
      {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
      },
      {
        test: /\.(eot|ttf|svg|gif|png)$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/app/client/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  postcss: function() {
    return [autoprefixer({
      browsers: ['last 3 versions']
    })];
  }
};

var serverConfig = {
  context: path.join(__dirname, 'app', 'server'),
  name: "Trello Clone Server",
  entry: "./index.js",
  target: "node",
  output: {
    filename: "server.bundle.js",
    path: path.join(__dirname, 'build', 'server'),
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  externals: nodeModules
};
var clientConfig;
if (TARGET === 'dev' || !TARGET) {
    clientConfig = merge(commonClientConfig, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      port: 8080
    },
    output: {
      path: path.join(__dirname, 'app', 'client'),
      filename: "client.bundle.js",
      publicPath: "/public"
    }
  });
}
if (TARGET === 'build') {
  clientConfig = merge(commonClientConfig, {
    devtool: 'source-map',
    output: {
      filename: "client.bundle.js",
      path: path.join(__dirname, 'build', 'client'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: __dirname + '/app/client/index.html',
        filename: 'index.html',
        inject: 'body'
      })
    ]
  });
}

module.exports = [clientConfig, serverConfig]
