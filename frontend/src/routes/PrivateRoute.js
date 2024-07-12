import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
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
                pathname: '/login',
                state: { from: location }
              }}
            />
        ))
      }
    />
  );
}

export default PrivateRoute;