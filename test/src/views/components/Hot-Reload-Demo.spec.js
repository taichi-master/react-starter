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

import HotReloadDemo from 'components/Hot-Reload-Demo'

Enzyme.configure({ adapter: new Adapter() });

describe('Components', function () {

  describe('<HotReloadDemo/>', function () {

    const comment = 'Enter some comments here.',
          initValue = 'abc',
          initialState = {value: initValue};

    before(function () {
      const store = createStore(reducers, initialState, applyMiddleware(thunk));

      this.s_wrapper = shallow(
        <HotReloadDemo store={store}>
          {comment}
        </HotReloadDemo>
      ).dive();

      this.m_wrapper = mount(
        <HotReloadDemo store={store}>
          {comment}
        </HotReloadDemo>
      );
    });

    it('can be instantiated', function () {
      expect( this.s_wrapper ).to.have.length( 1 );
      expect( this.s_wrapper.prop('className') ).to.be.equal( 'hot-reload-demo' );
    });

    it('should have state.value1 and state.value2', function () {
      const component = this.s_wrapper.instance();

      expect( component.state.value1 ).to.be.equal( initValue );
      expect( component.state.value2 ).to.be.equal( '' );
    });

    it('should have three inputs', function () {
      const inputs = this.m_wrapper.find('input');
      const el = ReactDOM.findDOMNode(inputs.at(0).instance());

      expect( inputs ).to.have.lengthOf( 3 );

      expect( el.value ).to.be.equal( 'abc' );
      inputs.at(0).simulate('change', {target: {value: '123'}});      
      expect( el.value ).to.be.equal( '123' );
    });

    it('should have children as the comment', function () {
      expect( this.m_wrapper.prop('children') ).to.be.equal( comment );
    });
  });
});
