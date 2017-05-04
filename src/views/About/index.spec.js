import { assert, expect } from 'chai'
import React from 'react'
import { renderIntoDocument, isElement } from 'react-dom/test-utils'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import reducers from 'reducers'

import About from 'views/About'

describe('About', function () {

  const initialState = {value: 'abc'},
        store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware));

  it('can be imported', () => {
    expect(About).to.exist;
  });

  it('should render', function () {
    const component = renderIntoDocument(
      <Provider store={store}>
        <About />
      </Provider>
    );
    expect(component).to.exist;
  });
});
