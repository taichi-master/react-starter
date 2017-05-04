import * as types from 'models/actionTypes';

export default (
  features = {
    isFetching: false,
    didInvalidate: true,
    features: []
  },
  action) => {
  switch (action.type) {
    case types.INVALIDATE_FEATURES:
      return Object.assign({}, features, {
        didInvalidate: true
      });
    case types.REQUEST_FEATURES:
      return Object.assign({}, features, {
        isFetching: true,
        didInvalidate: false
      });
    case types.RECEIVE_FEATURES:
      return Object.assign({}, features, {
        isFetching: false,
        didInvalidate: false,
        features: action.contents,
        lastUpdated: action.receivedAt
      });
    default:
      return features
  }
}
