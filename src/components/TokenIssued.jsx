import React from 'react';

const TokenIssued = ({ tokenData, onBack }) => {
  return (
    <div id="token-issued-view">
      <h2 className="formTitle">Token Issued</h2>
      <div id="inline-token-number" className="tokenNumber">{tokenData.tokenNumber || 'GM-106'}</div>
      <div className="tokenDetails">
        <p className="tokenDetailItem">
          <span className="tokenDetailLabel">Department:</span>
          <span id="inline-token-department" className="tokenDetailValue">{tokenData.department}</span>
        </p>
        <p className="tokenDetailItem">
          <span className="tokenDetailLabel">Doctor:</span>
          <span id="inline-token-doctor" className="tokenDetailValue">{tokenData.doctor}</span>
        </p>
      </div>
      <button id="inline-back-to-form-btn" className="backToFormBtn" type="button" onClick={onBack}>
        Issue Another Token
      </button>
    </div>
  );
};

export default TokenIssued;
