const app = require( './app' ),
      port = process.env.PORT || '3000'

app.set( 'port', port )

const server = ( port !== '3000' && process.env.NODE_ENV === 'production' )
  ? require( '/.ssl.js' )( app )
  : require( 'http' ).createServer( app )

server.on( 'listening', () => {
  console.info( '🚀  Listening on port', port )
} )

server.on( 'error', ( error ) => {
  if ( error.syscall !== 'listen' )
    throw error

  switch ( error.code ) {
  case 'EACCES':
    console.error( `Port ${port} requires elevated privileges` )
    break
  case 'EADDRINUSE':
    console.error( `Port ${port} is already in use` )
    break
  default:
    throw error
  }
} )

if ( module == require.main ) {
  server.listen( port )
}
else
  module.exports = () => server.listen( port )