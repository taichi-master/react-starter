import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Counter, List, Item, Spinner } from '../../components'
import _ from 'lodash'

import { getPostsByUser, getCommentsByPost } from 'models/actions'
import { logLoading } from '../../utils'

logLoading( 'home' )

const pkg = require( "package.json" )

@connect(
  ( { year } ) => ( {
    year
  } ),
  { getPostsByUser, getCommentsByPost }
)
export default class Home extends React.Component {

  state = {
    year: this.props.year
  }

  // componentDidMount () {
  //   const userId = 1,
  //         postId = 1

  //   this.props.getPostsByUser( userId )
  //   this.props.getCommentsByPost( postId )
  // }

  render () {
    const { year } = this.props,
          { year: defaultYear } = this.state

    return (
      <div className="home">
        <h1>Home</h1>

        <Spinner />
        
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