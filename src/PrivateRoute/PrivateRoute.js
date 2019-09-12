import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/token-service'

export default function PrivateRoute({ component: Component = null, render: Render = null, ...rest }) {
  
  return (
    <Route
      {...rest}
      render={props =>
        TokenService.hasAuthToken() ? (
          Render ? (
            Render(props)
          ) : Component ? (
            <Component {...props} />
          ) : null
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}