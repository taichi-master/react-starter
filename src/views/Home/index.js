import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import List from 'components/list'
import Item from 'components/item'
import Counter from 'components/counter'
import _ from 'lodash'

const pkg = require( "package.json" )

// console.log( 'load Home' )

@connect(
  ( { year } ) => ( {
    year
  } )
)
export default class Home extends React.Component {

  state = {
    year: this.props.year
  }

  render () {
    const { year } = this.props,
          { year: defaultYear } = this.state

    return (
      <div className="home">
        <h1>Home</h1>

        <h1 className="project">{ pkg.name }</h1>

        <Counter style={ { margin: "1em 0" } } />
        <List title={ `Selected Year ${year}` }>
          {
            _.range( defaultYear, defaultYear - 5 ).map( ( x, i ) => <Item key={ i }>{ x }</Item> )
          }
        </List>

      </div>
    )
  }
}