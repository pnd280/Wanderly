import { useState, useMemo } from 'react';

import { ImCross } from 'react-icons/im';

import CartItem from '../components/CartItem.jsx';
import './Cart.scss';

const Cart = ({
  cartItems,
  cartToggle,
  handleCartToggle,
  handleCartItemsChange,
}) => {
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * (item?.quantity ?? 1),
      0
    );
  }, [cartItems]);

  return (
    <div style={{ display: cartToggle ? 'block' : 'none' }}>
      <div className="cart__overlay" />
      <div className="section-cart">
        <div className="section-cart__close-btn" onClick={handleCartToggle}>
          <ImCross />
        </div>
        {cartItems.length > 0 ? (
          <>
            <div className="cart__item-container">
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  handleCartItemsChange={handleCartItemsChange}
                  itemIndex={index}
                />
              ))}
            </div>
            <div className="cart__total">
              <div className="cart__total-price">
                <span className="cart__total-text">Total: </span>
                {totalPrice}$
              </div>

              <div className="cart__total-btn btn">Checkout</div>
            </div>
          </>
        ) : (
          <div>Cart is empty</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
