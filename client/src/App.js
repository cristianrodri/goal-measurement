import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
import MainRouter from './MainRouter'
import Loading from './components/Loading'
import { getUserDataAPI } from './redux'
import { useDispatch, useSelector } from 'react-redux'
import { completedData } from './redux'
import { getTokenApi } from './api/api_user'

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
  const isLoading = useSelector(state => state.user.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      const res = await getTokenApi()

      console.log(res)

      if (res.token) {
        dispatch(getUserDataAPI())
      } else {
        dispatch(completedData())
      }

      return false
    }

    try {
      init()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        {isLoading ? <Loading /> : <MainRouter />}
      </MuiThemeProvider>
    </Router>
  )
}

export default App
