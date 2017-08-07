const path = require('path');

const webpack = require('webpack'),
      webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.js');

module.exports = function () {
  const babel = commonConfig.module.rules[0],
        plugins = babel.use.options.plugins;
  plugins.push("react-hot-loader/babel");

  commonConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
         return module.context && module.context.indexOf('node_modules') !== -1;
      }
    })
  );
  commonConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
    })
  );

  return webpackMerge(commonConfig, {
    devtool: 'inline-source-map',
    entry: {
      main: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './main.js'
      ]
    },
    output: {
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'] // note: css-loader run first
        },
        {
          test: /\.(sass|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          BROWSER: JSON.stringify(true),
          NODE_ENV: JSON.stringify('development')
        }
      })
    ]
  });
}
