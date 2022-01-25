import React from 'react'
import { logRendering } from '../../utils'

const Title = React.forwardRef( function ( props, ref ) {
  const { children } = props

  logRendering( 'Title', children )

  return (
    <h1 className="title" ref={ ref }>{ children }</h1>
  )
} )

// export default Title
export default React.memo( Title )