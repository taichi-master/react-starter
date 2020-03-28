import React from 'react'

function Title ( props ) {
  const { children } = props

  return (
    <h1>{ children }</h1>
  )
}

export default React.memo( Title )