import React, { useState, useEffect } from 'react';
import logo from '../assets/profile_image.png';
import loginIcon from '../assets/login.svg';

const Header = () => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      };
      // Expected format: "Wednesday, October 25 | 9:40 PM"
      const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      const formattedTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      setDateTime(`${formattedDate} | ${formattedTime}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="headerContent">
        <div className="logoSection">
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '32px', margin: 0 }}>QUENTRA</h1>
        </div>
        <div className="datetimeSection">
          <div id="datetime" className="datetime">{dateTime}</div>
        </div>
        <div className="staffLoginSection">
          <button className="staffLoginBtn" type="button" style={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <img className="staffLoginIcon" src={loginIcon} alt="" aria-hidden="true" style={{ marginRight: '8px' }} />
            <span className="staffLoginText">Staff login</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
