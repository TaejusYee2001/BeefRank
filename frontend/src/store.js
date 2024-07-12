import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  username: '', 
  password: '', 
  userID: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { 
        ...state, 
        isAuthenticated: true, 
        username: action.payload.username, 
        password: action.payload.password, 
        userID: action.payload.userID 
      };
    case 'LOG_OUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        username: '', 
        password: '', 
        userID: ''
       };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: reducer,
  // Optionally configure middleware, enhancers, and other options here
});

export default store;