import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalContext } from '../context/Context'

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(GlobalContext)
  return (
    <Route {...rest} render={props => (
      !isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/my-goals',
          state: {
            from: props.location
          }
        }}/>
      )
    )}/>
  )
}

export default PublicRoute