import React from 'react'

class List extends React.Component {
  render () {
    let { title, children } = this.props

    return (
      <div className="list">
        <h1><span>{ title }</span></h1>
        <ul>
          { children }
        </ul>
      </div>
    )
  }
}

export default List