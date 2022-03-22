import { AppBar, Box, Container, Toolbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import PElogo from '../assets/logos/peLogo.svg'
import PElogoSm from '../assets/logos/PElogoSmall.svg'

const useStyles = makeStyles((theme) => ({
  offset: { ...theme.mixins.toolbar, flexGrow: 1 },
}))

const AppBarOffset = () => {
  const classes = useStyles()
  return <div className={classes.offset} />
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setMobile] = useState(false)

  const checkIsMobile = () => (window.innerWidth < 960 ? true : false)
  if (typeof window !== 'undefined') {
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
        position="fixed"
      >
        <Container>
          <Toolbar disableGutters>
            <Link to="/" style={{ transition: 'all .3s ease-in' }}>
              <Box py={1}>
                <img
                  height={60}
                  src={isMobile ? PElogoSm : PElogo}
                  alt="logo"
                />
              </Box>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBarOffset />
    </>
  )
}

export default Header
