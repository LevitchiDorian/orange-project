import React from 'react'
import Navbar from '../../shared/components/Navbar/Navbar'
import Footer from '../../shared/components/Footer/Footer'
import FormIR from '../../shared/components/FormIR/FormIR'
import Spinner from '../../shared/components/Spinner/Spinner';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

const FormInRestaurantPage: React.FC = () => {
  // Access the loading state for this page
  const isLoading = useSelector((state: RootState) => state.spinner);

  return (
    <div className="app">
      {isLoading && <Spinner />} {/* Show Spinner when loading */}
      <div className="background-blur"></div>
      <Navbar />
      <FormIR />
      <Footer />
    </div>
  )
}

export default FormInRestaurantPage
