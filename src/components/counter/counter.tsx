import React, { useState } from 'react'
import { Button, Title } from '../../components'
import { logRendering } from '../../utils'

interface Props {
  title?: string
  value?: number
  increment?: () => void
  decrement?: () => void
}

function Counter ( props: Props ) {
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
      <Title className="counter__title">{ title }</Title>
      <div>
        <Button className="counter__button" onClick={ onDecrement }>-</Button>
        <span className="counter__value">{ count }</span>
        <Button className="counter__button" onClick={ onIncrement }>+</Button>
      </div>
    </div>
  )
}

// export default Counter
export default React.memo( Counter )