import React, { useEffect, Suspense } from 'react'
// import PropTypes from 'prop-types'
import { Spinner } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { getQuoteFetch } from '../../models/quoteState'
import { logLoading } from '../../utils'

logLoading( 'home' )

export default function Home () {
  const quote = useSelector( state => state.quote.quote ),
        dispatch = useDispatch()

  useEffect( () => {
    dispatch( getQuoteFetch( 3000 ) )
  }, [ dispatch ] )

  return (
    <div className="home">
      <h1>Home</h1>
      { /* <article>
        <Spinner />
        <p>Waiting for React 18.</p>
      </article> */ }

      <article>
        {
          quote
            ? quote
            : <Spinner />
          /* <Suspense fallback={ <Spinner /> }>
            { quote }
          </Suspense> */
        }
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