import React from 'react'
import Title from './title'
import Button from './button'

class Lifecycle extends React.Component {

  state = {
    count: 0
  }

  increase = () => {
    this.setState( { count: this.state.count + 1 } )
  } 

  decrease = () => {
    this.setState( { count: this.state.count - 1 } )
  } 

  render () {
    const { count } = this.state

    return (
      <div className="lifecycle">
        <Title>Lifecycle</Title>
        <Title>{ count }</Title>
        <Button onClick={ this.increase }>Increase</Button>
        <Button onClick={ this.decrease }>Decrease</Button>
      </div>
    )
  }
}

export default Lifecycle