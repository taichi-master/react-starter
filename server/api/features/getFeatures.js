const fs = require( 'fs' )

module.exports = ( cb ) => {
  // fs.readFile(path.resolve(__dirname, '../../../README.md'), 'utf8', (err, data) => {
  fs.readFile( 'README.md', 'utf8', ( err, data ) => {
    if ( err )
      return cb( err )
      
    var lines = data.split( '\n' ),
        features = [],
        i = 0, len = lines.length

    for ( ; i < len; i++ )
      if ( lines[i] === '## Features:' )
        break
    i++    
    for ( ; i < len; i++ )
      if ( lines[i][0] === '-' )
        features.push( lines[i].substr( 2 ))
      else
        break
    cb( null, features )
  })
}
