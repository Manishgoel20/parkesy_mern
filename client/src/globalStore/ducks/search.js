// CONSTANTS
const SET_LOCATION = 'SET_LOCATION'
const SET_START_DATE_TIME = 'SET_START_DATE_TIME'
const SET_END_DATE_TIME = 'SET_END_DATE_TIME'
const SET_VEHICLE_TYPE = 'SET_VEHICLE_TYPE'

// INITIAL STATE
const initialState = {
  locationName: '',
  coordinates: null,
  startDateTime: new Date(),
  refStartDate: new Date(),
  endDateTime: new Date(),
  refEndDate: null,
  vehicle: 'car',
}

// ACTIONS
export const setLocation = () => {
  return {
    type: SET_LOCATION,
    // payload: { isOpen, type, text },
  }
}

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

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOAST':
      return {
        ...state,
      }
    default:
      return state
  }
}

export default reducer
