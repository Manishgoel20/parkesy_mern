import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ScheduleIcon from '@mui/icons-material/Schedule'

const DateTimeInput = ({ value, label }) => {
  let min = value.getMinutes()
  let hr = value.getHours()

  if (min < 10) min = '0' + min
  if (hr < 10) hr = '0' + hr
  return (
    <Box className="dateTime">
      <Typography variant="overline" style={{ lineHeight: 0 }}>
        {label}
      </Typography>
      <Box
        className="dateTime__info"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          mr={2}
        >
          <CalendarMonthIcon size="medium" style={{ marginRight: '10px' }} />
          {value.toDateString()}
        </Box>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <ScheduleIcon size="medium" style={{ marginRight: '10px' }} />
          {hr + ':' + min}
        </Box>
      </Box>
    </Box>
  )
}

export default DateTimeInput
