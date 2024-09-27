import React from 'react'
import Navbar from '../../shared/components/Navbar/Navbar'
import Footer from '../../shared/components/Footer/Footer'
import OrderTypeContent from '../../shared/components/OrderTypeContent/OrderTypeContent'
import Spinner from '../../shared/components/Spinner/Spinner';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

const OrderType: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.spinner);

  return (
    <div className="app">
      {isLoading && <Spinner />} {/* Show Spinner when loading */}
            <div className="background-blur"></div>
            <Navbar />
            <OrderTypeContent />
            <Footer />
        </div>
  )
}

export default OrderType
