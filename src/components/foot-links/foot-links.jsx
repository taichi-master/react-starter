import React from 'react'
import { Link } from 'react-router-dom'
import { intersperse } from 'src/utils'

const footLinks = require( "package.json" ).cfg.footLinks

export const FootLinks = () => (
  <div className="foot-links">
    {
      intersperse(
        footLinks.map( ( x, i ) => ( <Link to={ x.url } key={ i }>{ x.name }</Link> ) ),
        ' | '
      )
    }
  </div>
)
