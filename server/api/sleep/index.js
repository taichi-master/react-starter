const express = require( 'express' ),
      router = express.Router(),
      delay = require( '../../libs/utils' ).delay

function setTime ( time ) {
  return function setMessage ( message ) {
    return function response ( res ) {
      delay( time ).then ( function ( ) {
        res.status( 200 ).send( message || `awake after ${time / 1000} second(s).` )
      } )
    }
  }
}

router.get( '/', function ( req, res ) {
  const { time, message } = req.query,
        response = setTime( time )( message )

  response( res )
} )

router.get( '/:time', function ( req, res ) {
  const { time } = req.params,
        { message } = req.query,
        response = setTime( time )( message )

  response( res )
} )

router.get( '/:time/:message', function ( req, res ) {
  const { time, message } = req.params,
        response = setTime( time )( message )

  response( res )
} )

module.exports = router
