import * as types from 'models/action-types'

export default ( year = 0, action ) => {
  switch ( action.type ) {
  case types.SET_YEAR:
    return action.year
  default:
    return year
  }
}
