import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface Props {
  component: React.ElementType
  path: RouteProps['path']
  exact?: RouteProps['exact']
}

const PublicRoute = ({ component: Component, ...routeProps }: Props) => {
  const isAuthenticated = useSelector(state => state.user.isAuth)

  return (
    <Route
      {...routeProps}
      render={props =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/my-goals',
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

export default PublicRoute
