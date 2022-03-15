import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useFormik } from 'formik'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import Logo from '../assets/logos/peLogo.svg'
import LoadingButton from '../components/LoadingButton'

const validationSchema = yup.object({
  suFirstName: yup
    .string()
    .min(2, 'Name should contain atleast 2 character')
    .max(20, 'Exceeded 20 character limit')
    .required('First name is required'),
  suLastName: yup
    .string()
    .min(2, 'Last should contain atleast 2 character')
    .max(20, 'Exceeded 20 character limit')
    .required('Last name is required'),
  suEmail: yup
    .string()
    .email('Enter a valid Email!')
    .required('Please! Enter Email'),
  suPassword: yup
    .string()
    .max(15, 'Choose a password of 8-15 characters')
    .min(8, 'Password must contains atleast 8 characters')
    .required('Please! Enter password'),
  suConfirmPassword: yup
    .string()
    .oneOf([yup.ref('suPassword'), null], 'Passwords must match')
    .required('Please! Confirm your password'),
})

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Handling form
  const formik = useFormik({
    initialValues: {
      suFirstName: '',
      suLastName: '',
      suEmail: '',
      suPassword: '',
      suConfirmPassword: '',
      suRole: 'user',
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
        <Grid container spacing={2} justifyContent="space between">
          <Grid item md={6} xs={6}>
            <TextField
              fullWidth
              variant="standard"
              type="text"
              id="suFirstName"
              name="suFirstName"
              label="First Name"
              color="secondary"
              value={formik.values.suFirstName}
              onChange={formik.handleChange}
              error={
                formik.touched.suFirstName && Boolean(formik.errors.suFirstName)
              }
              helperText={
                formik.touched.suFirstName && formik.errors.suFirstName
              }
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              fullWidth
              variant="standard"
              type="text"
              id="suLastName"
              name="suLastName"
              label="Last Name"
              color="secondary"
              value={formik.values.suLastName}
              onChange={formik.handleChange}
              error={
                formik.touched.suLastName && Boolean(formik.errors.suLastName)
              }
              helperText={formik.touched.suLastName && formik.errors.suLastName}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="space between">
          <Grid item md={9} xs={8}>
            <Box mt={2}>
              <TextField
                fullWidth
                variant="standard"
                type="text"
                id="suEmail"
                name="suEmail"
                label="Email"
                color="secondary"
                value={formik.values.suEmail}
                onChange={formik.handleChange}
                error={formik.touched.suEmail && Boolean(formik.errors.suEmail)}
                helperText={formik.touched.suEmail && formik.errors.suEmail}
              />
            </Box>
          </Grid>

          <Grid item md={3} xs={4}>
            <Box mt={2}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ color: 'secondary' }}
              >
                <InputLabel id="suRole" color="secondary">
                  User type
                </InputLabel>
                <Select
                  labelId="suRole"
                  name="suRole"
                  value={formik.values.suRole}
                  onChange={formik.handleChange}
                  label="suRole"
                  color="secondary"
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="provider">Provider</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Box mt={2} className="inputField">
          <TextField
            fullWidth
            variant="standard"
            id="suPassword"
            type={showPassword ? 'text' : 'password'}
            name="suPassword"
            label="Password"
            color="secondary"
            value={formik.values.suPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.suPassword && Boolean(formik.errors.suPassword)
            }
            helperText={formik.touched.suPassword && formik.errors.suPassword}
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
            id="suConfirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            name="suConfirmPassword"
            label="Confirm Password"
            color="secondary"
            value={formik.values.suConfirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.suConfirmPassword &&
              Boolean(formik.errors.suConfirmPassword)
            }
            helperText={
              formik.touched.suConfirmPassword &&
              formik.errors.suConfirmPassword
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
          <LoadingButton loading={false} text="sign up" />
        </Box>
        <Box py={1} textAlign="right" display="flex">
          <Typography variant="body2" color="custom.dark">
            Already have an account?
          </Typography>
          <Typography ml={1} align="right" variant="body2" color="secondary">
            <Link className="link link__small" to="/auth/signin">
              Sign in
            </Link>
          </Typography>
        </Box>
      </form>
    </Grid>
  )
}

export default Signup
