import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo_light from '../../assets/logo-white.jpg';
import logo_dark from '../../assets/logo-black.jpg';
import search_icon_light from '../../assets/search-w.png';
import search_icon_dark from '../../assets/search-b.png';
import toggle_light from '../../assets/day.png';
import toggle_dark from '../../assets/night.png';

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    console.log('clicked');
  };

  const handleSignInClick = () => {
    navigate('/Login');
  };

  return (
    <div className='navbar'>
      <img src={theme === 'light' ? logo_light : logo_dark} alt='' className='logo' />
      <ul className='nav-links'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/services'>Updates</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        <li><Link to='/about'>Support</Link></li>
      </ul>
      <div className='search-box'>
        <input type='text' className='search-txt' placeholder='Search...' />
        <img src={theme === 'light' ? search_icon_light : search_icon_dark} alt='' />
      </div>
      <img onClick={toggle_mode}
        src={theme === 'light' ? toggle_light : toggle_dark} alt='' className='toggle-icon' />
      <button className='Login' onClick={handleSignInClick}>Login</button>
    </div>
  );
};

export default Navbar;