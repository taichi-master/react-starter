import { assert, expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount, shallow } from 'enzyme'

import reducers from 'reducers'

import About from 'views/About'
import HotReloadDemo from 'components/Hot-Reload-Demo'

Enzyme.configure({ adapter: new Adapter() });

describe('Views', function () {

  describe('<About/>', function () {
    
    const initValue = 'abc',
          initialState = {value: initValue};

    before(function () {
      this.store = createStore(reducers, initialState, applyMiddleware(thunk));

      this.wrapper = mount(
        <Provider store={this.store}>
          <About />
        </Provider>
      );
    });

    it('can be instantiated', function () {
      const component = this.wrapper.find(About).instance(),
            el = ReactDOM.findDOMNode(component);

      expect( el.className ).to.be.equal( 'about' );
    });

    it('has hotReloadDemo component', function () {
      expect( this.wrapper.find(HotReloadDemo) ).to.have.length( 1 );
    });
  });
});
