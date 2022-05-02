import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setToast } from '../globalStore/ducks/toast'

const ParkLoc = ({ formik }) => {
  const weekDetails = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const [locLoading, setLocLoading] = useState(false)
  const [coords, setCoords] = useState([])
  const dispatch = useDispatch()

  const getMyLocation = () => {
    setLocLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const data = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        if (data) {
          formik.values.parkLat = data.lat
          formik.values.parkLng = data.lng
          formik.setFieldValue(formik.values.parkLat, data.lat)
          formik.setFieldValue(formik.values.parkLng, data.lng)
          setCoords([data.lat, data.lng])
        }
        setLocLoading(false)
      },
      (err) => {
        setLocLoading(false)
        dispatch(setToast(true, 'info', err.message))
      },
      {
        enableHighAccuracy: true,
        enableGeolocation: true,
      }
    )
  }

  return (
    <>
      <Box mt={2}>
        <TextField
          fullWidth
          id="parkAdd"
          type="text"
          name="parkAdd"
          label="Parkade Address"
          color="secondary"
          value={formik.values.parkAdd}
          onChange={formik.handleChange}
          error={formik.touched.parkAdd && Boolean(formik.errors.parkAdd)}
          helperText={formik.touched.parkAdd && formik.errors.parkAdd}
        />
      </Box>
      <Grid container spacings={2} columnSpacing={2} alignItems="stretch">
        <Grid item md={5} sm={12} xs={12}>
          <Box mt={2}>
            <TextField
              fullWidth
              id="parkLat"
              type="number"
              name="parkLat"
              label="Parkade Latitude"
              color="secondary"
              value={formik.values.parkLat}
              onChange={formik.handleChange}
              error={formik.touched.parkLat && Boolean(formik.errors.parkLat)}
              helperText={formik.touched.parkLat && formik.errors.parkLat}
            />
          </Box>
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Box mt={2}>
            <TextField
              fullWidth
              id="parkLng"
              type="number"
              name="parkLng"
              label="Parkade Longitude"
              color="secondary"
              value={formik.values.parkLng}
              onChange={formik.handleChange}
              error={formik.touched.parkLng && Boolean(formik.errors.parkLng)}
              helperText={formik.touched.parkLng && formik.errors.parkLng}
            />
          </Box>
        </Grid>
        <Grid item md={2} sm={12} xs={12}>
          <Box mt={2}>
            <Button
              style={{ lineHeight: 2.6 }}
              fullWidth
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => getMyLocation()}
            >
              {locLoading ? 'loading...' : 'get coords'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Typography variant="overline" display="block">
          Parkade Opening and Closing Timings (in 24 hour format)
        </Typography>

        <Grid container spacings={2} columnSpacing={2} alignItems="stretch">
          <Grid item md={6} xs={12}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="parkTimings"
                type="text"
                name="parkTimings[0]"
                label="Opening time"
                color="secondary"
                placeholder="HH:MM"
                value={formik.values.parkTimings[0]}
                onChange={formik.handleChange}
                error={
                  formik.touched.parkTimings &&
                  Boolean(formik.errors.parkTimings)
                }
                helperText={
                  formik.touched.parkTimings && formik.errors.parkTimings
                }
              />
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="parkTimings"
                type="text"
                name="parkTimings[1]"
                label="Closing time"
                color="secondary"
                placeholder="HH:MM"
                value={formik.values.parkTimings[1]}
                onChange={formik.handleChange}
                error={
                  formik.touched.parkTimings &&
                  Boolean(formik.errors.parkTimings)
                }
                helperText={
                  formik.touched.parkTimings && formik.errors.parkTimings
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <Typography variant="overline" display="block">
          Parkade Opening Weeks
        </Typography>
        {weekDetails.map((day, id) => (
          <FormControlLabel
            key={id}
            id="parkWeeks"
            name={`parkWeeks[${id}]`}
            control={
              <Checkbox
                color="secondary"
                checked={formik.values.parkWeeks[id]}
                onChange={formik.handleChange}
              />
            }
            label={day}
          />
        ))}
      </Box>
    </>
  )
}

export default ParkLoc
