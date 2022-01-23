import React, { memo, useState } from 'react'
import styled from 'styled-components'
import { logRendering } from '../../utils'

const Title = styled.div`
  margin-top: 1em;
`

const Count = styled.span`
  font-size: 5em;
  padding: 0 1em;
`

const Button = styled.button`
  font-size: 3em;
  padding: 0 .5em;
`

function Counter ( props ) {
  const { title = 'Counter', value = 0, increment, decrement } = props,
        [ count, setCount ] = useState( value ),
        onIncrement = () => {
          setCount( count => count + 1 )
          increment?.()
        },
        onDecrement = () => {
          setCount( count => count - 1 )
          decrement?.()
        }

  logRendering( 'counter', title, count )

  return (
    <div className="counter">
      <Title>{ title }</Title>
      <div>
        <Button onClick={ onDecrement }>-</Button>
        <Count>{ count }</Count>
        <Button onClick={ onIncrement }>+</Button>
      </div>
    </div>
  )
}

// export default Counter
export default memo( Counter )