import React from 'react'
import { useCookies } from 'react-cookie'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [cookies] = useCookies()
  const isAuthenticated = cookies.token

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location
              }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
