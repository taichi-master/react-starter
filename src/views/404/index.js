import React from 'react'

import style from './style.scss'

console.log('load NoMatch');

export default ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)
