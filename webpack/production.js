const path = require( 'path' )

const webpack = require( 'webpack' ),
      webpackMerge = require( 'webpack-merge' ),
      CleanWebpackPlugin = require( 'clean-webpack-plugin' ),
      MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
      TerserJSPlugin = require( 'terser-webpack-plugin' ),
      OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' ),
      ManifestPlugin = require( 'webpack-manifest-plugin' )

const commonConfig = require( './base.js' )( false )

const DIST_DIR = path.resolve( __dirname, '../dist' ),
      LIBS_DIR = path.resolve( __dirname, '../server/libs' )

module.exports = ( env ) => {
  const isBuild = env && env.build || false,
        isDist = env && env.dist || false

  const web_config = webpackMerge( commonConfig, {
    mode: isDist ? 'production' : 'none',

    devtool: isBuild ? 'source-map' : false,

    entry: {
      main: './main.js'
    },
  
    output: {
      path: DIST_DIR,
      filename: isDist ? '[name].[contenthash].js' : '[name].js'
    },

    optimization: {
      minimizer: isDist ? [ new TerserJSPlugin( {} ), new OptimizeCSSAssetsPlugin( {} ) ] : []
    },

    plugins: [
      new CleanWebpackPlugin( { cleanOnceBeforeBuildPatterns: [ DIST_DIR, LIBS_DIR ] } ),
      new MiniCssExtractPlugin( { filename: isDist ? '[name].[contenthash].css' : '[name].css' } ),
      new ManifestPlugin(),
      new webpack.DefinePlugin( {
        'process.env': {
          BROWSER: JSON.stringify( true ),
          NODE_ENV: JSON.stringify( 'production' )
        }
      } )
    ]
  } )

  const node_config = webpackMerge( commonConfig, {
    mode: isDist ? 'production' : 'development',

    target: 'node',

    devtool: 'none',

    entry: {
      App: './views/components/app',
      reducers: './models/reducers'
    },

    output: {
      path: LIBS_DIR,
      filename: '[name].js',
      libraryTarget: 'commonjs2'
    },

    externals: /^[a-z\-0-9]+$/,

    optimization: {
      runtimeChunk: false
    },

    plugins: [
      new MiniCssExtractPlugin( {
        filename: 'dummy.css',
        allChunks: true
      } ),
      new webpack.DefinePlugin( {
        'process.env': {
          BROWSER: JSON.stringify( false ),
          NODE_ENV: JSON.stringify( 'production' )
        }
      } )
    ]
  } )

  return [ web_config, node_config ]
}
