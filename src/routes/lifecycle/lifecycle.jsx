import React from 'react'
import Title from './title.jsx'
import Button from './button.jsx'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setYear } from 'models/actions'
import _ from 'lodash'
const pkg = require( "package.json" )

@connect( ( { year } ) => ( {
  year
} ), { setYear } )
export class Lifecycle extends React.Component {

  static propTypes = {
    setYear: PropTypes.func.isRequired
  }

  state = {
    count: 0
  }

  increase = () => {
    this.setState( { count: this.state.count + 1 } )
  } 

  decrease = () => {
    this.setState( { count: this.state.count - 1 } )
  } 

  select = ( e ) => {
    const year = e.target.innerText
    
    this.props.setYear( year )
  }

  render () {
    const { count } = this.state,
          defaultYear = pkg.cfg.initialState.year

    return (
      <div className="lifecycle">
        <Title>Lifecycle</Title>
        <div>
          <Title>{ count }</Title>
          <Button onClick={ this.decrease }>Decrease</Button>
          <Button onClick={ this.increase }>Increase</Button>
        </div>

        <div className="list">
          <h1>
            <span>Selected Year { this.props.year }</span>
          </h1>
          <ul>
            {
              _.range( defaultYear, defaultYear - 5 ).map( ( x, i ) => 
                <li className="item" key={ i } onClick={ this.select }>{ x }</li> 
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}