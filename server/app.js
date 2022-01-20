const express = require( 'express' ),
      app = express()

if ( process.env.NODE_ENV === 'development' )
  require( './set-hot-reload' )( app )

require( './set-routes' )( app )

if ( module == require.main ) {
  const port = process.env.PORT || '3000'

  app.listen( port, () => console.info( `🚀Listening on port ${port}` ) )
}
else
  module.exports = app
