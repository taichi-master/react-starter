import { combineReducers } from 'redux'

import counter from '../states/counterState'
import quote from '../states/quoteState'
import year from './year'

export default combineReducers( {
  counter,
  quote,
  year
} )