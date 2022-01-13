import * as types from 'constants/action-types'

export default ( year = 0, action ) => {
  switch ( action.type ) {
  case types.SET_YEAR:
    return action.year
  default:
    return year
  }
}
