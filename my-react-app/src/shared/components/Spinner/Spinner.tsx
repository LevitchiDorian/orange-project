import React from 'react';
import './Spinner.css'; // Ensure you have a CSS file for styling

const Spinner: React.FC = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
