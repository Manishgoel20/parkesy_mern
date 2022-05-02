import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbf1a',
      light: '#FFECBA',
    },
    secondary: {
      main: '#8e24aa',
      light: '#A91EFF',
    },
    tertiary: {
      main: '#EC8F62',
    },
    error: {
      main: '#FF3D60',
    },
    warning: { main: '#FFC179' },
    info: { main: '#6F3DFF' },
    success: { main: '#00DE73' },
    custom: {
      dark: '#2e2d2d',
      grey: '#969696',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  transition: {
    easing: {
      easeIn: 'cubic-bezier(0.6, -0.05, 0.1, 0.99)',
    },
  },
  typography: {
    // fontFamily: 'poppins, sans-serif',
    fontFamily: 'roboto, sans-serif',
    htmlFontSize: 1,
    fontSize: 1.5,
    h1: {
      fontFamily: 'poppins, sans-serif',
      fontWeight: 800,
      letterSpacing: -1,
      fontSize: 60,
    },
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {
      fontFamily: 'poppins, sans-serif',
      fontWeight: 400,
      letterSpacing: -0.5,
      fontSize: 20,
    },
    body1: {
      fontSize: 15,
      lineHeight: 1.4,
    },
    subtitle1: {},
  },
})
