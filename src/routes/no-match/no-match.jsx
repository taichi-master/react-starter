import React from 'react'
import { useLocation } from 'react-router'
import { logLoading } from '../../utils'

logLoading( 'NoMatch' )

/*
  NOTE: In react-router v16,
  the NoMatch will not get called again for another different "no match" path.
  This could be a good thing, but continually showing the 'first' location.pathname could be a miss leading thing.
*/ 
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
