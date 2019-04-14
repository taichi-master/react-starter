import { all } from 'redux-saga/effects'

import watchGetPostsByUser from './postsByUser'
import watchCommentsByPost from './commentsByPost'

export default function* rootSaga () {
  yield all( [
    watchGetPostsByUser(),
    watchCommentsByPost()
  ] )
}