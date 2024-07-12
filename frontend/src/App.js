import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Loader from './components/Loader';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

//import Login from './pages/Login';
//import Home from './pages/Home'; 
//import Signup from './pages/Signup';
//import ProfilePage from './pages/ProfilePage';


import socket from './utils/Websocket';

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));

/*
const PrivateRoute = ({ element: Element, ...rest }) => {

  return (
    <Route 
      {...rest}
      element={isLoggedIn ? <Element /> : <Navigate to="/login" />} 
    />
  )
}
*/
function App() {
  const isAuthenticated = useSelector(state => state.isLoggedIn);

  useEffect(() => {
    socket.connect(); 

    return () => {
      socket.disconnect(); 
    }; 
  }, []);

  /*
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <PublicRoute 
            path='/login' 
            isAuthenticated={isAuthenticated}
          >
            <Login />
          </PublicRoute>
          <PublicRoute
            path='/signup'
            isAuthenticated={isAuthenticated}
          >
            <Signup />
          </PublicRoute>
          <PrivateRoute
            path='/'
            isAuthenticated={isAuthenticated}
          >
            <Home />
          </PrivateRoute>
          <PrivateRoute
            path='/profile'
            isAuthenticated={isAuthenticated}
          >
            <Profile />
          </PrivateRoute>
        </Routes>
      </Suspense>
    </Router>
  )
  */
  
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/create-account' element={<Signup />} />
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
