const app = require( './app' )

const port = process.env.PORT || '3000'

app.set( 'port', port )

var server

if ( port !== '3000' && process.env.NODE_ENV === 'production' ) {
  try {
    const fs = require( 'fs' ),
          path = require( 'path' )

    certificate = fs.readFileSync( path.resolve( __dirname, '../ssl/fullchain.pem' ), 'utf8' ),
    privateKey = fs.readFileSync( path.resolve( __dirname, '../ssl/privkey.pem' ), 'utf8' ),
    credentials = { key: privateKey, cert: certificate }
    server = require( 'https' ).createServer( credentials, app )
    console.warn( 'Https' )
  } catch ( err ) {
    console.error( err )
    console.error( 'Running http without SSL' )
    server = require( 'http' ).createServer( app )
  }
} else
  server = require( 'http' ).createServer( app )

server.on( 'listening', () => {
  console.warn( 'Listening on port', port )
})

server.on( 'error', ( error ) => {
  if ( error.syscall !== 'listen' )
    throw error

  switch ( error.code ) {
  case 'EACCES':
    console.error( `Port ${port} requires elevated privileges` )
    process.exit( 1 )
    break
  case 'EADDRINUSE':
    console.error( `Port ${port} is already in use` )
    process.exit( 1 )
    break
  default:
    throw error
  }
})

if ( module == require.main ) {
  server.listen( port )
}
else
  module.exports = () => server.listen( port )