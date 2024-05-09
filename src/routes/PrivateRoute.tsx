import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  isAuthenticated?: boolean;
  path?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    element={
      isAuthenticated ? (
        <Component />
      ) : (
        <Navigate to="/signin" replace />
      )
    }
  />
);

export default PrivateRoute;
