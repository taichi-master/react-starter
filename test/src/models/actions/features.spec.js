import { expect } from 'chai'
import sinon from 'sinon'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from 'models/actions'
import * as types from 'models/actionTypes'
import { app } from 'models/constants'

const middlewares = [thunk],
      mockStore = configureMockStore( middlewares )

describe( 'Actions', function () {

  const testContents = [ "Hey there!", "Yes?" ],
        expectedActions = [
          { type: types.REQUEST_FEATURES },
          { type: types.RECEIVE_FEATURES, payload: testContents, receivedAt: null }
        ]

  describe( 'fetchFeaturesIfNeeded', function () {

    before( function () {
      this.server = sinon.fakeServer.create({ autoRespond: true, respondImmediately: true })
      this.server.respondWith( "POST", app.getUrl.features(), function ( xhr ) {
        xhr.respond( 200,
          { "Content-Type": "application/json" },
          JSON.stringify( testContents )
        )
      })
    })

    after( function () {
      this.server.restore()
    })

    it( 'should create an action to fetch Features data', function () {

      const store = mockStore({ features:{
        isFetching: false,
        didInvalidate: true,
        features: []
      }})

      store.dispatch( actions.fetchFeaturesIfNeeded())
        .then( function () { // return of async actions
          let actions = store.getActions()

          expectedActions[1].receivedAt = actions[1].receivedAt
          expect( actions ).to.be.deep.equal( expectedActions )
        })
    })
  })
})
