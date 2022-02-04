const express = require( 'express' ),
      router = express.Router(),
      path = require( 'path' ),
      StormDB = require( 'stormdb' ),
      dataFile = path.resolve( __dirname, '../../../db.json' ),
      engine = new StormDB.localFileEngine( dataFile ),
      db = new StormDB( engine ),
      delay = require( '../../libs/utils' ).delay

function setAuthor ( author ) {
  try {
    db.state = db.engine.init()
    db.pointers = []
    const length = db.get( 'quotes' ).filter( x => author ? x.author === author : true ).length().value(),
          quote = db.get( 'quotes' ).get( Math.floor( Math.random() * length ) ).get( 'quote' ).value()
  
    return function setTime ( time ) {
      return function response ( res ) {
        delay( time ).then ( function ( ) {
          res.status( 200 ).send( quote )
        } )
      }
    }
  } catch ( e ) {
    return function setTime ( time ) {
      return function response ( res ) {
        res.status( 500 ).send( e.message )
      }
    }
  }
}

router.get( '/', function ( req, res ) {
  const { author, time } = req.query,
        response = setAuthor( author )( time )

  response( res )
} )

router.get( '/:author', function ( req, res ) {
  const { author } = req.params,
        { time } = req.query,
        response = setAuthor( author )( time )

  response( res )
} )

router.get( '/:author/:time', function ( req, res ) {
  const { author, time } = req.params,
        response = setAuthor( author )( time )

  response( res )
} )

module.exports = router
