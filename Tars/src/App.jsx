import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Features/Home/Home';
import About from './Features/About/About';
import Services from './Features/Services/Services';
import Contact from './Features/Contact/Contact';
import Provider from './Registration/Provider/Provider'; 
import SignIn from './Registration/SignIn/SignIn';
import PLogin from './Registration/PLogin/PLogin';
import Login from './Registration/Login/Login';

const App = () => {
  const [theme, setTheme] = useState('dark');

  return (
    <Router>
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/plogin" element={<PLogin />} />
          <Route path="/provider" element={<Provider />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;