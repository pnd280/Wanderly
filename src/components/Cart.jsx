import '@styles/Cart.scss';

import {
  memo,
  useContext,
} from 'react';

import { ImCross } from 'react-icons/im';

import CartContext from '@/context/CartContext';
import CartItem from '@components/CartItem.jsx';

const Cart = memo(function Cart() {
  const { cartItems, show, toggleState, totalPrice } = useContext(CartContext);

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      <div className="cart__overlay" />
      <div className="section-cart">
        <div
          className="section-cart__close-btn"
          onClick={toggleState}
        >
          <ImCross />
        </div>
        {cartItems.length > 0 ? (
          <>
            <div className="cart__item-container">
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  itemIndex={index}
                />
              ))}
            </div>
            <div className="cart__total">
              <div className="cart__total-price">
                <span className="cart__total-text">Total: </span>
                ${totalPrice}
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
});

export default Cart;
