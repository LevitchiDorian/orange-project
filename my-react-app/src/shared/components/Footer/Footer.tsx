import React from 'react';
import './scrollAnimation';
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="logo">ReadyToEat</div>
        <div className="contacts">
          <h6>Contacts:</h6>
          <p>+373 999999999</p>
          <p>mail@mail.com</p>
          <p>instagram.com</p>
        </div>
        <p className="copyright">©Copyright 2024</p>
    </footer>
  );
}

export default Footer;