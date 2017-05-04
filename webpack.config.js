const path = require('path');

const webpack = require('webpack');

const SOURCE_DIR = path.resolve(__dirname, './src'),
      VIEWS_DIR = path.join(SOURCE_DIR, 'views'),
      COMPONENTS_DIR = path.join(VIEWS_DIR, 'components'),
      CONTAINERS_DIR = path.join(SOURCE_DIR, 'containers'),
      UTILS_DIR = path.join(SOURCE_DIR, 'utils'),
      MODELS_DIR = path.join(SOURCE_DIR, 'models'),
      ACTIONS_DIR = path.join(MODELS_DIR, 'actions'),
      REDUCERS_DIR = path.join(MODELS_DIR, 'reducers');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, './src'),
  entry: {
    main: './main.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              // "syntax-dynamic-import"
            ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'package.json': path.resolve(__dirname, './package.json'),
      utils: UTILS_DIR,
      models: MODELS_DIR,
      views: VIEWS_DIR,
      components: COMPONENTS_DIR,
      containers: CONTAINERS_DIR,
      actions: ACTIONS_DIR,
      reducers: REDUCERS_DIR
    }
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module) {
    //      return module.context && module.context.indexOf('node_modules') !== -1;
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'manifest'
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        WEB: JSON.stringify(true)
      }
    })
  ]
};
