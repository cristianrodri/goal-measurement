import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
import { CookiesProvider } from 'react-cookie'
import MainRouter from './MainRouter'
import Loading from './components/Loading'
import { getUserDataAPI } from './redux'
import { useDispatch, useSelector } from 'react-redux'
import { completedData } from './redux'
import moment from 'moment'

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
  const isLoading = useSelector(state => state.user.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    const init = () => {
      dispatch(getUserDataAPI(token))
    }

    try {
      if (token) init()
      else dispatch(completedData())
    } catch (error) {
      console.log(error)
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
