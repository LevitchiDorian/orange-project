import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../App/Router';

const Navbar: React.FC = () => (
  <nav>
    <Link to={AppRoutes.MAIN}>Home</Link>
    {/* <Link to={AppRoutes.PAGE_ONE}>Page One</Link>
    <Link to={AppRoutes.PAGE_TWO}>Page Two</Link> */}
    {/* <Link to={AppRoutes.PAGE_THREE}>Page Three</Link> */}
  </nav>
);

export default Navbar;