// CONSTANTS
const SET_LOCATION = 'SET_LOCATION'
const SET_START_DATE_TIME = 'SET_START_DATE_TIME'
const SET_REF_START_DATE_TIME = 'SET_REF_START_DATE_TIME'
const SET_END_DATE_TIME = 'SET_END_DATE_TIME'
const SET_REF_END_DATE_TIME = 'SET_REF_END_DATE_TIME'
const SET_VEHICLE_TYPE = 'SET_VEHICLE_TYPE'
const SET_COORDINATES = 'SET_COORDINATES'
const SET_SDT = 'SET_SDT'
const SET_EDT = 'SET_EDT'

// INITIAL STATE
const initialState = {
  // locationName: 'Connaught Place, New Delhi, Delhi, India',
  // lat: 28.6304,
  // lng: 77.2177,
  locationName: '',
  lat: null,
  lng: null,
  startDateTime: new Date(),
  refStartDate: new Date(),
  endDateTime: new Date(),
  refEndDate: null,
  vehicle: 'car',
  SDT: false,
  EDT: false,
}

// ACTIONS

export const setStartDateTime = (startDate) => {
  return {
    type: SET_START_DATE_TIME,
    payload: { startDate },
  }
}

export const setEndDateTime = (endDate) => {
  return {
    type: SET_END_DATE_TIME,
    payload: { endDate },
  }
}
export const setRefStartDateTime = (startDate) => {
  return {
    type: SET_REF_START_DATE_TIME,
    payload: { startDate },
  }
}

export const setRefEndDateTime = (endDate) => {
  return {
    type: SET_REF_END_DATE_TIME,
    payload: { endDate },
  }
}

export const setSDT = () => {
  return {
    type: SET_SDT,
  }
}

export const setEDT = () => {
  return {
    type: SET_EDT,
  }
}

export const setVehicle = (val) => {
  return {
    type: SET_VEHICLE_TYPE,
    payload: { val },
  }
}

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_START_DATE_TIME':
      return {
        ...state,
        startDateTime: action.payload.startDate,
      }
    case 'SET_END_DATE_TIME':
      return {
        ...state,
        endDateTime: action.payload.endDate,
      }
    case 'SET_REF_START_DATE_TIME':
      return {
        ...state,
        refStartDate: action.payload.startDate,
      }
    case 'SET_REF_END_DATE_TIME':
      return {
        ...state,
        refEndDate: action.payload.endDate,
      }
    case 'SET_SDT':
      return {
        ...state,
        SDT: !state.SDT,
      }
    case 'SET_EDT':
      return {
        ...state,
        EDT: !state.EDT,
      }
    case 'SET_VEHICLE_TYPE':
      return {
        ...state,
        vehicle: action.payload.val,
      }
    default:
      return state
  }
}

export default reducer
