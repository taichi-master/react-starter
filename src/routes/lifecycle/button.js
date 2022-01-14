import React from 'react'

class Title extends React.PureComponent {
  render () {
    const { children, onClick } = this.props
    
    return (
      <button onClick={ onClick }>
        { children }
      </button>
    )
  }
}

export default Title