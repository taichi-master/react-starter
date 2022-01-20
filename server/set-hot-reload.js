const webpack = require( 'webpack' ),
      config = require( '../webpack/development.js' )(),
      compiler = webpack( config )

module.exports = function useWebpack ( app ) {
  app.use( require( 'webpack-dev-middleware' )( compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true }
  } ) )
  
  app.use( require( 'webpack-hot-middleware' )( compiler, {
    hot: true,
    log: console.warn
  } ) )
}
