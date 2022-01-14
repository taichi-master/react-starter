import React, { useState, useCallback } from 'react'
import Title from 'components/title'
import Button from 'components/button'

function Hooks () {
  const [ count, setCount ] = useState( 0 )

  const increase = useCallback( function increase () {
    setCount( c => c + 1 )
  }, [] )

  const decrease = useCallback( function decrease () {
    setCount( c => c - 1 )
  }, [] )

  return (
    <div className="hooks">
      <Title>Hooks</Title>
      <Title>{ count }</Title>
      <Button onClick={ increase }>Increase</Button>
      <Button onClick={ decrease }>Decrease</Button>
    </div>
  )
}

export default Hooks