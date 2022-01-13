import * as types from 'constants/action-types'

const initState = {
  isFetching: false,
  didInvalidate: false,
  userId: null,
  data: []
}

export default ( posts = initState, action ) => {
  switch ( action.type ) {
  case types.GET_POSTS_BY_USER:
    return { ...posts, isFetching: true, didInvalidate: false, userId: action.userId }

  case types.GET_POSTS_SUCCESS:
    return { ...posts, isFetching: false, didInvalidate: false, data: action.posts }

  case types.GET_POSTS_FAILURE:
    return { ...posts, isFetching: false, didInvalidate: true }

  default:
    return posts
  }
}
