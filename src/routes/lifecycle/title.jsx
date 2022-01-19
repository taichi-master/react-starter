import React from 'react'

export default class Title extends React.PureComponent {
  render () {
    const { children } = this.props
    
    return (
      <h1>{ children }</h1>
    )
  }
}