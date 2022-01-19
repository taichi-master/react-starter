import React from 'react'

export default class Title extends React.PureComponent {
  render () {
    const { children, onClick } = this.props
    
    return (
      <button onClick={ onClick }>
        { children }
      </button>
    )
  }
}