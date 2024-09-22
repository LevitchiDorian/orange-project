import { Routes, Route, Navigate } from 'react-router-dom';
import { AppRoutes } from '../app/Router';
import MainPage from '../pages/MainPage/MainPage';
import Cart from '../pages/CartPage/Cart';
import OrderType from '../pages/OrderType/OrderType';
export const Routing = () => (
    <Routes>
        <Route path="/" element={<Navigate to={AppRoutes.MAIN} />} />
        <Route path={AppRoutes.MAIN} element={< MainPage />} ></Route>
        <Route path={AppRoutes.CART} element={< Cart />} ></Route>
        <Route path={AppRoutes.ORDER_TYPE} element={< OrderType />} ></Route>
    </Routes>
)