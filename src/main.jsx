/* eslint-disable no-console */
import 'styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './layout.jsx'
import store from 'models/store'
// import { loadableReady } from '@loadable/component'
import { logLoading } from './utils'

logLoading( 'main' )

// run this before ReactDOM.render
if ( process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' ) {
  console.log( `🔥 setting react-refresh/runtime 🔥` )
  const runtime = require( 'react-refresh/runtime' )

  runtime.injectIntoGlobalHook( window )
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => type => type
}

// loadableReady( () => {
//   ReactDOM.hydrate(
//     <Provider store={ store }>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>,
//     document.getElementById( 'root' )
//   )
// } )

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById( 'root' )
)