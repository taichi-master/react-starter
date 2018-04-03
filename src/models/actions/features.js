import * as types from 'models/actionTypes'
import axios from 'axios'

import { app } from 'models/constants'

export const invalidateFeatures = () => ({type: types.INVALIDATE_FEATURES});

const requestFeatures = () => ({type: types.REQUEST_FEATURES});

export const receiveFeatures = (payload) => ({
    type: types.RECEIVE_FEATURES,
    payload,
    receivedAt: Date.now()
  });

function fetchFeatures () {
  return (dispatch) => {
    dispatch(requestFeatures())
    return axios.post(app.getUrl.features(), {index:0})
      .then(res => {
        dispatch(receiveFeatures(res.data));
      })
      .catch(err => {
        console.log('action err', err);
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
