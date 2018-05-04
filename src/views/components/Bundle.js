// For Lazy Loading
import React, { Component } from 'react'

class Bundle extends Component {
  constructor ( props, context ) {
    super( props, context )
    this.state = {
      mod: null
    }
  }

  load ( props ) {
    // <Bundle load={() => import('views/About')}>
    // props.load().then((mod) => {
    //   this.setState({
    //     mod: mod.default ? mod.default : mod
    //   })
    // });

    // <Bundle load={loadAbout}>
    props.load(( mod ) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      })
    })
  }

  componentWillMount () {
    this.load( this.props )
  }

  componentWillReceiveProps ( nextProps ) {
    if ( nextProps.load !== this.props.load ) {
      this.load( nextProps )
    }
  }

  render () {
    return this.state.mod ? this.props.children( this.state.mod ) : this.state.mod
  }
}

export default Bundle
