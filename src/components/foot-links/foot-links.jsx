import React from 'react'
import { Link } from 'react-router-dom'
import { intersperse } from 'src/utils'

const footLinks = require( "package.json" ).cfg.footLinks

export default () => (
  <nav className="foot-links" aria-label="secondary-nav">
    <ul>
      {
      // intersperse(
        footLinks.map( ( x, i ) => ( <li key={ i }><Link to={ x.url }>{ x.name }</Link></li> ) )
      // ' | '
      // )
      }
    </ul>
  </nav>
)
