import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import { setYear } from 'models/actions'
import { useDispatch } from 'react-redux'

export default function Item ( props ) {
  const { children } = props,
        dispatch = useDispatch()
  
  function select ( e ) {
    const year = e.target.innerText
    
    dispatch( setYear( year ) )
  }

  return (
    <li className="item" onClick={ select }><span>{ children }</span></li>
  )
}