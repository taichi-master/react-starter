import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { hot, setConfig } from 'react-hot-loader'
import Loadable from 'react-loadable'

import { NavBar, FootLinks, Loading } from './components'
import { Home, Hooks, Lifecycle, NoMatch, About } from './routes'
// import { About } from 'routes/index'

// TODO: Lazy load is not working
// const About = Loadable( {
//   loader: () => import( 'routes/about' ),
//   loading: Loading
// } )

if ( module.hot )
  setConfig( { logLevel: 'no-errors-please' } )

const Layout = () => (
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

export default module.hot ? hot( module )( Layout ) : Layout