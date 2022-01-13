import * as actions from 'actions'
import * as types from 'constants/action-types'

describe( 'actions', () => {
  it( 'setYear', () => {
    expect( actions.setYear( 2021 ) ).toEqual( {
      type: types.SET_YEAR,
      year: 2021
    } )
  } )
} )