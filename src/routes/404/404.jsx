import React from 'react'
import { logLoading } from '../../utils'

logLoading( 'NoMatch' )

export default ( { location } ) => (
  <div>
    <h3>Page not found for <code>{ location.pathname }</code></h3>
  </div>
)