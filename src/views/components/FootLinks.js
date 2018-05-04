import React from 'react'
import { Link } from 'react-router-dom'

import { intersperse } from 'utils'
import { footLinks } from 'models/constants'

export default () => (
  <div className="foot-links">
    {
      intersperse(
        footLinks.map(( x, i ) => ( <Link to={ x.url } key={ i }>{ x.name }</Link> )),
        ' | '
      )
    }
  </div>
)
