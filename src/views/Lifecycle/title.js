import React from 'react'

class Title extends React.PureComponent {
  render () {
    const { children } = this.props
    
    return (
      <h1>{ children }</h1>
    )
  }
}

export default Title