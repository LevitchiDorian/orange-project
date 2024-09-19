import React from 'react'
import "./OrderTypeContent.css"

const OrderTypeContent: React.FC = () => {
  return (
    <div className='order-content'>
      <div className='order-restaurant'>
        <img src="restaurant-logo.png" alt="" className='restaurant-logo' />
        <h2 className="restaurant-name">#Restaurant</h2>
      </div>
      <div className='order-type'>
        <div className='type-take'>
          <h3>La Pachet</h3>
        </div>
        <div className='type-stay'>
          <h3>Pe Loc</h3>
        </div>
      </div>
    </div>
  )
}

export default OrderTypeContent
