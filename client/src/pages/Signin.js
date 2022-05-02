import { Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Logo from '../assets/logos/peLogo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoadingButton from '../components/LoadingButton'
import { login } from '../globalStore/ducks/userAuth'

const validationSchema = yup.object({
  siEmail: yup
    .string()
    .email('Enter a valid Email!')
    .required('Please! Enter Email'),

  siPassword: yup
    .string()
    .max(15, 'Choose a password of 8-15 characters')
    .min(8, 'Password must contains atleast 8 characters')
    .required('Please! Enter password'),
})

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { userInfo } = useSelector((state) => state.userAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const redirect = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true })
    }
  }, [navigate, redirect, userInfo])

  // Handling form
  const formik = useFormik({
    initialValues: {
      siEmail: '',
      siPassword: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(true)
      dispatch(login(values, resetForm, setSubmitting))
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
            id="siEmail"
            name="siEmail"
            label="Email"
            color="secondary"
            value={formik.values.siEmail}
            onChange={formik.handleChange}
            error={formik.touched.siEmail && Boolean(formik.errors.siEmail)}
            helperText={formik.touched.siEmail && formik.errors.siEmail}
          />
        </Box>

        <Box mt={2} className="inputField">
          <TextField
            fullWidth
            variant="standard"
            id="siPassword"
            type={showPassword ? 'text' : 'password'}
            name="siPassword"
            label="Password"
            color="secondary"
            value={formik.values.siPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.siPassword && Boolean(formik.errors.siPassword)
            }
            helperText={formik.touched.siPassword && formik.errors.siPassword}
          />
          <Box
            className="inputField__icon"
            sx={{ color: 'custom.dark' }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </Box>
        </Box>

        <Box py={1}>
          <Typography align="right" variant="body2" color="secondary">
            <Link className="link link__small" to="/forgot-password">
              Forgot password?
            </Link>
          </Typography>
        </Box>

        <Box mt={1}>
          <LoadingButton
            loading={formik.isSubmitting}
            text="sign in"
            fullWidth
          />
        </Box>

        <Box py={1} textAlign="right" display="flex">
          <Typography variant="body2" color="custom.dark">
            Don't have any account yet?
          </Typography>
          <Typography ml={1} align="right" variant="body2" color="secondary">
            <Link className="link link__small" to="/signup">
              Sign up
            </Link>
          </Typography>
        </Box>
      </form>
    </Grid>
  )
}

export default Signin
