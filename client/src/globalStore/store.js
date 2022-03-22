import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import toast from './ducks/toast'

const middleware = [thunk]

const rootReducers = combineReducers({
  toast: toast,
})

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
