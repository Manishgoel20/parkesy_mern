import axios from 'axios'
import { setToast } from './toast'

const CREATE_PARKADE = 'CREATE_PARKADE'
const GET_MY_PARKADES = 'GET_MY_PARKADES'
const GET_NEARBY_PARKADES = 'GET_NEARBY_PARKADES'
const GET_SINGLE_PARKADE = 'GET_SINGLE_PARKADE'
const RESET_PARKADE = 'RESET_PARKADE'
const RESET_MY_PARKADES = 'RESET_MY_PARKADES'
const UPDATE_PARKADE = 'UPDATE_PARKADE'
const DELETE_PARKADE = 'DELETE_PARKADE'
const GET_APPROVED_PARKADES = 'GET_APPROVED_PARKADES'
const GET_REQUESTED_PARKADES = 'GET_REQUESTED_PARKADES'

const initialState = {
  parkade: null,
  myParkades: null,
  nearbyParkades: null,
}

export const resetParkade = () => {
  return { type: RESET_PARKADE }
}

export const resetMyParkades = () => {
  return { type: RESET_MY_PARKADES }
}

export const createParkade = (data, resetForm, setSubmitting, navigate) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      url: '/parkades',
      data,
    }

    axios(options)
      .then((res) => {
        dispatch({ type: CREATE_PARKADE, payload: res.data })
        dispatch(
          setToast(true, 'success', `Your Parkade is sent for Approval!`)
        )
        resetForm()
      })
      .catch((err) => {
        dispatch(setToast(true, 'error', `${err.response.data.message}`))
      })
      .finally(setSubmitting(false))
      .finally(navigate('/user/my-parkades', { replace: true }))
  }
}

export const getApprovedParkades = () => {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: '/parkades',
    }

    dispatch(resetMyParkades())

    axios(options)
      .then((res) => {
        dispatch({ type: GET_APPROVED_PARKADES, payload: res.data })
      })
      .catch((err) => {
        dispatch(setToast(true, 'error', `${err.response.data.message}`))
        console.log(err)
      })
  }
}

export const getRequestedParkades = () => {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: '/parkades/requested-parkades',
    }

    dispatch(resetMyParkades())

    axios(options)
      .then((res) => {
        dispatch({ type: GET_REQUESTED_PARKADES, payload: res.data })
      })
      .catch((err) => {
        dispatch(setToast(true, 'error', `${err.response.data.message}`))
      })
  }
}

export const getMyParkades = () => {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: `/parkades/my-parkades`,
    }

    dispatch(resetMyParkades())

    axios(options)
      .then((res) => {
        dispatch({ type: GET_MY_PARKADES, payload: res.data })
      })
      .catch((err) => {
        dispatch(setToast(true, 'error', `${err.response.data.message}`))
      })
  }
}

export const getSingleParkade = (id) => {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: `/parkades/${id}`,
    }

    dispatch(resetParkade())

    axios(options)
      .then((res) => {
        dispatch({ type: GET_SINGLE_PARKADE, payload: res.data })
      })
      .catch((err) => {
        dispatch(setToast(true, 'error', `${err.response.data.message}`))
      })
  }
}

export const updateParkade = (id, userId, data, setSubmitting, navigate) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',
      url: `/parkades/${id}`,
      data,
    }

    axios(options)
      .then((res) => {
        dispatch({ type: UPDATE_PARKADE, payload: res.data })
        dispatch(
          setToast(true, 'success', `Your Parkade is updated successfully!`)
        )
      })
      .catch((err) => {
        dispatch(setToast(true, 'error', `${err.response.data.message}`))
        setSubmitting(false)
      })
      .finally(setSubmitting(false))
      .finally(navigate(-1))
  }
}

export const deleteParkade = (id, setDelLoader) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      url: `/parkades/${id}`,
    }

    axios(options)
      .then((res) => {})
      .catch((err) => {
        dispatch(setToast(true, 'error', `${err.response.data.message}`))
      })
      .finally(dispatch({ type: DELETE_PARKADE, payload: id }))
      .finally(dispatch(setToast(true, 'success', `Parkade is Deleted!`)))
      .finally(setDelLoader(false))
  }
}

// /parkades-near-me/:lat/:lng/:st/:et/:vehicle/:dist
export const getNearbyParkades = ({ lat, lng, st, et, vehicle, dist }) => {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: `/parkades/parkades-near-me/${lat}/${lng}/${st}/${et}/${vehicle}/${dist}`,
    }

    axios(options)
      .then((res) => {
        dispatch({ type: GET_NEARBY_PARKADES, payload: res.data })
      })
      .catch((err) => {
        dispatch(setToast(true, 'error', `${err.response.data.message}`))
      })
  }
}

// REDUCERS

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_PARKADE':
      return {
        ...state,
        parkade: action.payload.data.parkade,
        myParkades: [...state.myParkades, action.payload.data.parkade],
      }
    case 'GET_NEARBY_PARKADES':
      return {
        ...state,
        nearbyParkades: action.payload.data.parkades,
      }
    case 'DELETE_PARKADE':
      return {
        ...state,
        parkade: null,
        myParkades: state.myParkades.filter(
          (data) => data._id !== action.payload
        ),
      }
    case 'GET_MY_PARKADES':
      return {
        ...state,
        myParkades: action.payload.data.parkades,
      }
    case 'GET_APPROVED_PARKADES':
      return {
        ...state,
        myParkades: action.payload.data.parkades,
      }
    case 'GET_REQUESTED_PARKADES':
      return {
        ...state,
        myParkades: action.payload.data.parkades,
      }
    case 'GET_SINGLE_PARKADE':
      return {
        ...state,
        parkade: action.payload.data.parkade,
      }
    case 'RESET_PARKADE':
      return {
        ...state,
        parkade: null,
      }
    case 'RESET_MY_PARKADES':
      return {
        ...state,
        myParkades: null,
      }
    default:
      return state
  }
}

export default reducer
