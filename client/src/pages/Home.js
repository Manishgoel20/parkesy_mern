import { useTheme } from '@emotion/react'
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker/DesktopDateTimePicker'
import DateAdapter from '@mui/lab/AdapterDateFns'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'

import Homeimg from '../assets/images/home.png'
// import GeoInput from '../components/GeoInput'
import LoadingButton from '../components/LoadingButton'
import DateTimeInput from '../components/DateTimeInput'
import { setToast } from '../globalStore/ducks/toast'
import { setMinEndDate, setMinStartDate } from '../utils/Date'
import {
  setEDT,
  setEndDateTime,
  setRefEndDateTime,
  setRefStartDateTime,
  setSDT,
  setStartDateTime,
  setVehicle,
} from '../globalStore/ducks/search'
import CustomGeocoder from '../components/CustomGeocoder'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.tertiary.main,
    background: theme.palette.common.white,
    width: '100%',
  },
  select: {
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}))

const Home = () => {
  const theme = useTheme()
  const classes = useStyles()

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const {
    startDateTime,
    endDateTime,
    refStartDate,
    refEndDate,
    vehicle,
    SDT,
    EDT,
  } = useSelector((state) => state.search)

  const initDates = setMinStartDate()

  const setAllDateRefs = () => {
    dispatch(setStartDateTime(initDates.startDateTime))
    dispatch(setEndDateTime(initDates.endDateTime))
    dispatch(setRefStartDateTime(initDates.refStartDate))
    dispatch(setRefEndDateTime(initDates.refEndDate))
  }

  useEffect(() => {
    setAllDateRefs()
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()

    console.log('submitted')
  }

  return (
    <>
      <Container>
        <Typography textAlign="center" variant="h1" p={2}>
          Park Your
          <span style={{ color: theme.palette.primary.main }}> Vehicle</span>
        </Typography>

        <Typography textAlign="center" variant="body1" color="custom.dark">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, dolor
          labore. Odit fugiat rerum nobis! Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Dolore dolores cupiditate dolorum,
          officiis maxime delectus.
        </Typography>
        <form onSubmit={submitHandler}>
          <Grid
            container
            pt={1.5}
            pb={3}
            px={3}
            mt={2}
            rowSpacing={2}
            style={{
              background: theme.palette.primary.light,
              borderRadius: '10px',
              width: '100%',
              marginLeft: 'initial',
            }}
            justifyContent="space-between"
            alignItems="center"
          >
            <LocalizationProvider dateAdapter={DateAdapter}>
              <Grid item md={4} xs={12}>
                <DesktopDateTimePicker
                  value={startDateTime}
                  disablePast
                  minutesStep={15}
                  onChange={(newVal) => {
                    if (newVal > refStartDate) {
                      dispatch(setStartDateTime(newVal))
                      const endVal = setMinEndDate(newVal).endDateTime
                      dispatch(setEndDateTime(endVal))
                    } else setAllDateRefs()
                  }}
                  open={SDT}
                  onClose={() => dispatch(setSDT())}
                  renderInput={(params) => (
                    <>
                      <TextField
                        {...params}
                        style={{ visibility: 'hidden', position: 'absolute' }}
                      />
                      <Box onClick={() => dispatch(setSDT())}>
                        <DateTimeInput
                          value={startDateTime}
                          label="check in time"
                        />
                      </Box>
                    </>
                  )}
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <DesktopDateTimePicker
                  value={endDateTime}
                  minutesStep={15}
                  disablePast
                  minDateTime={refEndDate}
                  onChange={(newVal) => {
                    newVal > refEndDate && dispatch(setEndDateTime(newVal))
                  }}
                  open={EDT}
                  onClose={() => dispatch(setEDT())}
                  renderInput={(params) => (
                    <>
                      <TextField
                        {...params}
                        style={{ visibility: 'hidden', position: 'absolute' }}
                      />
                      <Box onClick={() => dispatch(setEDT())}>
                        <DateTimeInput
                          value={endDateTime}
                          label="check out time"
                        />
                      </Box>
                    </>
                  )}
                />
              </Grid>
            </LocalizationProvider>

            <Grid item md={3.7} xs={12}>
              <FormControl variant="outlined" className={classes.root}>
                <InputLabel id="vehicleType" color="tertiary">
                  Vehicle Type
                </InputLabel>
                <Select
                  labelId="vehicleType"
                  name="vehicleType"
                  value={vehicle}
                  onChange={(e) => dispatch(setVehicle(e.target.value))}
                  label="vehicleType"
                  color="tertiary"
                >
                  <MenuItem value="bike">
                    <DirectionsBikeIcon style={{ marginRight: '10px' }} /> Bike
                  </MenuItem>
                  <MenuItem value="car">
                    <DirectionsCarIcon style={{ marginRight: '10px' }} /> Car
                  </MenuItem>
                  <MenuItem value="bus">
                    <DirectionsBusIcon style={{ marginRight: '10px' }} /> Bus
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={10} xs={12}>
              {/* <GeoInput /> */}
              <CustomGeocoder id="homeGeocoder" label="parking area near me?" />
            </Grid>

            <Grid item md={1.8} xs={12}>
              <LoadingButton
                loading={loading}
                text="search"
                color="tertiary"
                size="medium"
                lineHeight={3.4}
              />
            </Grid>
          </Grid>
        </form>
      </Container>
      <Box textAlign="center">
        <img src={Homeimg} width="90%" alt="home" />
      </Box>
    </>
  )
}

export default Home
