import React from 'react'
import { Link } from 'react-router-dom'

const menuItems = require( "package.json" ).cfg.menuItems

export const NavBar = () => (
  <div className="nav-bar">
    {
      menuItems.map( ( x, i ) => <Link to={ x.url } key={ i }>{ x.name }</Link> )
    }
  </div>
)