import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Home.css';
import bgImage from '../../assets/bg-image.jpeg';
import DialogBox from '../../security/DialogBox';

const Home = () => {
  const [bloodGroup, setBloodGroup] = useState(''); // State for blood group
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [enteredPin, setEnteredPin] = useState(''); // State for entered pin

  useEffect(() => {
    const handleScroll = () => {
      const homeElement = document.querySelector('.home');
      if (window.scrollY > 50) {
        homeElement.classList.add('scrolled');
      } else {
        homeElement.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRequest = () => {
    setIsDialogOpen(true); // Open the dialog box for PIN verification
  };

  const verifyPin = () => {
    fetch('http://localhost:8080/verify-pin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pin: enteredPin }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Pin verified successfully!');
          setIsDialogOpen(false); // Close the dialog
          // Proceed with the action (e.g., sending the request)
          fetch('http://localhost:8080/requests', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bloodGroup, requestTime: new Date().toISOString(), status: 'pending' }),
          })
            .then((response) => {
              if (response.ok) {
                alert('Request sent successfully!');
              } else {
                alert('Failed to send request.');
              }
            })
            .catch((error) => console.error('Error sending request:', error));
        } else {
          alert('Invalid Pin. Please try again.');
        }
      })
      .catch((error) => console.error('Error verifying pin:', error));
  };

  return (
    <div className="home">
      <div className="background-image" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="blood-group-container">
        <h3>Select Blood Group</h3>
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="blood-group-select"
        >
          <option value="" disabled>Select your blood group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <button onClick={handleRequest} className="request-button">Send Request</button>
      </div>

      {/* Dialog Box for Pin Verification */}
      <DialogBox
        title="Enter Security Pin"
        message="Please enter your security pin to proceed."
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={verifyPin}
      >
        <input
          type="password"
          value={enteredPin}
          onChange={(e) => setEnteredPin(e.target.value)}
          placeholder="Enter your pin"
          className="dialog-input"
        />
      </DialogBox>
    </div>
  );
};

export default Home;