import './Navbar.css'
import { ShoppingCartOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate();

const Navbar: React.FC = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
        {/* <div onClick={() => navigate('/cart')}> ReadyToEat</div> */}
      </div>
      <div className='cart'>
        <a href="#cart"><ShoppingCartOutlined /></a>
        {/* <div className="dot"></div> */}
      </div>
    </div>
  )
}

export default Navbar
