import './Navbar.css'
import { ShoppingCartOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '../../../app/Router'



const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <div className='logo'>
        <div onClick={() => navigate(AppRoutes.MAIN)}> ReadyToEat</div>
      </div>
      <div className='cart'>
        <div onClick={() => navigate(AppRoutes.CART)}><ShoppingCartOutlined /></div>
      </div>
    </div>
  )
}

export default Navbar
