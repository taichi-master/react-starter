import * as types from 'models/action-types'

export const getPostsByUser = userId => ( { type: types.GET_POSTS_BY_USER, userId } )