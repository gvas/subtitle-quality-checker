/*eslint-env node */
var path = require('path');
var webpack = require('webpack');
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');

module.exports = {
  context: path.join(__dirname, 'Scripts'),

  entry: {
    'server': './server',
    'client': './client',
    'vendors': [
      'material-ui/AppBar',
      'material-ui/Drawer',
      'material-ui/List',
      'material-ui/styles/themeManager',
      'react',
      'react-dom',
      'react-dropzone',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-tap-event-plugin',
      'redux',
      'redux-responsive',
    ],
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
    /*
    preloaders: [
      { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ],
    */
    loaders: [
      // JavaScript, JSX
      {
        // transform JavaScript files via Babel
        loader: 'babel',

        test: /\.jsx?$/,

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

      // linting
      {
        loader: 'eslint-loader',

        test: /\.js$/,

        exclude: /node_modules/,
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
    extensions: ['', '.js', '.jsx'],
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

    // split the client code into vendor and application
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      chunks: ['client', 'vendors'],
      minChunks: Infinity,
    }),
  ],

  watch: false,
};
