import React from 'react';
// import Header from './shared/components/Header/Header';
// import Footer from './shared/components/Footer/Footer';
// import MainContent from './shared/components/MainContent/MainContent';
import MainPage from './pages/MainPage/ui/MainPage';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="background-blur"></div>
      <MainPage />
    </div>
  );
}

export default App;