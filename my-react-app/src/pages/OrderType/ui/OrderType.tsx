import React from 'react'
import Navbar from '../../../shared/components/Navbar/Navbar'
import Footer from '../../../shared/components/Footer/Footer'
import OrderTypeContent from '../../../shared/components/OrderTypeContent/OrderTypeContent'

const OrderType: React.FC = () => {
  return (
        <div className="app">
            <div className="background-blur"></div>
            <Navbar />
            <OrderTypeContent />
            <Footer />
        </div>
  )
}

export default OrderType
