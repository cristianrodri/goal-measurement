import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
import { CookiesProvider } from 'react-cookie'
import MainRouter from './MainRouter'
import Loading from './components/Loading'
import { getGoalsAPI, getUserDataAPI } from './redux'
import { useDispatch } from 'react-redux'

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

const App = () => {
  const [cookies] = useCookies()
  const token = cookies.token
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const init = () => {
      console.log('pikoro')

      dispatch(getUserDataAPI(token))
      dispatch(getGoalsAPI(token))
    }

    try {
      console.log(token)
      if (token) init()
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <CookiesProvider>
      <Router>
        <MuiThemeProvider theme={theme}>
          {isLoading ? <Loading /> : <MainRouter />}
        </MuiThemeProvider>
      </Router>
    </CookiesProvider>
  )
}

export default App
