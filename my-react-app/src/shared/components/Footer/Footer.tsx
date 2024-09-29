import React from 'react';
import './scrollAnimation';
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="logo">EasyToEat</div>
        <div className="contacts">
          <h6>Contacte:</h6>
          <p>+373 (60) 181 567</p>
          <p>orange.preorder@mail.ru</p>
        </div>
        <p className="copyright">©Copyright 2024</p>
    </footer>
  );
}

export default Footer;