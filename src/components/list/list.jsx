import React from 'react'

export function List ( props ) {
  const { title, children } = props

  return (
    <div className="list">
      <h1><span>{ title }</span></h1>
      <ul>
        { children }
      </ul>
    </div>
  )
}