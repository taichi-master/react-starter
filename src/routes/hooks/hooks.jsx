import React, { useState, useCallback } from 'react'
import { Button, Title } from '../../components'
import { logLoading } from '../../utils'

logLoading( 'hooks' )

export default function Hooks () {
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
      <Button onClick={ decrease }>Decrease</Button>
      <Button onClick={ increase }>Increase</Button>
    </div>
  )
}