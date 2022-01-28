import React from 'react'
import { Link } from 'react-router-dom'

const footLinks = require( "package.json" ).cfg.footLinks

export default function FootLinks () {
  return (
    <nav className="foot-links" aria-label="secondary-nav">
      <ul>
        {
          footLinks.map( ( x, i ) => ( <li key={ i }><Link to={ x.url }>{ x.name }</Link></li> ) )
        }
      </ul>
    </nav>
  )  
} 