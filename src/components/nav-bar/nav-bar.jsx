import React from 'react'
import { Link } from 'react-router-dom'

const menuItems = require( "package.json" ).cfg.menuItems

export default () => (
  <>
    <input type="checkbox" id="nav-toggle" className="nav-toggle"></input>
    <nav className="nav-bar" aria-label="primary-nav">
      <ul>
        {
          menuItems.map( ( x, i ) => <li key={ i }><Link to={ x.url } >{ x.name }</Link></li> )
        }
      </ul>
    </nav>
    <label htmlFor="nav-toggle" className="nav-toggle-label">
      <span></span>
    </label>
  </>
)