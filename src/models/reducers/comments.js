import * as types from 'models/action-types'

const initState = {
  isFetching: false,
  didInvalidate: false,
  postId: null,
  data: []
}

export default ( comments = initState, action ) => {
  switch ( action.type ) {
  case types.GET_COMMENTS_BY_POST:
    return { ...comments, isFetching: true, didInvalidate: false, postId: action.postId }

  case types.GET_COMMENTS_SUCCESS:
    return { ...comments, isFetching: false, didInvalidate: false, data: action.comments }

  case types.GET_COMMENTS_FAILURE:
    return { ...comments, isFetching: false, didInvalidate: true, data: [] }

  default:
    return comments
  }
}
