import React, { useState, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Counter, Title, List, Item } from '../../components'
import _ from 'lodash'
import { setYear } from 'models/actions'
import { increment, decrement } from '../../models/counterState'
import { logLoading, logRendering } from '../../utils'

logLoading( 'hooks' )

const pkg = require( "package.json" ),
      defaultYear = pkg.cfg.initialState.year

export default function Hooks () {

  // const { year, counter } = useSelector( ( { year, counter } ) => ( { year, counter } ) ),
  const state = useSelector( state => state ),
        { year, counter } = state,
        dispatch = useDispatch(),
        [ count, setCount ] = useState( 0 )

  // TODO: For optimization, please consider to put all useCallback into one useMemo.
  const increase = useCallback( e => setCount( c => c + 1 ), [] ),
        decrease = useCallback( e => setCount( c => c - 1 ), [] )
        // decrease = e => setCount( c => c - 1 )

  const dispatchInc = useCallback( e => dispatch( increment() ), [] ),
        dispatchDec = useCallback( e => dispatch( decrement() ), [] )

  const selectedYear = useMemo( () => `Selected Year ${year}`, [ year ] ),
        Items = useMemo( function () {
          const years = _.range( defaultYear, defaultYear - 5 ),
                selectYear = e => dispatch( setYear( e.target.innerText ) )

          return years.map( ( x, i ) => <Item key={ i } onClick={ selectYear }>{ x }</Item> )
        }, [ defaultYear ] )

  logRendering( 'hooks', year, counter )

  return (
    <div className="hooks">
      <Title>Hooks</Title>
      <fieldset>
        <legend>DOM State</legend>
        <Title>{ '0' }</Title>
        <Counter title="DOM Counter" />

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