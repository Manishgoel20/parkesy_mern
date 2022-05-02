import { Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Logo from '../assets/logos/peLogo.svg'
import LoadingButton from '../components/LoadingButton'

const validationSchema = yup.object({
  rpPassword: yup
    .string()
    .max(15, 'Choose a password of 8-15 characters')
    .min(8, 'Password must contains atleast 8 characters')
    .required('Please! Enter password'),

  rpConfirmPassword: yup
    .string()
    .oneOf([yup.ref('rpPassword'), null], 'Passwords must match')
    .required('Please! Confirm your password'),
})

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // Handling form
  const formik = useFormik({
    initialValues: {
      rpPassword: '',
      rpConfirmPassword: '',
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
        <Box mt={4} className="inputField">
          <TextField
            fullWidth
            variant="standard"
            id="rpPassword"
            type={showPassword ? 'text' : 'password'}
            name="rpPassword"
            label="New Password"
            color="secondary"
            value={formik.values.rpPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.rpPassword && Boolean(formik.errors.rpPassword)
            }
            helperText={formik.touched.rpPassword && formik.errors.rpPassword}
          />
          <Box
            className="inputField__icon"
            sx={{ color: 'custom.dark' }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </Box>
        </Box>

        <Box mt={2} className="inputField">
          <TextField
            fullWidth
            variant="standard"
            id="rpConfirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            name="rpConfirmPassword"
            label="Confirm New Password"
            color="secondary"
            value={formik.values.rpConfirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.rpConfirmPassword &&
              Boolean(formik.errors.rpConfirmPassword)
            }
            helperText={
              formik.touched.rpConfirmPassword &&
              formik.errors.rpConfirmPassword
            }
          />
          <Box
            className="inputField__icon"
            sx={{ color: 'custom.dark' }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
          </Box>
        </Box>

        <Box mt={3}>
          <LoadingButton fullWidth loading={false} text="reset password" />
        </Box>
      </form>
    </Grid>
  )
}

export default ResetPassword
