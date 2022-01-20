const path = require( 'path' )

const webpack = require( 'webpack' ),
      { merge } = require( 'webpack-merge' ),
      { CleanWebpackPlugin } = require( 'clean-webpack-plugin' ),
      MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
      TerserPlugin = require( 'terser-webpack-plugin' ),
      CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' ),
      LodashModuleReplacementPlugin = require( 'lodash-webpack-plugin' ),
      { WebpackManifestPlugin } = require( 'webpack-manifest-plugin' ),
      LoadablePlugin = require( '@loadable/webpack-plugin' )


const commonConfig = require( './base.js' )( false )

const DIST_DIR = path.resolve( __dirname, '../dist' ),
      LIBS_DIR = path.resolve( __dirname, '../server/libs' )

module.exports = ( env ) => {
  const isBuild = env && env.build || false
  // isPreview = env && env.preview || false

  const web_config = merge( commonConfig, {
    mode: isBuild ? 'production' : 'none',

    target: 'web',

    devtool: isBuild ? false : 'source-map',

    entry: {
      main: './main.jsx'
    },
    
    performance: {
      maxEntrypointSize: 400000,
      maxAssetSize: 320000
    },
  
    output: {
      publicPath: '', // this fix 'auto' prefix generated by webpack-manifest-plugin
      path: DIST_DIR,
      filename: isBuild ? '[name].[contenthash].js' : '[name].js',
      chunkFilename: isBuild ? '[name].[contenthash].js' : '[name].js'
    },

    optimization: {
      minimize: isBuild,
      minimizer: [ new TerserPlugin( {} ), new CssMinimizerPlugin() ]
    },

    plugins: [
      new CleanWebpackPlugin( { cleanOnceBeforeBuildPatterns: [ DIST_DIR ] } ),
      new LoadablePlugin(),
      new MiniCssExtractPlugin( { filename: isBuild ? '[name].[contenthash].css' : '[name].css' } ),
      new WebpackManifestPlugin(),
      new webpack.DefinePlugin( {
        'process.env': {
          BROWSER: JSON.stringify( true ),
          NODE_ENV: JSON.stringify( 'production' )
        }
      } )
    ]
  } )

      
  const mode = isBuild ? 'production' : 'development'
  const node_config = merge( commonConfig, {
    mode,

    target: 'node',

    devtool: false,

    entry: {
      app: './layout.jsx',
      utils: './utils/index',
      reducers: './models/reducers'
    },

    output: {
      path: LIBS_DIR,
      filename: '[name].js',
      libraryTarget: 'commonjs2'
    },

    // externals: /^[a-z\-0-9]+$/,
    externals: require( 'webpack-node-externals' )(),

    optimization: {
      runtimeChunk: false,
      splitChunks: false
    },
  
    plugins: [
      new LoadablePlugin(),
      new LodashModuleReplacementPlugin(),
      new CleanWebpackPlugin( { cleanOnceBeforeBuildPatterns: [ LIBS_DIR ] } ),
      new MiniCssExtractPlugin( {
        filename: 'dummy.css'
      } ),
      new webpack.DefinePlugin( {
        'process.env': {
          BROWSER: JSON.stringify( false ),
          NODE_ENV: JSON.stringify( mode )
        }
      } )
    ]
  } )

  return [ node_config, web_config ]
}