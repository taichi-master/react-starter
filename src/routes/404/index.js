import React from 'react'

// console.log( 'load NoMatch' )

export default ( { location } ) => (
  <div>
    <h3>Page not found for <code>{ location.pathname }</code></h3>
  </div>
)
