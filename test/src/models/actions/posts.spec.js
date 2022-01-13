import * as actions from 'actions'
import * as types from 'constants/action-types'

describe( 'actions', () => {
  it( 'getPostsByUser', () => {
    expect( actions.getPostsByUser( 123 ) ).toEqual( {
      type: types.GET_POSTS_BY_USER,
      userId: 123
    } )
  } )
} )