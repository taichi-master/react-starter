import * as types from 'models/actionTypes'
import fetch from 'isomorphic-fetch'

import { app } from 'models/constants'

export const invalidateFeatures = () => ({type: types.INVALIDATE_FEATURES});

const requestFeatures = () => ({type: types.REQUEST_FEATURES});

export const receiveFeatures = (contents) => ({
    type: types.RECEIVE_FEATURES,
    contents,
    receivedAt: Date.now()
  });

function fetchFeatures () {
  return (dispatch) => {
    dispatch(requestFeatures())
    let headers = new Headers();
        headers.append('Content-Type', 'application/json');
    // return fetch(app.getUrl.features(0)) // GET
    return fetch("http:/" + app.getUrl.features(), {method:'post', headers, body:JSON.stringify({index:0})})
      .then(res => {
        return res.json()
      })
      .then(json => {
        dispatch(receiveFeatures(json));
      })
      .catch(err => {
        // console.log('action err', err);
      });
  }
}

function shouldfetchFeatures (state) {
  const { features } = state;
  if (features.isFetching) {
    return false
  }
  return features.didInvalidate
}

export function fetchFeaturesIfNeeded () {
  return (dispatch, getState) => {
    if (shouldfetchFeatures(getState())) {
      return dispatch(fetchFeatures())
    }
  }
}
