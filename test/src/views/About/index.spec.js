// https://reactcheatsheet.com/

// https://facebook.github.io/react/docs/test-utils.html

import { assert, expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import ReactTestRenderer from 'react-test-renderer'
import ReactShallowRenderer from 'react-test-renderer/shallow'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import reducers from 'reducers'

import About from 'views/About'
import HotReloadDemoConnect from 'containers/Hot-Reload-Demo'
import HotReloadDemo from 'components/Hot-Reload-Demo'

describe('Views', function () {

  describe('<About/>', function () {
    
    const initValue = 'abc',
          initialState = {value: initValue},
          store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware));

    it('can be imported', function () {
      expect(About).to.exist;
      expect(TestUtils.isElement(<About/>)).to.be.true;
      expect(TestUtils.isElementOfType(<About/>, About)).to.be.true;
    });

    it('should renderIntoDocument', function () {
      const component = TestUtils.renderIntoDocument(
        <Provider store={store}>
          <About />
        </Provider>
      );
      expect(component).to.exist;
      expect(TestUtils.isCompositeComponent(component)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(component, Provider)).to.be.true;

      var about = TestUtils.findRenderedComponentWithType(component, About);
      expect(TestUtils.isCompositeComponent(about)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(about, About)).to.be.true;

      var hotReloadDemoConnect = TestUtils.findRenderedComponentWithType(component, HotReloadDemoConnect);
      expect(TestUtils.isCompositeComponent(hotReloadDemoConnect)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(hotReloadDemoConnect, HotReloadDemoConnect)).to.be.true;

      var hotReloadDemo = TestUtils.findRenderedComponentWithType(component, HotReloadDemo);
      expect(TestUtils.isCompositeComponent(hotReloadDemo)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(hotReloadDemo, HotReloadDemo)).to.be.true;
      expect(hotReloadDemo.state.value1).to.be.equal(initValue);
      expect(hotReloadDemo.state.value2).to.be.equal('');

      var div = TestUtils.findRenderedDOMComponentWithClass(component, 'about');
      expect(TestUtils.isDOMComponent(div)).to.be.true;
      expect(div.tagName).to.be.equal('DIV');
      expect(div.className).to.be.equal('about');

      expect(div).to.be.equal(ReactDOM.findDOMNode(about));
      // p.s. you can also use findDOMNode to find the DOM from a given component
    });

    it('should ReactTestRenderer', function () {
      const renderer = ReactTestRenderer.create(
        <Provider store={store}>
          <About />
        </Provider>
      );
      expect(TestUtils.isElement(renderer)).to.be.false;
      expect(TestUtils.isCompositeComponent(renderer)).to.be.false;
      expect(TestUtils.isDOMComponent(renderer)).to.be.false;

      const tree = renderer.toJSON();
      expect(TestUtils.isElement(tree)).to.be.false;
      expect(TestUtils.isCompositeComponent(tree)).to.be.false;
      expect(TestUtils.isDOMComponent(tree)).to.be.false;

      expect(tree.type).to.be.equal('div');
      expect(tree.props.className).to.be.equal('about');
      expect(tree.children).to.have.lengthOf(3);
      expect(tree.children[0].type).to.be.equal('h1');
      expect(tree.children[0].children[0]).to.be.equal('About...');
    });

    it('should ReactShallowRenderer', function () {
      const renderer = new ReactShallowRenderer();  // Shallow rendering lets you render a component "one level deep"
      renderer.render(
        <Provider store={store}>
          <About />
        </Provider>
      );
      const result = renderer.getRenderOutput();
      expect(TestUtils.isElement(result)).to.be.true;
      expect(TestUtils.isElementOfType(result, About)).to.be.true;
    });
  });
});
