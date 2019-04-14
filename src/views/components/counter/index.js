import React from 'react'
import styled from 'styled-components'

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

class Counter extends React.Component {
  state = { count: this.props.count || 0 }

  increment = () => {
    this.setState( ( state, props ) => ( {
      count: state.count + 1
    } ) )
  }

  decrement = () => {
    this.setState( ( state, props ) => ( {
      count: state.count - 1
    } ) )
  }

  render () {
    return (
      <div className="counter">
        <Title>Counter</Title>
        <div>
          <Button onClick={ this.decrement }>-</Button>
          <Count>{ this.state.count }</Count>
          <Button onClick={ this.increment }>+</Button>
        </div>
      </div>
    )
  }
}

export default Counter