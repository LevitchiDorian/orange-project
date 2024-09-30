import React from 'react'
import Navbar from '../../shared/components/Navbar/Navbar'
import Footer from '../../shared/components/Footer/Footer'
import FormIR from '../../shared/components/FormTA/FormTA'


const FormTakeAwayPage: React.FC = () => {

  return (
    <div className="app">
      <div className="background-blur"></div>
      <Navbar />
      <FormIR />
      <Footer />
    </div>
  )
}

export default FormTakeAwayPage
