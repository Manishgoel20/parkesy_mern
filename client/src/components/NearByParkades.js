import { useTheme } from '@emotion/react'
import { Button, Chip, Divider, Grid, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'

import TimelapseIcon from '@mui/icons-material/Timelapse'
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import ImagePlace from '../assets/images/imgPlace1.jpg'
import Rating from './Rating'
import { useEffect, useState } from 'react'

const NearByParkades = ({ parkade, vehicle, index }) => {
  const theme = useTheme()
  const [availSlots, setAvailSlots] = useState(0)

  useEffect(() => {
    if (vehicle === 'bike') {
      if (parkade?.alreadyBooked.length > 0)
        setAvailSlots(
          parkade.vehicleSlots.bike - parkade.alreadyBooked[0].totalBooking
        )
      else setAvailSlots(parkade.vehicleSlots.bike)
    } else if (vehicle === 'car') {
      if (parkade?.alreadyBooked.length > 0)
        setAvailSlots(
          parkade.vehicleSlots.car - parkade.alreadyBooked[0].totalBooking
        )
      else setAvailSlots(parkade.vehicleSlots.car)
    } else if (vehicle === 'bus') {
      if (parkade?.alreadyBooked.length > 0)
        setAvailSlots(
          parkade.vehicleSlots.bus - parkade.alreadyBooked[0].totalBooking
        )
      else setAvailSlots(parkade.vehicleSlots.bus)
    }
  }, [vehicle])

  return (
    <Box position="relative">
      {index === 0 && (
        <Chip
          label="Closer"
          color="secondary"
          size="small"
          style={{ position: 'absolute', zIndex: 1, left: 1, top: -3 }}
        />
      )}
      <Box m={1} mb={2} className="card">
        <Grid container spacing={2} width="100%" height="100%">
          <Grid
            item
            md={4}
            xs={4}
            width="100%"
            height="100%"
            position="relative"
          >
            <Chip
              label={`Avalibility : ${availSlots}`}
              color="secondary"
              size="small"
              style={{
                position: 'absolute',
                left: '50%',
                bottom: -3,
                transform: 'translateX(-40%)',
              }}
            />
            <img
              className="card__img"
              src={parkade.images.length > 0 ? parkade.images[0] : ImagePlace}
              alt={`parkade${parkade.name}`}
            />
          </Grid>
          <Grid
            item
            md={8}
            xs={8}
            container
            direction="column"
            justifyContent="space-between"
          >
            <Box width="100%">
              <Typography
                variant="h6"
                color={theme.palette.common.dark}
                className="u-truncate"
              >
                {parkade.name}
              </Typography>
              <Typography
                variant="body1"
                color={theme.palette.common.dark}
                className="u-truncate"
              >
                {parkade.description}
              </Typography>

              <Box mt={1} display="flex">
                <Rating
                  color="secondary"
                  text="Ratings"
                  value={parkade.ratingsAvg}
                />
                <Box mx={1}>
                  <Divider orientation="vertical" />
                </Box>
                <Box display="flex" alignItems="baseline">
                  <Typography variant="body1">
                    {parkade.ratingsQuantity}
                  </Typography>
                  <Typography variant="subtitle2">&nbsp;Reviews</Typography>
                </Box>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box mt={1}>
                <Tooltip title="24/7 Facility" placement="top">
                  <TimelapseIcon
                    style={{ marginRight: 10 }}
                    color={parkade.features.is24hr ? 'secondary' : 'disabled'}
                  />
                </Tooltip>
                <Tooltip title="CCTV" placement="top">
                  <PhotoCameraFrontIcon
                    style={{ marginRight: 10 }}
                    color={parkade.features.isCctv ? 'secondary' : 'disabled'}
                  />
                </Tooltip>
                <Tooltip title="Flexible Entry" placement="top">
                  <TransferWithinAStationIcon
                    style={{ marginRight: 10 }}
                    color={
                      parkade.features.flexibleEntry ? 'secondary' : 'disabled'
                    }
                  />
                </Tooltip>
              </Box>

              <Box display="flex" alignItems="end">
                <Button type="submit" variant="contained" color="primary">
                  Book @ rs.999
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default NearByParkades
