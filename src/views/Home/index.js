import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'

// import * as actions from 'actions'
import { fetchFeaturesIfNeeded as getFeatures } from 'actions'
import HotReloadDemo from 'components/Hot-Reload-Demo'

const pkg = require( "json-loader!package.json" )

// console.log( 'load Home' )

class Home extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    features: PropTypes.array.isRequired,
    getFeatures: PropTypes.func.isRequired  
  }

  componentDidMount () {
    this.props.getFeatures()
  }

  render () {
    const { isFetching, features } = this.props

    return (
      <div className="home">
        <h1>Home</h1>

        <h1 className="project">{ pkg.name }</h1>

        <section className="redux">
          <h1>Redux Async Action</h1>
          <ul>
            <p><span>Features</span></p>
            {
              isFetching ?
                <li>Loading...</li>
                :
                features.map(( feature, i ) => ( <li key={ i }>{ feature }</li> ))
            }
          </ul>
        </section>

        <HotReloadDemo>
          Only Redux store state is maintained due to the fact that the withRouter (found in src/containers/Home.js) reloads the whole component whenever hot-reload kicks in.
        </HotReloadDemo>

      </div>
    )
  }
}

Home = connect(
  ({ features: { isFetching, features }}) => ({
    isFetching,
    features
  }),
  { getFeatures }
)( Home )

export default Home