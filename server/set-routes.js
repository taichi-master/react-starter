const path = require( 'path' ),
      resolvePath = folder => path.resolve( __dirname, folder )

const express = require( 'express' ),
      compression = require( 'compression' ),
      favicon = require( 'serve-favicon' ),
      bodyParser = require( 'body-parser' ),
      logger = require( 'morgan' ),
      ejs = require( 'ejs' )

const pkg = require( '../package.json' ),
      dist = {
        'vendors.js': 'vendors.js',
        'runtime.js': 'runtime.js',
        'main.js': 'main.js',
        'main.css': 'main.css'
      },
      isDev = process.env.NODE_ENV === 'development'

if ( !isDev ) {
  const manifest = require( '../dist/manifest.json' )

  Object.keys( dist ).forEach( k => dist[k] = manifest[k] )
}
      
module.exports = function setRoutes ( app ) {
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
    const data = {
            appHtml : isDev ? '<h1>Loading...</h1>' : require( './ssr.js' )( req ),
            title: 'react-starter',
            initialState: JSON.stringify( pkg.cfg.initialState ),
            styles: isDev ? [] : [ dist['main.css'] ],
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
  } )
}