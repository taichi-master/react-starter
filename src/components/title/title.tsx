import React from 'react'
import { logRendering } from '../../utils'

interface Props {
  children: string
  className: string
}

const Title = React.forwardRef<HTMLInputElement, Props>( function ( props, ref ) {
  const { children, className } = props

  logRendering( 'Title', children )

  return (
    <div className={ className || 'title' } ref={ ref }>{ children }</div>
  )
} )

// export default Title
export default React.memo( Title )