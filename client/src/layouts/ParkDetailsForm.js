import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ParkDetailsForm = ({ formik }) => {
  return (
    <>
      <Box mt={2}>
        <TextField
          fullWidth
          id="parkName"
          type="text"
          name="parkName"
          label="Parkade Name"
          color="secondary"
          value={formik.values.parkName}
          onChange={formik.handleChange}
          error={formik.touched.parkName && Boolean(formik.errors.parkName)}
          helperText={formik.touched.parkName && formik.errors.parkName}
        />
      </Box>
      <Box mt={2}>
        <TextField
          fullWidth
          id="parkDesc"
          color="secondary"
          label="Parkade Description"
          multiline
          rows={4}
          value={formik.values.parkDesc}
          onChange={formik.handleChange}
          error={formik.touched.parkDesc && Boolean(formik.errors.parkDesc)}
          helperText={formik.touched.parkDesc && formik.errors.parkDesc}
        />
      </Box>
    </>
  )
}

export default ParkDetailsForm
