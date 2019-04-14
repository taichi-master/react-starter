import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setYear } from 'models/actions'

@connect( null, { setYear } )
export default class Item extends React.Component {

  static propTypes = {
    setYear: PropTypes.func.isRequired
  }

  select = ( e ) => {
    const year = e.target.innerText
    
    this.props.setYear( year )
  }

  render () {
    const { children } = this.props

    return (
      <li className="item" onClick={ this.select }><span>{ children }</span></li>
    )
  }
}

// Item = connect(
//   null,
//   { setYear }
// )( Item )

// export default Item