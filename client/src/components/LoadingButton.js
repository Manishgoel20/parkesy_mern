import { Button, CircularProgress } from '@mui/material'

const LoadingButton = ({
  loading,
  text,
  color,
  size,
  lineHeight,
  fullWidth,
  textColor,
}) => {
  return (
    <Button
      sx={{ color: textColor ? textColor : 'common.white' }}
      style={{ lineHeight: lineHeight ? lineHeight : 'initial' }}
      height="100%"
      variant="contained"
      color={color ? color : 'secondary'}
      size={size ? size : 'large'}
      type="submit"
      disabled={loading}
      fullWidth={fullWidth ? fullWidth : false}
    >
      {loading ? <CircularProgress size={26} color="inherit" /> : text}
    </Button>
  )
}

export default LoadingButton
