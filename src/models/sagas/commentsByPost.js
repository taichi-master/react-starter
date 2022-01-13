import { takeEvery, call, put } from 'redux-saga/effects'
import * as api from './api'
import { GET_COMMENTS_BY_POST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE } from 'constants/action-types'

function* getCommentByPost ( action ) {
  try {
    const comments = yield call( api.getCommentsByPost, action.postId )

    yield put( { type: GET_COMMENTS_SUCCESS, comments } )
    return comments

  } catch ( error ) {
    yield put( { type: GET_COMMENTS_FAILURE, error } )
  }
}

export default function* watchGetCommentByPost () {
  yield takeEvery( GET_COMMENTS_BY_POST, getCommentByPost )
}
