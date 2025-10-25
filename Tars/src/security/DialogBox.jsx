import React, { useState, useRef, useEffect } from 'react';
import './DialogBox.css';

const PIN_DIGITS = 5; // Number of digits in the PIN

const DialogBox = ({ title, message, isOpen, onClose, onConfirm }) => {
  const [pin, setPin] = useState(new Array(PIN_DIGITS).fill('')); // State for PIN digits
  const inputRefs = useRef([]); // Refs for input fields

  useEffect(() => {
    if (isOpen) {
      inputRefs.current[0]?.focus(); // Focus on the first input when the dialog opens
    }
  }, [isOpen]);

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

  const handleSubmit = () => {
    const enteredPin = pin.join(''); // Combine PIN digits into a single string
    onConfirm(enteredPin); // Pass the PIN to the parent component for verification
  };

  if (!isOpen) return null; // Do not render if the dialog is not open

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>
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
        <div className="dialog-actions">
          <button className="dialog-button confirm" onClick={handleSubmit}>
            Confirm
          </button>
          <button className="dialog-button cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;