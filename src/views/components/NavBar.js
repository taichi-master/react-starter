import React from 'react'
import { Link } from 'react-router-dom'

import { app, menuItems } from 'models/constants'
import { isParentOf } from 'utils'

const MenuItem = ({menu, showSubmenu, lv}) => {
  return (
    <Link to={menu.url ? menu.url : '/#'} onClick={menu.submenu ? showSubmenu : null}>
      {
        menu.icon ?
          <i className={`fa fa-${menu.icon}`} aria-hidden="true"></i>
        :
          null
      }
      <span className={menu.submenu ? 'name' : null}>{(menu.icon ? ' ' : '') + menu.name}</span>
      {
        menu.submenu ?
          <span className="caret2" onClick={showSubmenu}>{lv > 0 ? '▸' : '▾'}</span>
        :
          null
      }
    </Link>
  )
}

const Menu = ({menuItems, className, showSubmenu, lv=0}) => {
  return (
    <ul className={className}>
      {
        menuItems.map((menu, i) => {
          var sb;
          if (menu.submenu) {
            sb = ['submenu']
            if (menu.effect) {
              sb.push(menu.effect)
              sb.push('effect')
            }
          }
          return (
            <li key={i}>
              <MenuItem menu={menu} showSubmenu={showSubmenu} lv={lv}/>
              {
                menu.submenu ?
                  <Menu menuItems={menu.submenu} className={sb.join(' ')} showSubmenu={showSubmenu} lv={lv+1}/>
                :
                  null
              }
            </li>
          )
        })
      }
    </ul>
  );
}

const getLI = el => {
  while (el && el.tagName !== 'LI')
    el = el.parentNode;
  return el;
};

export default class NavBar extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      el: null
    }

    this.showSubmenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      var el = getLI(e.target);
      this.setState({el}, () => el.classList.add('show'));
    }

    this.hideSubmenu = (e) => {
      var el = this.state.el;
      if (el) {
        var li = getLI(e.target);
        try {
          if (~li.children[1].className.indexOf('submenu') &&  // don't hide if target is a submenu
              ~li.parentNode.parentNode.className.indexOf('show')) {
            if (el === li || isParentOf.call(li, el)) {
              if (el === li)
                el.classList.remove('show');
              else
                while (~el.className.indexOf('show')) {
                  el.classList.remove('show');
                  if (el === li)
                    break;
                  el = el.parentNode.parentNode;
                }
              e.preventDefault();
              e.stopPropagation();
              this.setState({el: li.parentNode.parentNode});
            }
            return;
          }
        } catch (err) {
          // console.log(err);
        }

        while (~el.className.indexOf('show')) {
          el.classList.remove('show');
          el = el.parentNode.parentNode;
        }

        if (this.state.el === li || isParentOf.call(li, this.state.el)) { // don't show if any of these conditions are true.
          e.preventDefault();
          e.stopPropagation();
        }
        this.setState({el: null});
      }
    }
  }

  componentDidMount () {
    document.documentElement.addEventListener('click', this.hideSubmenu);
  }

  render () {
    let { site, browser, changeSite } = this.props;

    return (
      <nav className="bar">
        <Link to="/about" >
          <img src="/images/logo.png" alt="TaxTee" width="40px" />
        </Link>
        <Menu menuItems={menuItems} className="main-menu" showSubmenu={this.showSubmenu}/>
      </nav>
    )
  }
}
