import React from 'react'
import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'

import { NavBar, FootLinks, Loading } from './components'
import Home from './routes/home/home.jsx'
import Lifecycle from './routes/lifecycle/lifecycle.jsx'
import NoMatch from './routes/404/404.jsx'
import { logLoading } from './utils'

logLoading( 'layout' )

const Hooks = loadable( _ => import( './routes/hooks/hooks.jsx' ), { fallback: <Loading /> } )

const About = loadable( _ => import( './routes/about/about.jsx' ), { fallback: <Loading /> } )

if ( process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' ) {
  const runtime = require( 'react-refresh/runtime' )

  runtime.injectIntoGlobalHook( window )
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => type => type
}

export default () => (
  <>
    <header>
      <NavBar />
    </header>
    <main className="main-content">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/hooks" element={ <Hooks /> } />
        <Route path="/lifecycle" element={ <Lifecycle /> } />
        <Route path="/about" element={ <About /> } />
        <Route element={ <NoMatch /> } />
      </Routes>
    </main>
    <footer className="footer">
      <div className="center">
        <FootLinks />
        <div className="clear"></div>
      </div>
    </footer>
  </>
)