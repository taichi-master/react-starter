// https://reactcheatsheet.com/

// https://facebook.github.io/react/docs/test-utils.html

import { assert, expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import sinon from 'sinon'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import reducers from 'reducers'

import HomeConnect from 'containers/Home'
import Home from 'views/Home'
import HotReloadDemoConnect from 'containers/Hot-Reload-Demo'
import HotReloadDemo from 'components/Hot-Reload-Demo'

import * as actions from 'models/actions'
import * as types from 'models/actionTypes'
import { app } from 'models/constants'

describe('Views', function () {

  describe('<Home/>', function () {
    
    const initValue = 'abc',
          initialState = {value: initValue},
          testContents = ["Hey there!", "Yes?"];

    before(function () {
      this.server = sinon.fakeServer.create({autoRespond: true, respondImmediately: true});
      this.server.respondWith("POST", app.getUrl.features(), function (xhr, id) {
        xhr.respond(200,
          {"Content-Type": "application/json"},
          JSON.stringify(testContents)
        );
      });
    });

    after(function () {
      this.server.restore();
    });

    it('can be instantiated', function () {
      const store = createStore(reducers, initialState, applyMiddleware(thunk)),
            component = TestUtils.renderIntoDocument(
              <Provider store={store}>
                <HomeConnect />
              </Provider>
            );

      var homeConnect = TestUtils.findRenderedComponentWithType(component, HomeConnect);
      expect(TestUtils.isCompositeComponent(homeConnect)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(homeConnect, HomeConnect)).to.be.true;

      var home = TestUtils.findRenderedComponentWithType(component, Home);
      expect(TestUtils.isCompositeComponent(home)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(home, Home)).to.be.true;

      var el = ReactDOM.findDOMNode(home);
      expect(el.className).to.be.equal('home');
    });

    it('has Redux Async Action section (before features loaded)', function () {
      const store = createStore(reducers, initialState, applyMiddleware(thunk)),
            component = TestUtils.renderIntoDocument(
              <Provider store={store}>
                <HomeConnect />
              </Provider>
            );

      var section = TestUtils.findRenderedDOMComponentWithClass(component, 'redux');
      expect(section.className).to.be.equal('redux');
      expect(section.tagName).to.be.equal('SECTION');

      var contents = section.getElementsByTagName("LI");
      expect(contents[0].textContent).to.be.equal('Loading...');
    });

    it('has Redux Async Action section (after features loaded)', function () {
      const store = createStore(reducers, initialState, applyMiddleware(thunk));

      return store.dispatch(actions.fetchFeaturesIfNeeded())
        .then(function () { // manually change the store state before instantiate the component.
          expect(store.getState().features.contents).to.be.deep.equal(testContents);

          const component = TestUtils.renderIntoDocument(
                  <Provider store={store}>
                    <HomeConnect />
                  </Provider>
                ),
                section = TestUtils.findRenderedDOMComponentWithClass(component, 'redux'),
                contents = section.getElementsByTagName("LI");

          testContents.forEach((expected, i) => expect(contents[i].textContent).to.be.equal(expected));
        });
    });

    it('has hotReloadDemo component', function () {
      const store = createStore(reducers, initialState, applyMiddleware(thunk)),
            component = TestUtils.renderIntoDocument(
              <Provider store={store}>
                <HomeConnect />
              </Provider>
            );

      var hotReloadDemoConnect = TestUtils.findRenderedComponentWithType(component, HotReloadDemoConnect);
      expect(TestUtils.isCompositeComponent(hotReloadDemoConnect)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(hotReloadDemoConnect, HotReloadDemoConnect)).to.be.true;

      var hotReloadDemo = TestUtils.findRenderedComponentWithType(component, HotReloadDemo);
      expect(TestUtils.isCompositeComponent(hotReloadDemo)).to.be.true;
      expect(TestUtils.isCompositeComponentWithType(hotReloadDemo, HotReloadDemo)).to.be.true;
      expect(hotReloadDemo.state.value1).to.be.equal(initValue);
      expect(hotReloadDemo.state.value2).to.be.equal('');
    });
  });
});
