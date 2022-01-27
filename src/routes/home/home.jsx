import React from 'react'
// import PropTypes from 'prop-types'
import { Spinner } from '../../components'
import { logLoading } from '../../utils'

logLoading( 'home' )

export default function Home () {
  return (
    <div className="home">
      <h1>Home</h1>
      <article>
        <Spinner />
        <p>Waiting for React 18.</p>
      </article>

      <article>
        <div className="font-weights">
          {
            Array.from( Array( 9 ).keys(), x => x * 100 + 100 ).map( ( x, i ) => <p className={ `font-weight-${x}` } key={ x } >{ `Font weight ${x}` }</p> )
          }
        </div>
      </article>
    </div>
  )
}