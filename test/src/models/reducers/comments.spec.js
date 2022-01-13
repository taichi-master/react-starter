import reducer from 'reducers/comments'
import * as types from 'constants/action-types'

describe( 'comments reducer', () => {
  it( 'should return the initial state', () => {
    expect( reducer( undefined, {} ) ).toEqual( {
      "data": [], "didInvalidate": false, "isFetching": false, "postId": null
    } )
  } )

  it( 'should handle GET_COMMENTS_BY_POST', () => {
    const action = { type: types.GET_COMMENTS_BY_POST, postId: 123 }

    expect( reducer( undefined, action ) ).toEqual( {
      "didInvalidate": false,
      "isFetching": true,
      "postId": 123,
      "data": []
    } )
  } )
  
  it( 'should handle GET_COMMENTS_SUCCESS', () => {
    const action = { type: types.GET_COMMENTS_SUCCESS, comments: 'some data in array' }

    expect( reducer( undefined, action ) ).toEqual( {
      "didInvalidate": false,
      "isFetching": false,
      "postId": null,
      "data": "some data in array"
    } )
  } )
  
  it( 'should handle GET_COMMENTS_FAILURE', () => {
    const action = { type: types.GET_COMMENTS_FAILURE }

    expect( reducer( undefined, action ) ).toEqual( {
      "didInvalidate": true,
      "isFetching": false,
      "postId": null,
      "data": []
    } )
  } )
} )