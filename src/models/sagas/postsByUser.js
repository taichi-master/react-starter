import { takeEvery, call, put } from 'redux-saga/effects'
import * as api from './api'
import { GET_POSTS_BY_USER, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } from 'constants/action-types'

function* getPostsByUser ( action ) {
  try {
    const posts = yield call( api.getPostsByUser, action.userId )

    yield put( { type: GET_POSTS_SUCCESS, posts } )
    return posts

  } catch ( error ) {
    yield put( { type: GET_POSTS_FAILURE, error } )
  }
}

export default function* watchGetPostsByUser () {
  yield takeEvery( GET_POSTS_BY_USER, getPostsByUser )
}
