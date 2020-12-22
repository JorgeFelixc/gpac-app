import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  let redirectPath = '';
  if (!props.isAuthenticated) {
    redirectPath = props.authenticationPath || '/login';
  }

  if (redirectPath) {
    return (<Redirect to={redirectPath} />)
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;