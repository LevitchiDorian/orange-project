// MainPage.tsx
import React from 'react';
import { useSelector } from 'react-redux'; // Adjust path if necessary
import Header from '../../shared/components/Header/Header';
import MainContent from '../../shared/components/MainContent/MainContent';
import Footer from '../../shared/components/Footer/Footer';
import Navbar from '../../shared/components/Navbar/Navbar';
import Spinner from '../../shared/components/Spinner/Spinner';
import { RootState } from '../../app/store';

const MainPage: React.FC = () => {
  // Access the loading state for this page
  const isLoading = useSelector((state: RootState) => state.spinner);

  return (
    <div className="app">
      {isLoading && <Spinner />} {/* Show Spinner when loading */}
      <div className="background-blur"></div>
      <Navbar />
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default MainPage;
