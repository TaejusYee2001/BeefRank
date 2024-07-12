import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorize = async() => {
      //TODO: use .env for this endpoint
      const response = await fetch("http://localhost:4000/api/user/"); 
      const users = await response.json();

      for (const user of users) {
        if (user.username === username) {
          setError("That username has already been taken by another user. Please enter another username.");
          return; 
        }
      }
      
      try {
        const newUser = {
          //TODO: add email field, more fields as necessary
          username: username, 
          password: password, 
        };
        console.log(JSON.stringify(newUser));
        //TODO: use .env for this endpoint
        const createdUserResponse = await fetch("http://localhost:4000/api/user/", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json", 
          }, 
          body: JSON.stringify(newUser),
        });
        if (createdUserResponse.ok) {
          const createdUser = await createdUserResponse.json();
          dispatch({ type: 'LOG_IN', payload: { 
            userID: createdUser._id, 
            username: username, 
            password: password 
          }});
          navigate('/profile');
        }
        else {
          console.error("Failed to create user");
        }
      }
      catch (error) {
        console.error("Error creating user:", error); 
      }
    }

    await authorize();
  }

  return (
    <div className="auth-form-container">
      <h2>Enter your Username and Password to Register</h2>
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
        <button type="submit">Sign Up</button>
        {error && <div className="error-message">{error}</div>}
      </form>
      <Link to="/">
        <h1>Click here to log in</h1>
      </Link>
    </div>
  )
}

export default Signup