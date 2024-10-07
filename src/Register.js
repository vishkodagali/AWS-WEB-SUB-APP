import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email format
    if (!validateEmail(formData.email)) {
      alert('Invalid email format. Email must be in the format s#######@student.rmit.edu.au');
      return; // Stop the form submission if validation fails
    }

    // Check if the email already exists
    if (emailExists(formData.email)) {
      alert('Email already exists. Please use a different email.');
      return;
    }

    // Combine first name and last name to create username
    const username = `${formData.firstName}${formData.lastName}`.toLowerCase();

    // Prepare the registration data
    const userData = {
      email: formData.email,
      username: username,
      password: formData.password
    };

    if (userExists(userData)) {
      alert('You have already registered. Please login.');
      navigate('/login');
      return;
    }

    // Send the registration data to the API endpoint
    try {
      const response = await fetch('https://u6yb4m14rg.execute-api.us-east-1.amazonaws.com/registration/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const responseData = await response.json();
      if (response.ok) {
        // Save new user data in local storage
        saveUserData(userData);
        alert('Registration successful');
        navigate('/login'); // Navigate to the login page
      } else {
        alert('Registration failed: ' + responseData.message);
      }
    } catch (error) {
      console.error('Failed to register:', error);
      alert('Registration failed: ' + error.message);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^s[0-9]{7}@student\.rmit\.edu\.au$/;
    return emailRegex.test(email);
  };

  const userExists = (userData) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => 
      user.email === userData.email &&
      user.username === userData.username &&
      user.password === userData.password
    );
  };

  const emailExists = (email) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
  };

  const saveUserData = (userData) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-heading">Register</h2>
        <div className="form-group">
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="form-control" required />
        </div>
        <div className="form-group">
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="form-control" required />
        </div>
        <div className="form-group">
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="form-control" required />
        </div>
        <div className="form-group">
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className="form-control" required />
        </div>
        <button type="submit" className="register-btn">Register</button>
        <div className="login-link my-4 mx-4">
          <p>Already a member? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div> 
  );
}

export default Register;
