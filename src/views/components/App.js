import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import style from './App.scss'

import NavBar from 'components/NavBar'
import FootLinks from 'components/FootLinks'
import NoMatch from 'views/404'
import Home from 'containers/Home'
import Bundle from 'components/Bundle'

let About;
if (process.env.WEB) {
  const about_style = require('views/About/style.scss');  // dont' forget to include this line for any lazy load component
  const loadAbout = require('bundle-loader?lazy!views/About');
  About = () => (
    // use the following when "import()"" is used instead of "bundle-loader".
    // also needs to include "syntax-dynamic-import" plugin in the webpack.config.js's bable-loader
    // <Bundle load={(cb) => import('views/About').then(mod=>cb(mod))}>
    <Bundle load={loadAbout}>
      {(About) => <About/>}
    </Bundle>
  )
} else
  About = require('views/About').default;

export default () => (
  <div className="app">
    <header>
      <NavBar/>
    </header>
    <article className="main-content">
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route component={NoMatch}/>
      </Switch>
    </article>
    <footer className="footer">
      <div className="center">
        <FootLinks/>
        <div className="clear"></div>
      </div>
    </footer>
  </div>
);