import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <article className="feature-card">
      <div className="feature-card-icon">
        {icon}
      </div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </article>
  );
};

export default FeatureCard;
