import { combineReducers } from 'redux'
import value from './value'
import features from './features'

const appReducers = combineReducers({
  value,
  features
})

export default appReducers
