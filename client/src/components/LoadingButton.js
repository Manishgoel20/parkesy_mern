import { Button, CircularProgress } from '@mui/material'

const LoadingButton = ({ loading, text }) => {
  return (
    <Button
      sx={{ color: 'common.white' }}
      height="100%"
      fullWidth
      variant="contained"
      color="secondary"
      size="large"
      type="submit"
      disabled={loading}
    >
      {loading ? <CircularProgress size={26} color="inherit" /> : text}
    </Button>
  )
}

export default LoadingButton
