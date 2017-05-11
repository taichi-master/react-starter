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

import HotReloadDemoConnect from 'containers/Hot-Reload-Demo'
import HotReloadDemo from 'components/Hot-Reload-Demo'

describe('Components', function () {

  describe('<HotReloadDemo/>', function () {

    const comment = 'Enter some comments here.',
          initValue = 'abc',
          initialState = {value: initValue},
          store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware));

    let component;

    beforeEach(function () {
      component = TestUtils.renderIntoDocument(
        <Provider store={store}>
          <HotReloadDemoConnect>
            {comment}
          </HotReloadDemoConnect>
        </Provider>
      );
    });

    it('can be instantiated', function () {
      expect(HotReloadDemo).to.exist;
      expect(TestUtils.isElement(<HotReloadDemo/>)).to.be.true;
      expect(TestUtils.isElementOfType(<HotReloadDemo/>, HotReloadDemo)).to.be.true;

      expect(component).to.exist;
      expect(TestUtils.isCompositeComponent(component)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(component, Provider)).to.be.true;

      var hotReloadDemoConnect = TestUtils.findRenderedComponentWithType(component, HotReloadDemoConnect);
      expect(TestUtils.isCompositeComponent(hotReloadDemoConnect)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(hotReloadDemoConnect, HotReloadDemoConnect)).to.be.true;

      var hotReloadDemo = TestUtils.findRenderedComponentWithType(component, HotReloadDemo);
      expect(TestUtils.isCompositeComponent(hotReloadDemo)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(hotReloadDemo, HotReloadDemo)).to.be.true;
    });

    it('should have state.value1 and state.value2', function () {
      var hotReloadDemo = TestUtils.findRenderedComponentWithType(component, HotReloadDemo);
      expect(hotReloadDemo.state.value1).to.be.equal(initValue);
      expect(hotReloadDemo.state.value2).to.be.equal('');
    });

    it('should have three inputs', function () {
      var inputs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs).to.have.lengthOf(3);
      expect(TestUtils.isDOMComponent(inputs[0])).to.be.true;
      expect(TestUtils.isDOMComponent(inputs[1])).to.be.true;
      expect(TestUtils.isDOMComponent(inputs[2])).to.be.true;

      TestUtils.Simulate.change(inputs[1], {target: {value: '123'}});
      TestUtils.Simulate.change(inputs[2], {target: {value: '456'}});
      expect(inputs[0].value).to.be.equal('abc');
      expect(inputs[1].value).to.be.equal('123');
      expect(inputs[2].value).to.be.equal('');

      TestUtils.Simulate.change(inputs[0], {target: {value: 'def'}});
      expect(inputs[0].value).to.be.equal('def');

      var hotReloadDemo = TestUtils.findRenderedComponentWithType(component, HotReloadDemo);
      expect(hotReloadDemo.state.value1).to.be.equal('def');
      expect(hotReloadDemo.state.value2).to.be.equal('123');
    });

    it('should have children as the comment', function () {
      var hotReloadDemo = TestUtils.findRenderedComponentWithType(component, HotReloadDemo);
      expect(hotReloadDemo.props.children).to.be.equal(comment);
    });
  });
});
