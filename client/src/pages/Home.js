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
import { useDispatch } from 'react-redux'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker/DesktopDateTimePicker'
import DateAdapter from '@mui/lab/AdapterDateFns'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'

import Homeimg from '../assets/images/home.png'
import GeoInput from '../components/GeoInput'
import moment from 'moment'
import LoadingButton from '../components/LoadingButton'
import DateTimeInput from '../components/DateTimeInput'
import { setToast } from '../globalStore/ducks/toast'
import { setMinStartDate } from '../utils/Date'

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
  // const [startDate, setStartDate] = useState(new Date())
  // const [endDate, setEndDate] = useState(new Date())
  // const [vehicleType, setVehicleType] = useState('car')

  const dispatch = useDispatch()

  // let refStartDate = new Date()
  // let refEndDate

  // const setMinStartDate = () => {
  //   let startDateTime = moment(new Date())
  //   startDateTime.minutes(Math.ceil(startDateTime.minutes() / 15) * 15)
  //   setStartDate(startDateTime._d)
  //   refStartDate = startDateTime._d

  //   let endDateTime = moment(startDateTime).add(60, 'minutes')
  //   setEndDate(endDateTime._d)
  //   refEndDate = endDateTime._d
  // }

  // const setMinEndDate = (refDate) => {
  //   // refEndDate = moment(startDate).add(moment.duration(60, 'minutes'))._d
  //   setEndDate(moment(refDate).add(moment.duration(60, 'minutes'))._d)
  // }

  

  useEffect(() => {
    setMinStartDate()
  }, [])

  const [SDT, setSDT] = useState(false)
  const [SET, setSET] = useState(false)

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
                value={startDate}
                disablePast
                minutesStep={15}
                onChange={(newVal) => {
                  if (newVal > refStartDate) {
                    setStartDate(newVal)
                    setMinEndDate(newVal)
                  } else setMinStartDate()
                }}
                open={SDT}
                onClose={() => setSDT(!SDT)}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      style={{ visibility: 'hidden', position: 'absolute' }}
                    />
                    <Box onClick={() => setSDT(!SDT)}>
                      <DateTimeInput value={startDate} label="check in time" />
                    </Box>
                  </>
                )}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <DesktopDateTimePicker
                value={endDate}
                minutesStep={15}
                disablePast
                minDateTime={refEndDate}
                onChange={(newValue) => {
                  newValue > endDate && setEndDate(newValue)
                }}
                open={SET}
                onClose={() => setSET(!SET)}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      style={{ visibility: 'hidden', position: 'absolute' }}
                    />
                    <Box onClick={() => setSET(!SET)}>
                      <DateTimeInput value={endDate} label="check out time" />
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
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
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
            <GeoInput />
          </Grid>

          <Grid item md={1.95} xs={12}>
            <LoadingButton
              loading={loading}
              text="search"
              color="tertiary"
              size="small"
            />
          </Grid>
        </Grid>
      </Container>
      <Box textAlign="center">
        <img src={Homeimg} width="90%" alt="home" />
      </Box>
    </>
  )
}

export default Home
