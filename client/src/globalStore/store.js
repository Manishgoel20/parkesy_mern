import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import toast from './ducks/toast'
import userAuth from './ducks/userAuth'
import search from './ducks/search'

const middleware = [thunk]

const rootReducers = combineReducers({
  toast: toast,
  userAuth: userAuth,
  search: search,
})

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
