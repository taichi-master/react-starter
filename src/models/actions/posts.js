import * as types from 'constants/action-types'

export const getPostsByUser = userId => ( { type: types.GET_POSTS_BY_USER, userId } )