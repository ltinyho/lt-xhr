const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const plugins = [
  new UglifyJsPlugin({
    parallel: true,
    uglifyOptions: {
      ie8: false,
      ecma: 6,
      warnings: true,
      mangle: isProd, // debug false
      output: {
        comments: false,
        beautify: !isProd,  // debug true
      },
    },
    sourceMap: true,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      // eslint-disable-line quote-props
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new HtmlWebpackPlugin({
    title: require('./package').name,
    template: '!!ejs-loader!src/index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      tslint: {
        emitErrors: true,
        failOnHint: true,
      },
    },
  }),
];

if (!isProd) {
  plugins.push(new DashboardPlugin());
}

var config = {
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  context: path.resolve('./src'),
  entry: './index.ts',
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts?$/,
        exclude: ['node_modules'],
        use: ['awesome-typescript-loader', 'source-map-loader'],
      },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: plugins,
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    compress: true,
    port: 3000,
    hot: true,
  },
};
if (isProd) {
  config.externals = {
    axios: 'axios',
    'lru-cache': 'lru-cache',
  };
}
module.exports = config;
