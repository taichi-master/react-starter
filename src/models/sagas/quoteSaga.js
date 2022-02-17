import { call, put, takeEvery } from 'redux-saga/effects'
import { getQuoteSuccess, getQuoteFailure } from '../states/quoteState'
import * as api from './api'

function* workGetQuoteFetch ( action ) {
  try {
    const quote = yield call( api.getQuote, action.payload )

    yield put( getQuoteSuccess( quote ) )

  } catch ( error ) {
    console.error( error )
    yield put( getQuoteFailure() )
  }
}

export default function* watchGetQuoteFetch () {
  yield takeEvery( 'quote/getQuoteFetch', workGetQuoteFetch )
}
