/// <binding ProjectOpened='dev' />
/*eslint-env node*/
const gulp = require('gulp')
const gutil = require('gulp-util')
const webpack = require('webpack')
const config = require('./webpack.config.js')
const shell = require('gulp-shell')

/**
  Tailors the baseline webpack config object for the environment.
  @param {Boolean} dev - True when in development mode, false otherwise.
  @returns {Object} - The webpack configuration object.
*/
function makeWebPackConfig(dev) {
  if (dev) {
    config.plugins = config.plugins.filter(function (plugin) {
      return !(plugin instanceof webpack.optimize.UglifyJsPlugin) &&
        !(plugin instanceof webpack.DefinePlugin)
    })
  }

  config.watch = dev

  return config;
}

gulp.task('dnu-restore-build', shell.task([
  'dnu restore',
  'dnu build',
]))

gulp.task('dev', ['dnu-restore-build'], function () {
  webpack(makeWebPackConfig(true), function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false,
    }))

    // don't invoke callback because it would end the gulp task
  })
})

gulp.task('build', ['dnu-restore-build'], function (callback) {
  webpack(makeWebPackConfig(false), function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false,
    }))

    callback()
  })
})
