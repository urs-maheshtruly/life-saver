import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const PIN_DIGITS = 5; // Number of digits in the PIN

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // State to track the current step (1: Username, 2: PIN)
  const [username, setUsername] = useState(''); // State for username
  const [pin, setPin] = useState(new Array(PIN_DIGITS).fill('')); // State for PIN digits
  const [error, setError] = useState(''); // State for error messages
  const inputRefs = useRef([]); // Refs for PIN input fields

  useEffect(() => {
    if (step === 2) {
      inputRefs.current[0]?.focus(); // Focus on the first PIN input field when moving to step 2
    }
  }, [step]);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return; // Ignore non-numeric input

    const newPin = [...pin];
    newPin[index] = value.slice(-1); // Only keep the last digit
    setPin(newPin);

    // Move focus to the next input field
    if (value && index < PIN_DIGITS - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleNext = () => {
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    setError('');
    setStep(2); // Move to the PIN step
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const enteredPin = pin.join(''); // Combine PIN digits into a single string
  
    if (enteredPin.length !== PIN_DIGITS) {
      setError('Please enter a valid 5-digit PIN');
      return;
    }
  
    try {
      console.log('Logging in with:', { username, pin: enteredPin }); // Debugging
  
      // Use axios to send the POST request
      const response = await axios.post('http://localhost:8080/login-user', {
        username,
        pin: enteredPin,
      });
  
      console.log('Response status:', response.status); // Log the HTTP status code
  
      if (response.status === 200) {
        const token = response.data.token; // Extract the token from the response
        console.log('Token received:', token); // Debugging
        localStorage.setItem('token', token); // Store the token in localStorage
        alert('Login successful!'); // Show success message
        navigate('/Home'); // Redirect to home page
      } else {
        setError('Failed to login. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.status === 401) {
        setError('Invalid username or PIN');
      } else {
        setError('An error occurred while logging in.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {step === 1 && (
          <div className="username-step">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <form onSubmit={handleLogin}>
            <div className="pin-step">
              <p>Enter your 5-digit PIN</p>
              <div className="pin-inputs">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOnChange(e.target.value, index)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    maxLength={1} // Limit input to one character
                    className="pin-input"
                  />
                ))}
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>
        )}
        {/* Add Register and Login as Donor buttons */}
        <div className="bottom-links">
          <button
            className="small-button"
            onClick={() => navigate('/SignIn')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;