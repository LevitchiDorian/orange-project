import React from 'react';
import './CartContent.css';

const CartContent: React.FC = () => {
  return (
    <div className="cart-content">
      <div className="cart-header">
        <h2 className="cart-title">Coșul Tău</h2>
      </div>

      <div className="cart-items">
        <div className="cart-item">
          {/* Placeholder pentru iteme din coș */}
          <h3>Produs 1</h3>
          <p>Detalii produs...</p>
        </div>
        <div className="cart-item">
          <h3>Produs 2</h3>
          <p>Detalii produs...</p>
        </div>
      </div>

      {/* Poți adăuga butoane pentru acțiuni adiționale sau total */}
      <div className="cart-actions">
        <button>Continuă Comanda</button>
      </div>
    </div>
  );
};

export default CartContent;
