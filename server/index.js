const app = require( './app' )

const port = process.env.PORT || '3000'

app.set( 'port', port )

var server

if ( port !== '3000' && process.env.NODE_ENV === 'production' ) {
  try {
    const path = require( 'path' )

    certificate = fs.readFileSync( path.resolve( __dirname, '../ssl/fullchain.pem' ), 'utf8' ),
    privateKey = fs.readFileSync( path.resolve( __dirname, '../ssl/privkey.pem' ), 'utf8' ),
    credentials = { key: privateKey, cert: certificate }
    server = require( 'https' ).createServer( credentials, app )
    console.log( 'Https' )  // eslint-disable-line
  } catch ( err ) {
    console.error( err )  // eslint-disable-line
    console.error( 'Running http without SSL' ) // eslint-disable-line
    server = require( 'http' ).createServer( app )
  }
} else
  server = require( 'http' ).createServer( app )

server.on( 'listening', () => {
  console.log( 'Listening on port', port )  // eslint-disable-line
})

server.on( 'error', ( error ) => {
  if ( error.syscall !== 'listen' )
    throw error

  switch ( error.code ) {
  case 'EACCES':
    console.error( `Port ${port} requires elevated privileges` )  // eslint-disable-line
    process.exit( 1 )
    break
  case 'EADDRINUSE':
    console.error( `Port ${port} is already in use` ) // eslint-disable-line
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
