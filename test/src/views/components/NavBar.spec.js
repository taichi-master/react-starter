import { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import reducers from 'reducers'
import { MemoryRouter } from 'react-router-dom'

import NavBar from 'components/NavBar'

Enzyme.configure({ adapter: new Adapter() })

describe( 'Components', function () {

  describe( '<NavBar/>', function () {
    
    const initValue = 'abc',
          initialState = { value: initValue }

    before( function () {
      const store = createStore( reducers, initialState, applyMiddleware( thunk ))

      this.wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <NavBar className="nav-bar" />
          </MemoryRouter>
        </Provider>
      )
    })

    it( 'can be instantiated', function () {
      expect( this.wrapper.find( NavBar )).to.have.length( 1 )
      expect( this.wrapper.find( NavBar ).prop( 'className' )).to.be.equal( 'nav-bar' )
    })

  })
})
