import React from 'react';
import ticketIcon from '../assets/confirmation_number_icon.svg';
import arrowDownIcon1 from '../assets/add_circle.svg'; // Placeholder for arrows
import arrowDownIcon2 from '../assets/add_circle.svg'; // Placeholder for arrows

const TokenForm = ({ onIssueToken }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      patientName: formData.get('patientName'),
      mobileNumber: formData.get('mobileNumber'),
      department: formData.get('department'),
      doctor: formData.get('doctor'),
    };
    onIssueToken(data);
  };

  return (
    <div id="token-form-view">
      <h2 className="formTitle">
        <img src={ticketIcon} alt="" aria-hidden="true" className="formTitleIcon" />
        Issue New Token
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="formLabel" htmlFor="patient-name">Patient Name</label>
          <input
            id="patient-name"
            name="patientName"
            type="text"
            className="formInput"
            placeholder="Enter full name"
            required
            style={{ background: '#f8fafc' }}
          />
        </div>

        <div className="formGroup">
          <label className="formLabel" htmlFor="mobile-number">Mobile Number</label>
          <input
            id="mobile-number"
            name="mobileNumber"
            type="tel"
            className="formInput"
            placeholder="+91 99999-99999"
            inputMode="numeric"
            minLength="10"
            maxLength="10"
            required
            style={{ background: '#f8fafc' }}
          />
        </div>

        <div className="formGroup">
          <label className="formLabel" htmlFor="department-select">Department</label>
          <div className="selectWrapper">
            <select id="department-select" name="department" className="formSelect" required defaultValue="" style={{ background: '#f8fafc' }}>
              <option value="" disabled hidden>Select department</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </div>
        </div>

        <div className="formGroup">
          <label className="formLabel" htmlFor="doctor-select">Doctor</label>
          <div className="selectWrapper">
            <select id="doctor-select" name="doctor" className="formSelect" required defaultValue="" style={{ background: '#f8fafc' }}>
              <option value="" disabled hidden>Select doctor</option>
              <option value="Dr.abc">Dr.abc</option>
              <option value="Dr. Mehta">Dr. Mehta</option>
              <option value="Dr. shah">Dr. shah</option>
              <option value="Dr. sarah">Dr. sarah</option>
            </select>
          </div>
        </div>

        <button id="issue-token-btn" className="issueTokenBtn" type="submit">Issue Token</button>
      </form>

      <div id="form-error" className="formErrorMessage" aria-live="polite"></div>
    </div>
  );
};

export default TokenForm;
