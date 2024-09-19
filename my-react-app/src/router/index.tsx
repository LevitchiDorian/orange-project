import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../App/Router';
import MainPage from '../pages/MainPage';

export const Routing = () => (
    <Routes>
        <Route path={AppRoutes.MAIN} element={< MainPage />} ></Route>
    </Routes>
)