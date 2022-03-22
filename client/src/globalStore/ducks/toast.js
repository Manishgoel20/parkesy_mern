// CONSTANTS
const SET_TOAST = 'SET_TOAST'

// INITIAL STATE
const initialState = {
  isOpen: false,
  type: 'success',
  text: '',
}

// ACTIONS
export const setToast = (isOpen, type, text) => {
  return {
    type: SET_TOAST,
    payload: { isOpen, type, text },
  }
}

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOAST':
      return {
        ...state,
        isOpen: action.payload.isOpen,
        type: action.payload.type,
        text: action.payload.text,
      }
    default:
      return state
  }
}

export default reducer
