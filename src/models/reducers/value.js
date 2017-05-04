import * as types from 'models/actionTypes';

export default (value='', action) => {
  switch (action.type) {
    case types.SET_VALUE:
      return action.value;
    default:
      return value;
  }
}
