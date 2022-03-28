import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import PElogo from '../assets/logos/peLogo.svg'

const useStyles = makeStyles((theme) => ({
  offset: { ...theme.mixins.toolbar, flexGrow: '0 1 auto' },
}))

const AppBarOffset = () => {
  const classes = useStyles()
  return <div className={classes.offset} />
}

const Header = ({ isAuth }) => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setMobile] = useState(false)

  const checkIsMobile = () => (window.innerWidth < 960 ? true : false)
  if (typeof window !== 'undefined') {
    window.onload = () => isMobile !== checkIsMobile && setMobile(checkIsMobile)
    window.onresize = () =>
      isMobile !== checkIsMobile && setMobile(checkIsMobile)
  }

  const scrollHandler = () => {
    window.scrollY > 0 ? setScrolled(true) : setScrolled(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
  }, [])

  return (
    <>
      <AppBar
        id="appbar"
        style={{ boxShadow: 'none' }}
        className={scrolled ? `appbar__colored` : `appbar__transparent`}
        position="sticky"
      >
        <Container>
          <Toolbar disableGutters>
            <Link to="/" style={{ transition: 'all .3s ease-in' }}>
              <Box py={1}>
                <img height={50} src={PElogo} alt="logo" />
              </Box>
            </Link>
            {!isAuth ? (
              <Box ml="auto">
                <Link
                  to="/signin"
                  style={{ textDecoration: 'none', marginRight: '1.5rem' }}
                >
                  <Button variant="outlined" color="secondary">
                    login
                  </Button>
                </Link>

                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color="tertiary"
                    sx={{ color: 'common.white' }}
                  >
                    signup
                  </Button>
                </Link>
              </Box>
            ) : (
              <Box ml="auto">
                <Tooltip title="profile">
                  <Avatar
                    alt="Avatar"
                    className="avatar"
                    src=""
                    sx={{ height: 50, width: 50 }}
                  />
                </Tooltip>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/* <AppBarOffset /> */}
    </>
  )
}

export default Header
