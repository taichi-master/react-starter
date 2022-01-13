import * as types from 'constants/action-types'

export const getCommentsByPost = postId => ( { type: types.GET_COMMENTS_BY_POST, postId } )