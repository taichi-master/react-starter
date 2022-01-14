const path = require( 'path' )

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )

// const pkg = require( '../package.json' ),
//       webpack = require( 'webpack' ),
//       HtmlWebpackPlugin = require( 'html-webpack-plugin' )

const SOURCE_DIR = path.resolve( __dirname, '../src' ),
      SERVER_DIR = path.resolve( __dirname, '../server' ),
      STYLES_DIR = path.join( SOURCE_DIR, 'styles' ),
      TEST_DIR = path.resolve( __dirname, '../test' ),
      NODE_MODULES_DIR = path.resolve( __dirname, '../node_modules' ),
      PACKAGE_JSON = path.resolve( __dirname, '../package.json' ),
      ROUTES_DIR = path.join( SOURCE_DIR, 'routes' ),
      COMPONENTS_DIR = path.join( SOURCE_DIR, 'components' ),
      MODELS_DIR = path.join( SOURCE_DIR, 'models' ),
      CONSTANTS_DIR = path.join( MODELS_DIR, 'constants' )

const babel = {
  loader: 'babel-loader',
  options: {
    plugins: [
      // "syntax-dynamic-import"
    ]
  }
}

module.exports = isDev => ( {
  context: SOURCE_DIR,

  mode: 'none',

  devtool: false,

  stats: {
    children: true
  },

  resolve: {
    alias: {
      'package.json': PACKAGE_JSON,
      'react-dom': isDev ? '@hot-loader/react-dom' : 'react-dom',
      server: SERVER_DIR,
      styles: STYLES_DIR,
      test: TEST_DIR,
      node_modules: NODE_MODULES_DIR,
      src: SOURCE_DIR,
      models: MODELS_DIR,
      constants: CONSTANTS_DIR,
      routes: ROUTES_DIR,
      components: COMPONENTS_DIR
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [ /node_modules/ ],
        use: isDev ? [ babel, 'react-hot-loader/webpack' ] : babel
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [ '@svgr/webpack' ]
      }
      // {
      //   test: /\.(png|jp(e*)g|svg|gif)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: 'images/[hash]-[name].[ext]'
      //       }
      //     }
      //   ]
      // }
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // }      
      // { test: /\.(eot|otf|png|svg|ttf|woff|woff2?)(\?.+)?$/, loader: 'url-loader' }
    ]
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }      
    }
  },

  plugins: [
    // new HtmlWebpackPlugin({
    //   inject: false,
    //   template: require('html-webpack-template'),
    //   title: pkg.name,
    //   mobile: true,
    //   lang: 'en-US',
    //   meta: [
    //     {
    //       name: 'description',
    //       content: pkg.description
    //     },
    //     {
    //       name: 'keywords',
    //       content: pkg.keywords.join(', ')
    //     }
    //   ],
    //   googleAnalytics: {
    //     trackingId: pkg.cfg.googleAnalytics.trackingId,
    //     pageViewOnLoad: pkg.cfg.googleAnalytics.pageViewOnLoad
    //   },
    //   window: {
    //     __INITIAL_STATE__: pkg.cfg.initialState
    //   },
    //   appMountId: 'app'
    // })
  ]
} )