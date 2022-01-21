module.exports = function ( app ) {
  try {
    const fs = require( 'fs' ),
          path = require( 'path' ),
          resolvePath = folder => path.resolve( __dirname, folder ),
          certificate = fs.readFileSync( resolvePath( '../ssl/fullchain.pem' ), 'utf8' ),
          privateKey = fs.readFileSync( resolvePath( '../ssl/privkey.pem' ), 'utf8' ),
          credentials = { key: privateKey, cert: certificate }

    return require( 'https' ).createServer( credentials, app )

  } catch ( err ) {
    console.error( err )
    console.error( 'Running http without SSL' )
    return require( 'http' ).createServer( app )
  }
}