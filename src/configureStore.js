import { createStore, applyMiddleware } from 'redux'
import reducers from 'models/reducers'

// const store = createStore( reducers, window.__INITIAL_STATE__, applyMiddleware( thunkMiddleware ))
export default createStore( reducers, window.__INITIAL_STATE__ )