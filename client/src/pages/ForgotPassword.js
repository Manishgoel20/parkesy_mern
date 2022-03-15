import { Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'

import Logo from '../assets/logos/peLogo.svg'
import { Link } from 'react-router-dom'
import LoadingButton from '../components/LoadingButton'

const validationSchema = yup.object({
  fpEmail: yup
    .string()
    .email('Enter a valid Email!')
    .required('Please! Enter Email'),
})

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)

  // Handling form
  const formik = useFormik({
    initialValues: {
      fpEmail: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <Grid container justifyContent="start" alignItems="start">
      <img height={90} src={Logo} alt="logo" />
      <form style={{ width: '90%' }} onSubmit={formik.handleSubmit}>
        <Box mt={4}>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            id="fpEmail"
            name="fpEmail"
            label="Enter Registered Email ID"
            color="secondary"
            value={formik.values.fpEmail}
            onChange={formik.handleChange}
            error={formik.touched.fpEmail && Boolean(formik.errors.fpEmail)}
            helperText={formik.touched.fpEmail && formik.errors.fpEmail}
          />
        </Box>

        <Box mt={3}>
          <LoadingButton loading={false} text="forgot password" />
        </Box>
        <Box py={1} textAlign="right" display="flex">
          <Typography variant="body2" color="custom.dark">
            Back to login
          </Typography>
          <Typography ml={1} align="right" variant="body2" color="secondary">
            <Link className="link link__small" to="/auth/signin">
              Click here
            </Link>
          </Typography>
        </Box>
      </form>
    </Grid>
  )
}

export default ForgotPassword
