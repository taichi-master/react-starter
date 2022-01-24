import React from 'react'
// import PropTypes from 'prop-types'
import { Spinner } from '../../components'
import { logLoading } from '../../utils'

logLoading( 'home' )

export default function Home () {
  return (
    <div className="home">
      <h1>Home</h1>
      <Spinner />
      <p>Waiting for React 18.</p>
    </div>
  )
}