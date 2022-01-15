/* eslint-disable no-console */
import 'styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './layout.jsx'
import store from 'models/configureStore'

export function logLoading ( component ) {
  return console.log( `🎉 loading %c${component}%c.jsx  🎉`, 'font-size: 1.5em; text-transform: capitalize;', '' )
}

logLoading( 'main' )

// run this before ReactDOM.render
if ( process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' ) {
  console.log( `🔥 setting react-refresh/runtime 🔥` )
  const runtime = require( 'react-refresh/runtime' )

  runtime.injectIntoGlobalHook( window )
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => type => type
}

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById( 'root' )
)