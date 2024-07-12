import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorize = async () => {
      //TODO: Use .env variable for this endpoint
      const response = await fetch("http://localhost:4000/api/user/");
      //TODO: create sorted list of usernames to perform binary search
      const users = await response.json(); 

      if (response.ok) {
        for (const user of users) {
          if (user.username === username && user.password === password) {
            dispatch({ type: 'LOG_IN', payload: { 
              userID: user._id, 
              username: username, 
              password: password } 
            });
            navigate('/profile');
            break;
          }
        }
        setError("We couldn't find that username and/or password. Please try again or create a new account");
      }
    }
    await authorize(); 
  }

  return (
    <div className="auth-form-container">
      <h2>Enter Your Email And Password To Sign In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
        {error && <div className="error-message">{error}</div>}
      </form>
      <Link to="/create-account">
        <h1>Click here to create an account</h1>
      </Link>
    </div>
  );
};

export default Login;