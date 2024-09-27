import React from 'react';
import Footer from '../../shared/components/Footer/Footer';
import Navbar from '../../shared/components/Navbar/Navbar';
import CategoryContent from '../../shared/components/CategoryPage/CategoryContent';
import Header from '../../shared/components/Header/Header';
import Spinner from '../../shared/components/Spinner/Spinner';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';


const CategoryPage: React.FC = () => {
  // Access the loading state for this page
  const isLoading = useSelector((state: RootState) => state.spinner);

  return (
    <div className="app">
      {isLoading && <Spinner />} {/* Show Spinner when loading */}
      <div className="background-blur"></div>
      <Navbar />
      <Header />
      <CategoryContent />
      <Footer />
    </div>
  );
}

export default CategoryPage;