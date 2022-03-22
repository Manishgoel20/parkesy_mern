import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../globalStore/ducks/toast'

const Toast = () => {
  const dispatch = useDispatch()
  const toastSettings = useSelector((state) => state.toast)
  const { isOpen, type, text } = toastSettings

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      dispatch(setToast(false, type, text))
    }

    dispatch(setToast(false, type, text))
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        variant="filled"
        severity={type}
        sx={{ width: '100%' }}
      >
        {text}
      </Alert>
    </Snackbar>
  )
}

export default Toast
