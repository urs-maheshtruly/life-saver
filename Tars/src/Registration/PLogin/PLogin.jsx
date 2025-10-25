import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PLogin.css';

const PIN_DIGITS = 5; // Number of digits in the PIN

const PLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // State to track the current step (1: Donorname, 2: PIN)
  const [donorname, setDonorname] = useState(''); // State for donorname
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

  const handleOnKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pin[index]) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleNext = () => {
    if (!donorname.trim()) {
      setError('Please enter your donor name');
      return;
    }
    setError('');
    setStep(2); // Move to the PIN step
  };

  const handleLogin = async () => {
    const enteredPin = pin.join(''); // Combine PIN digits into a single string

    if (enteredPin.length !== PIN_DIGITS) {
      setError('Please enter a valid 5-digit PIN');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/donor-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ donorname, pin: enteredPin }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          navigate('/home'); // Redirect to home page
        } else {
          setError('Invalid donor name or PIN. Please try again.');
        }
      } else {
        setError('Failed to login. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in.');
    }
  };

  return (
    <div className="plogin-container">
      <div className="plogin-form">
        <h2>Provider Login</h2>
        {step === 1 && (
          <div className="donorname-step">
            <label htmlFor="donorname">Donor Name:</label>
            <input
              type="text"
              id="donorname"
              name="donorname"
              placeholder="Enter your donor name"
              value={donorname}
              onChange={(e) => setDonorname(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="pin-step">
            <p>Enter your 5-digit PIN</p>
            <div className="pin-inputs">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOnChange(e.target.value, index)}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  maxLength={1} // Limit input to one character
                  className="pin-input"
                />
              ))}
            </div>
            {error && <p className="error">{error}</p>}
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
        {/* Add Register button */}
        <div className="bottom-links">
          <button
            className="small-button"
            onClick={() => navigate('/provider')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default PLogin;