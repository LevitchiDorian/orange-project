import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../app/Router';
import MainPage from '../pages/MainPage/MainPage';
import Cart from '../pages/CartPage/Cart';
import OrderType from '../pages/OrderType/OrderType';
import MenuPage from '../pages/MenuPage/ui/MenuPage';
import CategoryPage from '../pages/CategoryPage/CategoryPage';

export const Routing = () => (
  <Routes>
    <Route path={AppRoutes.MAIN} element={<MainPage />} />
    <Route path={AppRoutes.CART} element={<Cart />} />
    <Route path={AppRoutes.ORDER_TYPE} element={<OrderType />} />
    <Route path={AppRoutes.TAKEAWAY} element={<MenuPage />} />
    <Route path={AppRoutes.IN_RESTAURANT} element={<MenuPage />} />
    <Route path={AppRoutes.CATEGORY_PAGE} element={<CategoryPage />} />
  </Routes>
);