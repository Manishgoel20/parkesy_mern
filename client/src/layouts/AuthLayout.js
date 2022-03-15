import { Container, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import BgImg from '../assets/images/bg.png'
import LocatorPark from '../assets/images/locatorPark.svg'

import { HideAppbarFooter, ShowAppbarFooter } from '../utils/HideAppbarFooter'

const AuthLayout = () => {
  useEffect(() => {
    HideAppbarFooter()
    return () => ShowAppbarFooter()
  }, [])

  return (
    <Container>
      <Grid className="auth" container justifyContent="space between">
        <Grid
          item
          md={6}
          xs={12}
          container
          justifyContent="start"
          alignItems="center"
          p={2}
        >
          <Outlet />
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <img className="auth__bgFront" src={LocatorPark} alt="locPark" />
        </Grid>
        <img className="auth__bg" src={BgImg} alt="bgImg" />
      </Grid>
    </Container>
  )
}

export default AuthLayout
