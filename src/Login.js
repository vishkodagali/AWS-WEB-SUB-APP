import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCredentials(email, password);
  };

  function fetchCredentials(email, password) {
    const endpoint = `https://r5utlqlbqb.execute-api.us-east-1.amazonaws.com/default/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    axios.get(endpoint)
    .then(response => {
      if (response.status === 200 && response.data) {
        console.log('Login successful:', response.data);
        localStorage.setItem('userLoggedIn', JSON.stringify(response.data));
        navigate('/');
        window.location.reload()
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage('Login failed. Please check your network and try again.');
      }
    });
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="login-btn" >
            Login
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div className="register-link">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
