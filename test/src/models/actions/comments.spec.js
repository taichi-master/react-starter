import * as actions from 'actions'
import * as types from 'constants/action-types'

describe( 'actions', () => {
  it( 'getCommentsByPost', () => {
    expect( actions.getCommentsByPost( 123 ) ).toEqual( {
      type: types.GET_COMMENTS_BY_POST,
      postId: 123
    } )
  } )
} )