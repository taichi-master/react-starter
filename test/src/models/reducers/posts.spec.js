import reducer from 'reducers/posts'
import * as types from 'constants/action-types'

describe( 'posts reducer', () => {
  it( 'should return the initial state', () => {
    expect( reducer( undefined, {} ) ).toEqual( {
      "data": [], "didInvalidate": false, "isFetching": false, "userId": null
    } )
  } )

  it( 'should handle GET_POSTS_BY_USER', () => {
    const action = { type: types.GET_POSTS_BY_USER, userId: 123 }

    expect( reducer( undefined, action ) ).toEqual( {
      "didInvalidate": false,
      "isFetching": true,
      "userId": 123,
      "data": []
    } )
  } )
  
  it( 'should handle GET_POSTS_SUCCESS', () => {
    const action = { type: types.GET_POSTS_SUCCESS, posts: 'some data in array' }

    expect( reducer( undefined, action ) ).toEqual( {
      "didInvalidate": false,
      "isFetching": false,
      "userId": null,
      "data": "some data in array"
    } )
  } )
  
  it( 'should handle GET_POSTS_FAILURE', () => {
    const action = { type: types.GET_POSTS_FAILURE }

    expect( reducer( undefined, action ) ).toEqual( {
      "didInvalidate": true,
      "isFetching": false,
      "userId": null,
      "data": []
    } )
  } )
} )