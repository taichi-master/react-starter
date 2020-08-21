function config () {
  switch ( process.env.NODE_ENV ) {
  case 'development':
  case 'production':
    return process.env.NODE_ENV
  default:
    return 'production'
  }
}
  
module.exports = require( `./webpack/${config()}.js` )