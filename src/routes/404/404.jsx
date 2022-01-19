import React from 'react'
import { logLoading } from '../../utils'

logLoading( 'NoMatch' )

const NoMatch = ( { location } ) => (
  <div>
    <h3>Page not found for <code>{ location.pathname }</code></h3>
  </div>
)

export default NoMatch