const fs = require('fs'),
      path = require('path');

const webpack = require('webpack'),
      webpackMerge = require('webpack-merge'),
      ManifestPlugin = require('webpack-manifest-plugin');

const commonConfig = require('./webpack.config.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const LIBS_DIR = path.resolve(__dirname, './server/libs');

module.exports = function (env) {
  const isChunkHash = env && env.chunkhash;

  const web_config = webpackMerge(commonConfig, {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: 'css-loader'
          })
        },
        {
          test: /\.(sass|scss)$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader']
          })
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
           return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest'
      }),
      new ExtractTextPlugin(isChunkHash ? 'main.[chunkhash].css' : 'main.css'),
      new ManifestPlugin()
    ]
  });

  // clean up the output folder
  fs.readdirSync(web_config.output.path).forEach((file) => {
    fs.unlinkSync(path.join(web_config.output.path, file));
  });

  if (isChunkHash) {
    web_config.devtool = 'cheap-module-source-map';
    web_config.output.filename = '[name].[chunkhash].js';
  }

  const node_config = {
    // target: 'node',
    target: 'async-node',
    devtool: 'eval',
    entry: {
      App: './views/components/App.js',
      utils: './utils',
      reducers: './models/reducers'
    },
    output: {
      path: LIBS_DIR,
      filename: '[name].js',
      libraryTarget: 'commonjs'
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'dummy.css',
        allChunks: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          WEB: JSON.stringify(false),
          NODE_ENV: JSON.stringify('production')
        }
      })
    ],
    externals: [
      {
        'isomorphic-fetch': {
          root: 'isomorphic-fetch',
          commonjs2: 'isomorphic-fetch',
          commonjs: 'isomorphic-fetch',
          amd: 'isomorphic-fetch'
        }
      }
    ]
  };
  node_config.__proto__ = web_config;

  return [web_config, node_config];
}
