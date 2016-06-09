/*eslint-env node */
var path = require('path');
var webpack = require('webpack');
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');

module.exports = {
  context: path.join(__dirname, 'Scripts'),

  entry: {
    'server': ['babel-polyfill', './server'],
    'client': ['babel-polyfill', './client'],
  },

  output: {
    path: path.join(__dirname, 'wwwroot'),
    filename: '[name].bundle.js',
    libraryTarget: 'this',
  },

  eslint: {
    configFile: '.eslintrc.json',
  },

  module: {
    preLoaders: [
      // linting
      {
        loader: 'eslint-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
    loaders: [
      // javascript transpilation
      {
        loader: 'babel',

        test: /\.js$/,

        // skip any files outside of the project's Content directory
        include: [
          path.resolve(__dirname, 'Scripts'),
        ],

        query: {
          plugins: [
            // replace babel's repeated helper functions with calls to the babel-runtime package
            'transform-runtime',
          ],

          presets: ['es2015', 'stage-0', 'react'],
        },
      },

      // SASS
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
      },

      // image- and font URLs
      {
        test: /\.(png|svg|woff2?|eot|ttf)$/,
        // inline small files into the css, but copy large files into the build dir
        loader: 'url-loader?limit=10000&name=[path][name].[ext]?[hash:6]',
      },
    ],
  },

  resolve: {
    // allow require('./blah') to require blah.jsx
    extensions: ['', '.js'],
  },

  plugins: [
    // beep on errors
    new BellOnBundlerErrorPlugin(),

    // optimize react in production build
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    // minimize the bundles
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],

  watch: false,
};
