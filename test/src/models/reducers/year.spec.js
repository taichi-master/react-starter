import reducer from 'reducers/year'
import * as types from 'constants/action-types'

describe( 'year reducer', () => {
  it( 'should return the initial state', () => {
    expect( reducer( undefined, {} ) ).toBe( 0 )
  } )

  it( 'should handle SET_YEAR', () => {
    const action = { type: types.SET_YEAR, year : 2021 }

    expect( reducer( undefined, action ) ).toBe( 2021 )
  } )
} )