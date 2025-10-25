import React, { useState } from 'react';
import './Provider.css';

function Provider() {
  const [step, setStep] = useState(1); // Step for multi-step form
  const [provider, setProvider] = useState({
    donorname: '', // Updated from "username"
    name: '',
    mobile: '',
    area: '',
    city: '',
    pin_code: '', // Updated from "pinCode"
    age: '',
    pin: '', // 5-digit PIN
    blood_group: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProvider((prevProvider) => ({
      ...prevProvider,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (provider.pin.length !== 5) {
      setError('PIN must be exactly 5 digits');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/register-donor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(provider), // Send the updated provider object
      });
      if (response.ok) {
        alert('Provider registered successfully');
      } else {
        alert('Failed to register provider');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering the provider');
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="provider">
      <h2 id="header">Register as a Provider</h2>
      <form>
        {step === 1 && (
          <div className="form-section">
            <h3>Personal Details</h3>
            <div className="form-group">
              <label htmlFor="donorname">Username:</label>
              <input
                type="text"
                id="donorname"
                name="donorname"
                placeholder="Enter your username"
                value={provider.donorname}
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
                value={provider.name}
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
                value={provider.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="blood_group">Blood Group:</label>
              <select
                id="blood_group"
                name="blood_group"
                value={provider.blood_group}
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
                value={provider.area}
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
                value={provider.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pin_code">Pin Code:</label>
              <input
                type="text"
                id="pin_code"
                name="pin_code"
                pattern="[0-9]{6}"
                placeholder="Enter your pin code"
                value={provider.pin_code}
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
                pattern="[0-9]{5}"
                placeholder="Enter a 5-digit PIN"
                value={provider.pin}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="button" onClick={prevStep} className="prev-button">
              Previous
            </button>
            <button type="button" onClick={handleSubmit} className="submit-button">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Provider;