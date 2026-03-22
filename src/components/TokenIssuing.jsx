import React, { useState } from 'react';
import TokenForm from './TokenForm';
import TokenIssued from './TokenIssued';
import addCircleIcon from '../assets/add_circle.svg';
import searchIcon from '../assets/search.svg';

const TokenIssuing = () => {
  const [view, setView] = useState('form'); // 'form' or 'issued'
  const [tokenData, setTokenData] = useState(null);

  const handleIssueToken = (data) => {
    // Mock token generation
    const prefixes = {
      'General Medicine': 'GM',
      'Orthopedics': 'OR',
      'Pediatrics': 'PD'
    };
    const prefix = prefixes[data.department] || 'TK';
    const number = Math.floor(Math.random() * 100) + 100; // Mock number
    
    setTokenData({
      ...data,
      tokenNumber: `${prefix}-${number}`
    });
    setView('issued');
  };

  const handleBack = () => {
    setView('form');
    setTokenData(null);
  };

  return (
    <section className="rightSection" aria-label="Token issuing">
      <div id="token-form-container" className="tokenFormContainer">
        <button className="generateTokenBtn" type="button">
          <img className="addCircleIcon" src={addCircleIcon} alt="" aria-hidden="true" />
          <span>Generate new token</span>
        </button>

        <button className="generateTokenBtn searchTokenBtn" type="button">
          <img className="searchTokenIcon" src={searchIcon} alt="" aria-hidden="true" />
          <span>Search patient</span>
        </button>

        <div className="formCard" id="token-form-card">
          {view === 'form' ? (
            <TokenForm onIssueToken={handleIssueToken} />
          ) : (
            <TokenIssued tokenData={tokenData} onBack={handleBack} />
          )}
        </div>
      </div>
    </section>
  );
};

export default TokenIssuing;
