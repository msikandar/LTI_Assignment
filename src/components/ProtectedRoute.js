import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RouteRenderer = ({ component: Component, ...otherProps }) => {
  const isUserAuthenticated = useAuth()

  if (Component === undefined) return null

  return isUserAuthenticated ? (
    <Component {...otherProps} />
  ) : (
    <Redirect
      to={{
        pathname: '/login-screen',
      }}
    />
  )
}

const ProtectedRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => <RouteRenderer component={component} {...props} />}
  />
)

export default ProtectedRoute
