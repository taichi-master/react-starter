import { combineReducers } from 'redux'

import comments from './comments'
import posts from './posts'
import year from './year'

export default combineReducers( {
  comments,
  posts,
  year
} )