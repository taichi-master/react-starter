import { createSlice } from "@reduxjs/toolkit"

export const quoteSlice = createSlice( {
  name: 'quote',
  initialState: {
    content: {},
    isLoading: false
  },
  reducers: {
    getQuoteFetch: state => ( { ...state, isLoading: true } ),
    getQuoteSuccess: ( state, action ) => ( { content: action.payload, isLoading: false } ),
    getQuoteFailure: state => ( { ...state, isLoading: false } )
  }
} )

export const { getQuoteFetch, getQuoteSuccess, getQuoteFailure } = quoteSlice.actions

export default quoteSlice.reducer