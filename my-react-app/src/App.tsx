import React from 'react';
import Header from './shared/components/Header/Header';
import Footer from './shared/components/Footer/Footer';
import MainContent from './shared/components/MainContent/MainContent';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;