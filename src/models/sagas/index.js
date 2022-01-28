import { all } from 'redux-saga/effects'

import watchGetPostsByUser from './postsByUser'
import watchCommentsByPost from './commentsByPost'
import watchGetQuoteFetch from './quoteSaga'

export default function* rootSaga () {
  yield all( [
    watchGetQuoteFetch(),
    watchGetPostsByUser(),
    watchCommentsByPost()
  ] )
}