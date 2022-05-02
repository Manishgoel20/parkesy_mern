import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'

const ParkSlotDetails = ({ formik }) => {
  // const detailsInfo = [
  //   { infoOf: 'Bike Slot Details', genre: 'bike' },
  //   { infoOf: 'Car Slot Details', genre: 'car' },
  //   { infoOf: 'Bus Slot Details', genre: 'bus' },
  // ]

  return (
    <>
      <Box mt={2}>
        <Typography variant="overline" display="block">
          Bike Slot Details
        </Typography>

        <Grid container spacings={2} columnSpacing={2} alignItems="stretch">
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="bikeSlots"
                type="number"
                name="bikeSlots"
                label="Bike Slots"
                color="secondary"
                value={formik.values.bikeSlots}
                onChange={formik.handleChange}
                error={
                  formik.touched.bikeSlots && Boolean(formik.errors.bikeSlots)
                }
                helperText={formik.touched.bikeSlots && formik.errors.bikeSlots}
              />
            </Box>
          </Grid>
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="bikeSlotsMP"
                type="number"
                name="bikeSlotsMP"
                label="Morning price (in Rs.)"
                color="secondary"
                value={formik.values.bikeSlotsMP}
                onChange={formik.handleChange}
                error={
                  formik.touched.bikeSlotsMP &&
                  Boolean(formik.errors.bikeSlotsMP)
                }
                helperText={
                  formik.touched.bikeSlotsMP && formik.errors.bikeSlotsMP
                }
              />
            </Box>
          </Grid>
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="bikeSlotsEP"
                type="number"
                name="bikeSlotsEP"
                label="Evening price (in Rs.)"
                color="secondary"
                value={formik.values.bikeSlotsEP}
                onChange={formik.handleChange}
                error={
                  formik.touched.bikeSlotsEP &&
                  Boolean(formik.errors.bikeSlotsEP)
                }
                helperText={
                  formik.touched.bikeSlotsEP && formik.errors.bikeSlotsEP
                }
              />
            </Box>
          </Grid>
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="bikeSlotsNP"
                type="number"
                name="bikeSlotsNP"
                label="Night price (in Rs.)"
                color="secondary"
                value={formik.values.bikeSlotsNP}
                onChange={formik.handleChange}
                error={
                  formik.touched.bikeSlotsNP &&
                  Boolean(formik.errors.bikeSlotsNP)
                }
                helperText={
                  formik.touched.bikeSlotsNP && formik.errors.bikeSlotsNP
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <Typography variant="overline" display="block">
          Car Slot Details
        </Typography>

        <Grid container spacings={2} columnSpacing={2} alignItems="stretch">
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="carSlots"
                type="number"
                name="carSlots"
                label="Car Slots"
                color="secondary"
                value={formik.values.carSlots}
                onChange={formik.handleChange}
                error={
                  formik.touched.carSlots && Boolean(formik.errors.carSlots)
                }
                helperText={formik.touched.carSlots && formik.errors.carSlots}
              />
            </Box>
          </Grid>
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="carSlotsMP"
                type="number"
                name="carSlotsMP"
                label="Morning price (in Rs.)"
                color="secondary"
                value={formik.values.carSlotsMP}
                onChange={formik.handleChange}
                error={
                  formik.touched.carSlotsMP && Boolean(formik.errors.carSlotsMP)
                }
                helperText={
                  formik.touched.carSlotsMP && formik.errors.carSlotsMP
                }
              />
            </Box>
          </Grid>
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="carSlotsEP"
                type="number"
                name="carSlotsEP"
                label="Evening price (in Rs.)"
                color="secondary"
                value={formik.values.carSlotsEP}
                onChange={formik.handleChange}
                error={
                  formik.touched.carSlotsEP && Boolean(formik.errors.carSlotsEP)
                }
                helperText={
                  formik.touched.carSlotsEP && formik.errors.carSlotsEP
                }
              />
            </Box>
          </Grid>
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="carSlotsNP"
                type="number"
                name="carSlotsNP"
                label="Night price (in Rs.)"
                color="secondary"
                value={formik.values.carSlotsNP}
                onChange={formik.handleChange}
                error={
                  formik.touched.carSlotsNP && Boolean(formik.errors.carSlotsNP)
                }
                helperText={
                  formik.touched.carSlotsNP && formik.errors.carSlotsNP
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <Typography variant="overline" display="block">
          Bus Slot Details
        </Typography>

        <Grid container spacings={2} columnSpacing={2} alignItems="stretch">
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="busSlots"
                type="number"
                name="busSlots"
                label="Bus Slots"
                color="secondary"
                value={formik.values.busSlots}
                onChange={formik.handleChange}
                error={
                  formik.touched.busSlots && Boolean(formik.errors.busSlots)
                }
                helperText={formik.touched.busSlots && formik.errors.busSlots}
              />
            </Box>
          </Grid>
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="busSlotsMP"
                type="number"
                name="busSlotsMP"
                label="Morning price (in Rs.)"
                color="secondary"
                value={formik.values.busSlotsMP}
                onChange={formik.handleChange}
                error={
                  formik.touched.busSlotsMP && Boolean(formik.errors.busSlotsMP)
                }
                helperText={
                  formik.touched.busSlotsMP && formik.errors.busSlotsMP
                }
              />
            </Box>
          </Grid>
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="busSlotsEP"
                type="number"
                name="busSlotsEP"
                label="Evening price (in Rs.)"
                color="secondary"
                value={formik.values.busSlotsEP}
                onChange={formik.handleChange}
                error={
                  formik.touched.busSlotsEP && Boolean(formik.errors.busSlotsEP)
                }
                helperText={
                  formik.touched.busSlotsEP && formik.errors.busSlotsEP
                }
              />
            </Box>
          </Grid>
          <Grid item md={3} xs={6}>
            <Box mt={2}>
              <TextField
                fullWidth
                id="busSlotsNP"
                type="number"
                name="busSlotsNP"
                label="Night price (in Rs.)"
                color="secondary"
                value={formik.values.busSlotsNP}
                onChange={formik.handleChange}
                error={
                  formik.touched.busSlotsNP && Boolean(formik.errors.busSlotsNP)
                }
                helperText={
                  formik.touched.busSlotsNP && formik.errors.busSlotsNP
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <Typography variant="overline" display="block">
          Extra Facilites
        </Typography>

        <FormGroup>
          <Grid container spacings={2} columnSpacing={2} alignItems="stretch">
            <Grid item md={2} xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    color="secondary"
                    checked={formik.values.is24hr}
                    onChange={formik.handleChange}
                    name="is24hr"
                  />
                }
                label="24/7 Service"
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    color="secondary"
                    checked={formik.values.flexibleEntry}
                    onChange={formik.handleChange}
                    name="flexibleEntry"
                  />
                }
                label="Flexible Entries"
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    color="secondary"
                    checked={formik.values.isCctv}
                    onChange={formik.handleChange}
                    name="isCctv"
                  />
                }
                label="CCTV Facility"
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Box>
    </>
  )
}

export default ParkSlotDetails
