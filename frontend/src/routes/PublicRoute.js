import { Route, Navigate } from 'react-router-dom';

const PublicRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        ({ location }) => (
          !isAuthenticated ? (
            children
          ) : (
            <Navigate
              to={{
                pathname: '/',
                state: { from: location }
              }}
            />
        ))
      }
    />
  );
}

export default PublicRoute;