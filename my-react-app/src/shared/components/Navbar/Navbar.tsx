import './Navbar.css'
import { ShoppingCartOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '../../../app/Router'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store';



const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart.items);
  
  return (
    <div className='navbar'>
      <div className='logo'>
        <div onClick={() => navigate(AppRoutes.MAIN)}> ReadyToEat</div>
      </div>
      <div className='cart'>
        <span className='cart-text' onClick={() => navigate(AppRoutes.CART)}>Cos</span>
        <div onClick={() => navigate(AppRoutes.CART)}><ShoppingCartOutlined /></div>
        {cart.length > 0 && <div className='dot'></div>}
      </div>
    </div>
  )
}

export default Navbar
