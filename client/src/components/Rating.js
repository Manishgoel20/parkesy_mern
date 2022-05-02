import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const Rating = ({ value, text, color }) => {
  return (
    <Box display="flex">
      <Box>
        <span>
          {value >= 1 ? (
            <StarOutlinedIcon fontSize="small" color={`${color}`} />
          ) : value >= 0.5 ? (
            <StarHalfOutlinedIcon fontSize="small" color={`${color}`} />
          ) : (
            <StarBorderOutlinedIcon fontSize="small" color={`${color}`} />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <StarOutlinedIcon fontSize="small" color={`${color}`} />
          ) : value >= 1.5 ? (
            <StarHalfOutlinedIcon fontSize="small" color={`${color}`} />
          ) : (
            <StarBorderOutlinedIcon fontSize="small" color={`${color}`} />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <StarOutlinedIcon fontSize="small" color={`${color}`} />
          ) : value >= 2.5 ? (
            <StarHalfOutlinedIcon fontSize="small" color={`${color}`} />
          ) : (
            <StarBorderOutlinedIcon fontSize="small" color={`${color}`} />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <StarOutlinedIcon fontSize="small" color={`${color}`} />
          ) : value >= 3.5 ? (
            <StarHalfOutlinedIcon fontSize="small" color={`${color}`} />
          ) : (
            <StarBorderOutlinedIcon fontSize="small" color={`${color}`} />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <StarOutlinedIcon fontSize="small" color={`${color}`} />
          ) : value >= 4.5 ? (
            <StarHalfOutlinedIcon fontSize="small" color={`${color}`} />
          ) : (
            <StarBorderOutlinedIcon fontSize="small" color={`${color}`} />
          )}
        </span>
      </Box>
      <Typography variant="subtitle2">&nbsp;{text && text}</Typography>
    </Box>
  )
}

export default Rating
