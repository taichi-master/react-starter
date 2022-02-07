import React from 'react'
import { useLocation } from 'react-router'
import { logLoading } from '../../utils'

logLoading( 'NoMatch' )

/*
  NOTE: function NAME needed for hot-reload
*/
export default function NoMatch ( props ) {
  const location = useLocation()

  return (
    <div className="no-match">
      <h1>404</h1>
      <h2>Page not found for <code>{ location.pathname }</code></h2>
    </div>
  )
}
