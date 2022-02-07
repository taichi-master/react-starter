import { combineReducers } from 'redux'

import counter from '../counterState'
import quote from '../quoteState'
import year from './year'

export default combineReducers( {
  counter,
  quote,
  year
} )