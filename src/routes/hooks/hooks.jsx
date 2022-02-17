import React, { useState, useCallback, useMemo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Counter, Title, List, ListItem } from '../../components'
import _ from 'lodash'
import { setYear } from 'models/actions'
import { increment, decrement } from '../../models/states/counterState'
import { logLoading, logRendering } from '../../utils'

logLoading( 'hooks' )

const pkg = require( "package.json" ),
      defaultYear = pkg.cfg.initialState.year

export default function Hooks () {

  // const { year, counter } = useSelector( ( { year, counter } ) => ( { year, counter } ) ),
  const state = useSelector( state => state ),
        { year, counter } = state,
        dispatch = useDispatch(),
        titleRef = useRef(),
        [ count, setCount ] = useState( 0 )

  // TODO: For optimization, please consider to put all useCallback into one useMemo.
  const increaseDom = useCallback( e => titleRef.current.innerText = Number( titleRef.current.innerText ) + 1, [ titleRef ] ),
        decreaseDom = useCallback( e => titleRef.current.innerText = Number( titleRef.current.innerText ) - 1, [ titleRef ] )

  const increase = useCallback( e => setCount( c => c + 1 ), [ setCount ] ),
        decrease = useCallback( e => setCount( c => c - 1 ), [ setCount ] )
        // decrease = e => setCount( c => c - 1 )

  const dispatchInc = useCallback( e => dispatch( increment() ), [ dispatch, increment ] ),
        dispatchDec = useCallback( e => dispatch( decrement() ), [ dispatch, decrement ] )

  const selectedYear = useMemo( () => `Selected Year ${year}`, [ year ] ),
        Items = useMemo( function () {
          const years = _.range( defaultYear, defaultYear - 5 ),
                selectYear = e => dispatch( setYear( e.target.innerText ) )

          return years.map( ( x, i ) => <ListItem key={ i } onClick={ selectYear }>{ x }</ListItem> )
        }, [ defaultYear ] )

  logRendering( 'hooks', year, counter )

  return (
    <div className="hooks">
      <h1>Hooks</h1>
      <fieldset>
        <legend>DOM State</legend>
        <Title ref={ titleRef }>0</Title>
        <Counter title="DOM Counter" increment={ increaseDom } decrement={ decreaseDom } />
      </fieldset>

      <fieldset>
        <legend>Component State</legend>
        <Title>{ count }</Title>
        <Counter title="Component Counter" value={ count } increment={ increase } decrement={ decrease } />
      </fieldset>

      <fieldset>
        <legend>Redux State</legend>
        <Title>{ counter.value }</Title>
        <Counter title="Store Counter" value={ counter.value } increment={ dispatchInc } decrement={ dispatchDec } />

        <List title={ selectedYear }>
          {
            Items
          }
        </List>
      </fieldset>
    </div>
  )
}