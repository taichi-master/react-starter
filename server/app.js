const path = require( 'path' ),
      resolvePath = folder => path.resolve( __dirname, folder )

const express = require( 'express' ),
      ejs = require( 'ejs' ),
      compression = require( 'compression' ),
      favicon = require( 'serve-favicon' ),
      bodyParser = require( 'body-parser' ),
      logger = require( 'morgan' ),
      app = express()

const pkg = require( '../package.json' ),
      dist = {
        'vendors.js': 'vendors.js',
        'runtime.js': 'runtime.js',
        'main.js': 'main.js',
        'main.css': 'main.css'
      },
      isDev = process.env.NODE_ENV === 'development'

// @loadable/component      
const { ChunkExtractor } = require( '@loadable/server' ),
      statsFile = resolvePath( 'libs/loadable-stats.json' ),
      extractor = new ChunkExtractor( { statsFile } )

// React and Redux.
const React = require( 'react' ),
      ReactDOMServer = require( 'react-dom/server' ),
      { StaticRouter } = require( 'react-router-dom/server' ),

      App = isDev ? null : require( './libs/App' ).default,
      // { createStore, applyMiddleware } = require( 'redux' ), // server side redux
      { createStore } = require( 'redux' ), // server side redux
      { Provider } = require( 'react-redux' ),
      // thunkMiddleware = require( 'redux-thunk' ).default,
      // store = isDev ? null : createStore( require( './libs/reducers' ).default, pkg.cfg.initialState, applyMiddleware( thunkMiddleware ))
      store = isDev ? null : createStore( require( './libs/reducers' ).default, pkg.cfg.initialState )

function setRoutes ( app ) {
  app.use( compression() )
  app.use( favicon( resolvePath( '../assets/favicon.ico' ) ) )
  app.use( '/', express.static( resolvePath( '../assets' ) ) )
  app.use( '/', express.static( resolvePath( '../dist' ) ) )
  app.use( bodyParser.json() )
  app.use( bodyParser.urlencoded( { extended: false } ) )
  app.use( logger( 'dev' ) )

  // REST API
  app.use( '/api/sleep', require( './api/sleep' ) )
  app.enable( 'trust proxy' )

  // main
  app.get( '*', function ( req, res ) {
    const context = {}

    const appHtml = isDev ? '<h1>Loading...</h1>' : ReactDOMServer.renderToString(
      React.createElement( Provider, { store },
        React.createElement( StaticRouter, { location:req.url, context },
          extractor.collectChunks(
            React.createElement( App )
          )
        )
      )
    )

    if ( context.url ) {
      res.writeHead( 301, {
        Location: context.url
      } )
      res.end()
    } else {
      const data = {
              title: 'react-starter',
              appHtml,
              initialState: JSON.stringify( pkg.cfg.initialState ),
              styles: [
                dist['main.css']
              ],
              scripts: [
                dist['vendors.js'],
                dist['runtime.js'],
                dist['main.js']
              ]
            },
            options = {}
      
      ejs.renderFile( resolvePath( 'index.ejs' ), data, options, function ( err, str ) {
        if ( err )
          res.status( 500 ).send( err )
        else
          res.send( str )  
      } )
    }
  } )
}

if ( isDev ) {
  try {
    // Hot reload
    const webpack = require( 'webpack' ),
          config = require( '../webpack/development.js' )(),
          compiler = webpack( config )

    app.use( require( 'webpack-dev-middleware' )( compiler, {
      publicPath: config.output.publicPath,
      stats: { colors: true }
    } ) )

    app.use( require( 'webpack-hot-middleware' )( compiler, {
      hot: true,
      log: console.warn
    } ) )

    setRoutes( app )

  } catch ( err ) {
    console.error( err )
  }
} else {
  const manifest = require( '../dist/manifest.json' )

  Object.keys( dist ).forEach( k => dist[k] = manifest[k] )
  setRoutes( app )
}

if ( module == require.main ) {
  const port = process.env.PORT || '3000'

  app.listen( port, () => console.warn( 'Listening on port', port ) )
}
else
  module.exports = app
