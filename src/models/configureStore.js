import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from 'models/reducers'
import rootSaga from 'models/sagas'

const sagaMiddleware = createSagaMiddleware(),
      store = createStore( reducers, window.__INITIAL_STATE__, applyMiddleware( sagaMiddleware ) )

sagaMiddleware.run( rootSaga )

export default store