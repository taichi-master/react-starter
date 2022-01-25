import React from 'react'
import { logRendering } from '../../utils'

const Title = React.forwardRef( function ( props, ref ) {
  const { children, className } = props

  logRendering( 'Title', children )

  return (
    <div className={ className || 'title' } ref={ ref }>{ children }</div>
  )
} )

// export default Title
export default React.memo( Title )