import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { hot, setConfig } from 'react-hot-loader'
import Loadable from 'react-loadable'
import NavBar from 'components/nav-bar'
import FootLinks from 'components/foot-links'
import Loading from 'components/loading'
import Home from 'routes/home'
import Hooks from 'routes/hooks'
import Lifecycle from 'routes/lifecycle'
import NoMatch from 'routes/404'

const About = Loadable( {
  loader: () => import( 'routes/About' ),
  loading: Loading
} )

if ( module.hot )
  setConfig( { logLevel: 'no-errors-please' } )

const App = () => (
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

export default module.hot ? hot( module )( App ) : App