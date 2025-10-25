import React, { useState } from 'react';
import './Services.css';
//import DialogBox from '../../security/DialogBox';


const Services = () => {
  const [showMobile, setShowMobile] = useState(Array(8).fill(false)); // State to track visibility of mobile numbers for each request

  // Sample data for multiple requests
  const requests = [
    { name: 'John Doe', bloodGroup: 'A+', location: 'Dwaraka Nagar', mobile: '9876543210' },
    { name: 'Jane Smith', bloodGroup: 'B+', location: 'M V P Colony', mobile: '8765432109' },
    { name: 'Alice Johnson', bloodGroup: 'O-', location: 'RishiKonda', mobile: '7654321098' },
    { name: 'Bob Brown', bloodGroup: 'AB+', location: 'Apollo Hospitals', mobile: '6543210987' },
    { name: 'Charlie Davis', bloodGroup: 'A-', location: 'Gajuwaka', mobile: '5432109876' },
    { name: 'Diana Evans', bloodGroup: 'B-', location: 'Jagadhamba', mobile: '4321098765' },
    { name: 'Ethan Foster', bloodGroup: 'O+', location: 'Vizag', mobile: '3210987654' },
    { name: 'Fiona Green', bloodGroup: 'AB-', location: 'Vizag', mobile: '2109876543' },
  ];

  const handleAccept = (index) => {
    const updatedShowMobile = [...showMobile];
    updatedShowMobile[index] = true; // Show the mobile number for the specific request
    setShowMobile(updatedShowMobile);
  };

  return (
    <div className="services-container">
      {requests.map((request, index) => (
        <div key={index} className="request-card">
          <h3>{request.name}</h3>
          <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
          <p><strong>Location:</strong> {request.location}</p>
          {showMobile[index] ? (
            <p><strong>Mobile:</strong> {request.mobile}</p>
          ) : (
            <button className="accept-button" onClick={() => handleAccept(index)}>
              Accept
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Services;