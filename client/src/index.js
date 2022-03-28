import { ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Provider } from 'react-redux'

import './App.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './globalStore/store'
import { theme } from './Theme/Theme'

axios.defaults.baseURL = 'http://localhost:3000/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
