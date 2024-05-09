import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PublicRouteProps {
  component: React.ComponentType<any>;
  isAuthenticated?: boolean;
  path?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    element={
      !isAuthenticated ? (
        <Component />
      ) : (
        <Navigate to="/" replace />
      )
    }
  />
);

export default PublicRoute;
