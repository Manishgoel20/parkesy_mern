import axios from 'axios'
import { setToast } from './toast'
// CONSTANTS
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const CHECK_AUTH_REQUEST = 'CHECK_AUTH_REQUEST'
const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

// INITIAL STATE
const initialState = {
  userInfo: null,
  isAuth: false,
}

// ACTIONS

export const checkAuth = () => {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: '/users/me',
    }

    axios(options)
      .then((res) => {
        dispatch({ type: CHECK_AUTH_REQUEST, payload: res.data })
      })
      .catch((err) => {
        dispatch(setToast(true, 'error', `${err.response.data.message}`))
        console.error(err.response.data.message)
      })
  }
}

export const login = ({ siEmail, siPassword }, resetForm, setSubmitting) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      url: '/users/login',
      data: {
        email: siEmail,
        password: siPassword,
      },
    }

    axios(options)
      .then((res) => {
        dispatch({ type: LOGIN_REQUEST, payload: res.data })
        resetForm()
      })
      .catch((err) => {
        dispatch(setToast(true, 'error', `${err.response.data.message}`))
      })
      .finally(() => setSubmitting(false))
  }
}

export const signup = (data) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      url: '/users/signup',
      data,
    }

    axios(options).then((res) =>
      dispatch({ type: SIGNUP_REQUEST, payload: res.data }).catch((err) => {
        dispatch(setToast(true, 'error', `${err.response.data.message}`))
      })
    )
  }
}

// REDUCERS

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        userInfo: action.payload,
        isAuth: true,
      }
    case 'CHECK_AUTH_REQUEST':
      return {
        ...state,
        userInfo: action.payload,
        isAuth: true,
      }
    case 'SIGNUP_REQUEST':
      return {
        ...state,
        userInfo: action.payload,
        isAuth: true,
      }

    default:
      return state
  }
}

export default reducer
