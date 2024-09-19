import './Navbar.css'
import { ShoppingCartOutlined } from '@ant-design/icons'
import React from 'react'

const Navbar: React.FC = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
            <a href="#main">ReadyToEat</a>
        </div>
        <div className='cart'>
            <a href="#cart"><ShoppingCartOutlined /></a>
            {/* <div className="dot"></div> */}
        </div>
    </div>
  )
}

export default Navbar
