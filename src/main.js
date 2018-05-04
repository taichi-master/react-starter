import 'style/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import App from 'components/App'

import reducers from 'reducers'

const store = createStore( reducers, window.__INITIAL_STATE__, applyMiddleware( thunkMiddleware ))

const render = ( Component ) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById( 'app' )
  )
}

render( App )

// Hot Module Replacement API
if ( module.hot ) {
  module.hot.accept( 'components/App', () => {
    render( App )
  })
}
