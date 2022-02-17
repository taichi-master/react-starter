import React from 'react'
import { Counter, Title } from '../../components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setYear } from 'models/actions'
import { increment, decrement } from '../../models/states/counterState'
import _ from 'lodash'
import { logLoading, logRendering } from '../../utils'

logLoading( 'lifecycle' )

const pkg = require( "package.json" )

// FIXME: react-refresh (hot reload) doesn't work will react class based component.
// NOTE: It seems like the react-refresh is work after using typescript instead of babel.
@connect( ( { year, counter } ) => ( {
  year,
  counter
} ), { setYear, increment, decrement } )
export default class Lifecycle extends React.Component {

  static propTypes = {
    setYear: PropTypes.func.isRequired
  }

  state = {
    count: 0
  }

  titleRef = React.createRef()
  increaseDom = e => this.titleRef.current.innerText = Number( this.titleRef.current.innerText ) + 1
  decreaseDom = e => this.titleRef.current.innerText = Number( this.titleRef.current.innerText ) - 1

  increase = () => {
    this.setState( ( { count } ) => ( { count: count + 1 } ) )
  } 

  decrease = () => {
    this.setState( ( { count } ) => ( { count: count - 1 } ) )
  } 

  select = ( e ) => {
    const year = e.target.innerText
    
    this.props.setYear( year )
  }

  render () {
    const { count } = this.state,
          { year, counter, increment, decrement } = this.props,
          defaultYear = pkg.cfg.initialState.year

    logRendering( 'lifecycle', year, counter )

    return (
      <div className="lifecycle">
        <h1>Lifecycle</h1>
        <fieldset>
          <legend>DOM State</legend>
          <Title ref={ this.titleRef }>{ '0' }</Title>
          <Counter title="DOM Counter" increment={ this.increaseDom } decrement={ this.decreaseDom } />
        </fieldset>

        <fieldset>
          <legend>Component State</legend>
          <Title>{ count }</Title>
          <Counter title="Component Counter" value={ count } increment={ this.increase } decrement={ this.decrease } />

        </fieldset>

        <fieldset>
          <legend>Redux State</legend>
          <Title>{ counter.value }</Title>
          <Counter title="Store Counter" value={ counter.value } increment={ increment } decrement={ decrement } />

          <div className="list">
            <h1>
              <span>Selected Year { year }</span>
            </h1>
            <ul>
              {
                _.range( defaultYear, defaultYear - 5 ).map( ( x, i ) => 
                  <li className="list__item" key={ i } onClick={ this.select }>{ x }</li> 
                )
              }
            </ul>
          </div>
        </fieldset>

      </div>
    )
  }
}