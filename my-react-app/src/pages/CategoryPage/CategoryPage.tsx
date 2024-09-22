import React from 'react';
import Footer from '../../shared/components/Footer/Footer';
import Navbar from '../../shared/components/Navbar/Navbar';
import CategoryContent from '../../shared/components/CategoryPage/CategoryContent';
import Header from '../../shared/components/Header/Header';



const CategoryPage: React.FC = () => {
  return (
    <div className="app">
      <div className="background-blur"></div>
      <Navbar />
      <Header />
      <CategoryContent />
      <Footer />
    </div>
  );
}

export default CategoryPage;