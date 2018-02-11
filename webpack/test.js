const path = require('path');

const webpack = require('webpack'),
      webpackMerge = require('webpack-merge');

const commonConfig = require('./base.js');

module.exports = function () {
  // const babel = commonConfig.module.rules[0],
  //       plugins = babel.use.options.plugins;
  // plugins.push("transform-object-rest-spread");

  return webpackMerge(commonConfig, {
    target: 'node',
    devtool: 'eval',
    // entry: {
    //   main: [
    //     'react-hot-loader/patch',
    //     'webpack-hot-middleware/client',
    //     './main.js'
    //   ]
    // },
    // output: {
    //   publicPath: '/'
    // },
    // module: {
    //   rules: [
    //     {
    //       test: /\.css$/,
    //       use: ['style-loader', 'css-loader'] // note: css-loader run first
    //     },
    //     {
    //       test: /\.(sass|scss)$/,
    //       use: [
    //         'style-loader',
    //         'css-loader',
    //         'sass-loader',
    //       ]
    //     }
    //   ]
    // },
    // externals: {
    //   // 'cheerio': 'window',
    //   'react/addons': true,
    //   'react/lib/ExecutionEnvironment': true,
    //   'react/lib/ReactContext': true
    // }
  });
}
