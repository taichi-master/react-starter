import { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import sinon from 'sinon'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import reducers from 'reducers'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'

import Home from 'views/Home'
import HotReloadDemo from 'components/Hot-Reload-Demo'

// import * as actions from 'actions'
// import * as types from 'models/actionTypes'
import { app } from 'models/constants'

Enzyme.configure({ adapter: new Adapter() })

describe( 'Views', function () {

  describe( '<Home/>', function () {
    
    const initValue = 'abc',
          initialState = { value: initValue },
          testContents = [ "Hey there!", "Yes?" ]

    before( function () {
      this.server = sinon.fakeServer.create({ autoRespond: true, respondImmediately: true })
      this.server.respondWith( "POST", app.getUrl.features(), function ( xhr, id ) {
        xhr.respond( 200,
          { "Content-Type": "application/json" },
          JSON.stringify( testContents )
        )
      })

      this.store = createStore( reducers, initialState, applyMiddleware( thunk ))

      this.wrapper = mount(
        <Provider store={ this.store }>
          <Home />
        </Provider>
      )
    })

    after( function () {
      this.server.restore()
    })

    it( 'can be instantiated', function () {
      const component = this.wrapper.find( Home ).instance(),
            el = ReactDOM.findDOMNode( component )

      expect( el.className ).to.be.equal( 'home' )
    })

    it( 'has Redux Async Action section (before features loaded)', function () {
      const section = this.wrapper.find( 'section.redux' )

      expect( section.at( 0 ).instance().className ).to.be.equal( 'redux' )
      expect( section.find( 'li' ).text()).to.be.equal( 'Loading...' )
    })

    it( 'has Redux Async Action section (after features loaded)', function () {
      const wrapper = mount(
              <Provider store={ this.store }>
                <Home />
              </Provider>
            ),
            items = wrapper.find( 'section.redux li' )

      expect( items ).to.have.length( 2 )
      items.forEach(( item, i ) => expect( item.text()).to.equal( testContents[i]))
    })

    it( 'has hotReloadDemo component', function () {
      expect( this.wrapper.find( HotReloadDemo )).to.have.length( 1 )
    })
  })
})
