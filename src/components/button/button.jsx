import React from 'react'

function _Button ( props ) {
  const { children, onClick } = props
  
  return (
    <button onClick={ onClick }>
      { children }
    </button>
  )
}

export const Button = React.memo( _Button )