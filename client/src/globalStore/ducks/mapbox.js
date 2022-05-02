import axios from 'axios'

const GET_AUTOCOMPLETE = 'GET_AUTOCOMPLETE'
const GET_PLACE_NAME = 'GET_PLACE_NAME'
const SET_GEO_LOCATION = 'SET_GEO_LOCATION'

// INITIAL STATE
const initialState = {
  autoComplete: [],
  place: '',
  lat: null,
  lng: null,
}

export const getAutocomplete = (text) => {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_MB_ACCESS_TOKEN}`,
      withCredentials: false,
    }

    axios(options)
      .then((res) => {
        dispatch({ type: GET_AUTOCOMPLETE, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

export const getPlaceName = ({ lat, lng }) => {
  return (dispatch) => {
    const options = {
      method: 'GET',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.REACT_APP_MB_ACCESS_TOKEN}`,
      withCredentials: false,
    }

    axios(options)
      .then((res) => {
        dispatch({ type: GET_PLACE_NAME, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

export const setGeoLocation = ({ place, lat, lng }) => {
  return {
    type: SET_GEO_LOCATION,
    payload: { place, lat, lng },
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_AUTOCOMPLETE':
      return {
        ...state,
        autoComplete: action.payload.features,
      }
    case 'SET_GEO_LOCATION':
      return {
        ...state,
        place: action.payload.place,
        lat: action.payload.lat,
        lng: action.payload.lng,
      }
    case 'GET_PLACE_NAME':
      return {
        ...state,
        place: action.payload.features[0].place_name,
        lng: action.payload.query[0],
        lat: action.payload.query[1],
      }
    default:
      return state
  }
}

export default reducer
