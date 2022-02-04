import { all } from 'redux-saga/effects'

import watchGetQuoteFetch from './quoteSaga'

export default function* rootSaga () {
  yield all( [
    watchGetQuoteFetch()
  ] )
}