// import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import reducers from 'models/reducers'
import rootSaga from 'models/sagas'

import year from 'models/reducers/year'

import { configureStore } from '@reduxjs/toolkit'
import {
  counter,
  quote
} from './states'

// import * as types from './constants/action-types'

const saga = createSagaMiddleware()

const store = configureStore( {
  reducer: {
    counter,
    quote,
    year
  },
  middleware: [
    saga
    // getDefaultMiddleware =>
    //   getDefaultMiddleware( {
    //     serializableCheck: {
    //     // Ignore these action types
    //       ignoredActions: [ types.SET_YEAR ]
    //     // Ignore these field paths in all actions
    //     // ignoredActionPaths: [ 'meta.arg', 'payload.timestamp' ],
    //     // Ignore these paths in the state
    //     // ignoredPaths: [ 'items.dates' ]
    //     }
    //   } )
  ],
  preloadedState: window.__INITIAL_STATE__
} )

// const sagaMiddleware = createSagaMiddleware(),
//       store = createStore( reducers, window.__INITIAL_STATE__, applyMiddleware( sagaMiddleware ) )

saga.run( rootSaga )

export default store