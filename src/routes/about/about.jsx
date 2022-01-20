import React from 'react'
import { logLoading } from '../../utils'

logLoading( 'about' )

export default function About () {
  return (
    <div className="about">
      <h1>About...</h1>
      <h2>Lazy Loading</h2>
    </div>
  )
}