import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbf1a',
      light: '#FFECBA',
    },
    secondary: {
      main: '#A91EFF',
      light: '#8e24aa',
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
    h1: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    body1: {},
    subtitle1: {},
  },
})
