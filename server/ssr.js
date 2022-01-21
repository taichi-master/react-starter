const path = require( 'path' ),
      resolvePath = folder => path.resolve( __dirname, folder )

const pkg = require( '../package.json' )

// @loadable/component      
const { ChunkExtractor } = require( '@loadable/server' ),
      statsFile = resolvePath( 'libs/loadable-stats.json' ),
      extractor = new ChunkExtractor( { statsFile } ),
      { default: App } = extractor.requireEntrypoint( 'app' )

// React and Redux.
const React = require( 'react' ),
      ReactDOMServer = require( 'react-dom/server' ),
      { StaticRouter } = require( 'react-router-dom/server' ),

      // App = isDev ? null : require( './libs/App' ).default,
      // { createStore, applyMiddleware } = require( 'redux' ), // server side redux
      { createStore } = require( 'redux' ), // server side redux
      { Provider } = require( 'react-redux' ),
      // thunkMiddleware = require( 'redux-thunk' ).default,
      // store = createStore( require( './libs/reducers' ).default, pkg.cfg.initialState, applyMiddleware( thunkMiddleware ))
      store = createStore( require( './libs/reducers' ).default, pkg.cfg.initialState )

module.exports = function ( req ) {
  return ReactDOMServer.renderToString(
    React.createElement( Provider, { store },
      React.createElement( StaticRouter, { location: req.url },
        extractor.collectChunks(
          React.createElement( App )
        )
      )
    )
  )
}