import { Button, CircularProgress } from '@mui/material'

const LoadingButton = ({ loading, text, color, size }) => {
  return (
    <Button
      sx={{ color: 'common.white' }}
      height="100%"
      fullWidth
      variant="contained"
      color={color ? color : 'secondary'}
      size={size ? size : 'large'}
      type="submit"
      disabled={loading}
    >
      {loading ? <CircularProgress size={26} color="inherit" /> : text}
    </Button>
  )
}

export default LoadingButton
