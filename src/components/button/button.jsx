import React from 'react'
import cx from 'clsx'

function Button ( props ) {
  const { children, onClick, className } = props
  
  return (
    <button className={ cx ( 'button', className ) } onClick={ onClick }>
      { children }
    </button>
  )
}

export default React.memo( Button )