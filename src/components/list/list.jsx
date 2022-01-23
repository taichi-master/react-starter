import React, { memo } from 'react'
import { logRendering } from '../../utils'

function List ( props ) {
  const { title, children } = props

  logRendering( 'List', title )

  return (
    <div className="list">
      <h1><span>{ title }</span></h1>
      <ul>
        { children }
      </ul>
    </div>
  )
}

export default memo( List )