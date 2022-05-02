import { useTheme } from '@emotion/react'
import {
  Button,
  Chip,
  Divider,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'

import TimelapseIcon from '@mui/icons-material/Timelapse'
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import ImagePlace from '../assets/images/imgPlace1.jpg'
import Modal from './Modal'
import Rating from './Rating'
import { useEffect, useState } from 'react'
import moment from 'moment'

const NearByParkades = ({ parkade, vehicle, index, st, et }) => {
  const theme = useTheme()
  const [availSlots, setAvailSlots] = useState(0)
  const [amt, setAmt] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [vehicleNumber, setVehicleNumber] = useState('')

  const handleModalClose = () => {
    setIsOpen(false)
  }

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

  useEffect(() => {
    const price = CalcPrice({ st, et, parkade, vehicle })
    setAmt(price)
  }, [])

  return (
    <>
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
                color={availSlots <= 0 ? 'error' : 'secondary'}
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
                        parkade.features.flexibleEntry
                          ? 'secondary'
                          : 'disabled'
                      }
                    />
                  </Tooltip>
                </Box>

                <Box display="flex" alignItems="end">
                  <Button
                    variant="contained"
                    color="success"
                    disabled={availSlots === 0 ? true : false}
                    onClick={() => setIsOpen(true)}
                  >
                    Book ₹{amt}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Modal
        isOpen={isOpen}
        handleClose={handleModalClose}
        btnText={`Proceed to Pay ₹${amt}`}
        title="One step away from Booking!"
      >
        <Box mt={2}>
          <TextField
            id="vehicleNum"
            label="Vehicle Number"
            type="text"
            color="secondary"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
            fullWidth
          />
        </Box>
      </Modal>
    </>
  )
}

const greeting = (st) => {
  const hour = st.hour()
  if (hour > 16) return 2
  if (hour > 11) return 1
  return 0
}

const CalcPrice = ({ st, et, parkade, vehicle }) => {
  const start = moment(new Date(st))
  const end = moment(new Date(et))

  const greetTime = greeting(start)
  const diff = end.diff(start, 'minutes')

  let amount = 0
  if (vehicle === 'bike') amount = parkade.pricing.bike[greetTime]
  else if (vehicle === 'car') amount = parkade.pricing.car[greetTime]
  else amount = parkade.pricing.bus[greetTime]

  amount = (amount / 60) * diff

  return amount
}

export default NearByParkades
