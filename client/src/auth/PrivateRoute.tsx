import { ElementType } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { RootState } from '../redux'

interface Props {
  component: ElementType
  path: RouteProps['path']
  exact?: RouteProps['exact']
}

const PrivateRoute = ({ component: Component, ...routeProps }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuth)

  return (
    <Route
      {...routeProps}
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
