import './Navbar.css'
import { ShoppingCartOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <div className='logo'>
        <div onClick={() => navigate('/main')}> ReadyToEat</div>
      </div>
      <div className='cart'>
      <div onClick={() => navigate('/cart')}><ShoppingCartOutlined /></div>
        {/* <div className="dot"></div> */}
      </div>
    </div>
  )
}

export default Navbar
