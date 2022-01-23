import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from 'models/reducers'
import rootSaga from 'models/sagas'

import year from 'models/reducers/year'

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterState'
import * as types from './constants/action-types'

export default configureStore( {
  reducer: {
    counter: counterReducer,
    year
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware( {
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [ types.SET_YEAR ]
        // Ignore these field paths in all actions
        // ignoredActionPaths: [ 'meta.arg', 'payload.timestamp' ],
        // Ignore these paths in the state
        // ignoredPaths: [ 'items.dates' ]
      }
    } ),
  preloadedState: window.__INITIAL_STATE__
} )

// const sagaMiddleware = createSagaMiddleware(),
//       store = createStore( reducers, window.__INITIAL_STATE__, applyMiddleware( sagaMiddleware ) )

// sagaMiddleware.run( rootSaga )

// export default store