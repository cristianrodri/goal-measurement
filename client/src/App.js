import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
import { CookiesProvider } from 'react-cookie'
import MainRouter from './MainRouter'
import GlobalProvider from './context/Context'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0B183E'
    },
    secondary: {
      main: '#2EC7CD'
    },
    tertiary: {
      main: '#FA733B'
    },
    success: green,
    error: red
  },
  gutter: '1rem'
})

const App = () => (
  <CookiesProvider>
    <GlobalProvider>
      <Router>
        <MuiThemeProvider theme={theme}>
          <MainRouter />
        </MuiThemeProvider>
      </Router>
    </GlobalProvider>
  </CookiesProvider>
)

export default App
