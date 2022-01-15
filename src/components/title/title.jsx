import React from 'react'

function _Title ( props ) {
  const { children } = props

  return (
    <h1>{ children }</h1>
  )
}

export const Title = React.memo( _Title )