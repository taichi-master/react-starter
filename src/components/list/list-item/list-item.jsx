import React, { memo } from 'react'
import { logRendering } from '../../../utils'

function ListItem ( props ) {
  const { children, onClick } = props
  
  logRendering( 'ListItem', children )

  return (
    <li className="list__item" onClick={ onClick }><span>{ children }</span></li>
  )
}

export default memo( ListItem )