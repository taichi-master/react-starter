const path = require( 'path' )

const webpack = require( 'webpack' ),
      webpackMerge = require( 'webpack-merge' ),
      HtmlWebpackPlugin = require( 'html-webpack-plugin' )

const distFolder = 'dist'
const commonConfig = require( './base.js' )( true )

module.exports = env => webpackMerge( commonConfig, {
  mode: 'development',

  devtool: 'inline-source-map',

  // entry: [ '@babel/polyfill', './src/main.js' ],
  entry: {
    main: [
      './main.js',
      '@babel/polyfill', // required by jest
      'webpack-hot-middleware/client' // required by webpack-hot-middleware
    ]
  },

  output: {
    publicPath: '/'
  },

  devServer: {
    contentBase: path.resolve( __dirname, distFolder ),
    hot: true
  },

  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'React Sample App',
    //   inject: false,
    //   template: require( 'html-webpack-template' ),
    //   appMountId: 'root'
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify( true ),
        NODE_ENV: JSON.stringify( 'development' )
      }
    })
  ]
})