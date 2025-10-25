import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step for multi-step form
  const [user, setUser] = useState({
    username: '',
    name: '',
    mobile: '',
    area: '',
    city: '',
    pinCode: '',
    age: '',
    pin: '', // 5-digit PIN
    bloodGroup: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.pin.length !== 5) {
      setError('PIN must be exactly 5 digits');
      return;
    }

    const payload = {
      username: user.username,
      name: user.name,
      mobile: user.mobile,
      area: user.area,
      city: user.city,
      pin_code: user.pinCode, // Transform camelCase to snake_case
      age: user.age,
      pin: user.pin,
      blood_group: user.bloodGroup, // Transform camelCase to snake_case
    };

    try {
      console.log('Payload:', payload);
      const response = await axios.post('http://localhost:8080/register-user', payload);
      if (response.status === 200) {
        setMessage('User registered successfully');
        alert('User registered successfully!');
        navigate('/Home'); // Redirect to home page
      } else {
        setMessage(response.data.message || 'An error occurred');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setMessage(errorMessage);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-section">
            <h3>Personal Details</h3>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Enter your age"
                value={user.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group:</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={user.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select your blood group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="area">Area:</label>
              <input
                type="text"
                id="area"
                name="area"
                placeholder="Enter your area"
                value={user.area}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                value={user.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pinCode">Pin Code:</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                pattern="[0-9]{6}" // Ensure exactly 6 digits
                placeholder="Enter your pin code"
                value={user.pinCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                pattern="[0-9]{10}"
                placeholder="Enter your 10-digit mobile number"
                value={user.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" onClick={nextStep} className="next-button">
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="form-section">
            <h3>Set Your PIN</h3>
            <div className="form-group">
              <label htmlFor="pin">5-digit PIN:</label>
              <input
                type="password"
                id="pin"
                name="pin"
                pattern="[0-9]{5}" // Ensure exactly 5 digits
                placeholder="Enter a 5-digit PIN"
                value={user.pin}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="button" onClick={prevStep} className="prev-button">
              Previous
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        )}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignIn;