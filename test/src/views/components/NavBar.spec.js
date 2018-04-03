// https://reactcheatsheet.com/

// https://facebook.github.io/react/docs/test-utils.html

import { assert, expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import reducers from 'reducers'
import { Route, Link, MemoryRouter } from 'react-router-dom'

import NavBar from 'components/NavBar'

describe('Components', function () {

  describe('<NavBar/>', function () {
    
    const initValue = 'abc',
          initialState = {value: initValue},
          store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware));

    it('can be imported', function () {
      expect(NavBar).to.exist;
      expect(TestUtils.isElement(<NavBar/>)).to.be.true;
      expect(TestUtils.isElementOfType(<NavBar/>, NavBar)).to.be.true;
    });

    it('should renderIntoDocument', function () {
      const component = TestUtils.renderIntoDocument(
        <Provider store={store}>
          <MemoryRouter>
            <NavBar />
          </MemoryRouter>
        </Provider>
      );
      expect(component).to.exist;
      expect(TestUtils.isCompositeComponent(component)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(component, Provider)).to.be.true;

      var navBar = TestUtils.findRenderedComponentWithType(component, NavBar);
      expect(TestUtils.isCompositeComponent(navBar)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(navBar, NavBar)).to.be.true;
    });
  });
});
