import { AppBar, Box, Container, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'
import PElogo from '../assets/logos/peLogo.svg'

const Header = () => {
  return (
    <AppBar id="appbar">
      <Container>
        <Toolbar disableGutters>
          <Link to="/">
            <Box py={1}>
              <img height={80} src={PElogo} alt="logo" />
            </Box>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
