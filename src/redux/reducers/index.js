import { combineReducers } from 'redux'
import preloader from './preloader'
import posts from './posts'
import users from './users'

export default combineReducers({
  preloader,
  users,
  posts,
})
