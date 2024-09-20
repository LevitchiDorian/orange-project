import React from 'react';
import Header from '../../shared/components/Header/Header';
import MainContent from '../../shared/components/MainContent/MainContent';
import Footer from '../../shared/components/Footer/Footer';
import Navbar from '../../shared/components/Navbar/Navbar';


const MainPage: React.FC = () => {
  return (
    <div className="app">
      <div className="background-blur"></div>
      <Navbar />
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default MainPage;