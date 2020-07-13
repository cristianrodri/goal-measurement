import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EditUser from './pages/EditUser'
import NotFound from './pages/NotFound'
import MyGoals from './pages/MyGoals'
import CreateGoal from './pages/CreateGoal'
import EditGoal from './pages/EditGoal'
import GoalDashboard from './pages/GoalDashboard'
import SuccessSignup from './pages/SuccessSignup'
import Privacy from './pages/Privacy'
import Header from './components/Header'
import { SuccessSnackbar, ErrorSnackbar } from './components/DisplaySnackbar'
import SuccessDialog from './components/SuccessDialog'
import PrivateRoute from './auth/PrivateRoute'
import PublicRoute from './auth/PublicRoute'
import { GlobalContext } from './context/Context'

const useStyles = makeStyles(theme => ({
  rootPage: {
    minHeight: '100vh',
    backgroundColor: '#f3f3f3'
  },
  root: {
    padding: theme.spacing(2)
  }
}))

const MainRouter = () => {
  const classes = useStyles()
  const { state } = useContext(GlobalContext)
  const { success, error } = state

  return (
    <div className={classes.rootPage}>
      <Header />
      <div className={classes.root}>
        <Switch>
          <PublicRoute exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/signup" component={Signup} />
          <PublicRoute
            path="/user/confirmation/:idUser/:idToken"
            component={SuccessSignup}
          />
          <PrivateRoute path="/create-goal" component={CreateGoal} />
          <PrivateRoute path="/edit-user" component={EditUser} />
          <PrivateRoute exact path="/my-goals" component={MyGoals} />
          <PrivateRoute exact path="/my-goals/:id" component={GoalDashboard} />
          <PrivateRoute path="/my-goals/:id/edit" component={EditGoal} />
          <PrivateRoute path="/privacy" component={Privacy} />
          {/* <Route path="/user/:id/avatar" /> */}
          <Route component={NotFound} />
        </Switch>
      </div>

      {/* Display snackbar when a success takes place under the app components by dispatching success global state*/}
      <SuccessSnackbar open={success} type="success" />

      {/* Display snackbar when an error takes place under the app components by dispatching error global state*/}
      <ErrorSnackbar open={error} type="error" />

      {/* Display SuccessDialog after successed action under the app components by dispatching successDialog global state */}
      <SuccessDialog />
    </div>
  )
}

export default MainRouter
