import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import toast from './ducks/toast'
import userAuth from './ducks/userAuth'
import search from './ducks/search'
import mapbox from './ducks/mapbox'
import parkade from './ducks/parkade'

const middleware = [thunk]

const rootReducers = combineReducers({
  toast: toast,
  userAuth: userAuth,
  search: search,
  mapbox: mapbox,
  parkadeData: parkade,
})

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
