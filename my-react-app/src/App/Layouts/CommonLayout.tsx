// src/app/layouts/CommonLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import  Header from '../../shared/components/Header/Header';
import  Footer  from '../../shared/components/Footer/Footer';

export const CommonLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};