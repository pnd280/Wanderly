import '@styles/CartItem.scss';

import { useContext } from 'react';

import { PropTypes } from 'prop-types';
import {
  HiMinusSm,
  HiPlusSm,
} from 'react-icons/hi';
import { RxCrossCircled } from 'react-icons/rx';

import CartContext from '@/context/CartContext';

const CartItem = ({ item }) => {
  const { updateItem } = useContext(CartContext);

  return (
    <div className="cart__item">
      <div
        className="cart__item__remove-btn"
        onClick={() => {
          updateItem(item.id, false, item.quantity);
        }}
      >
        <RxCrossCircled />
      </div>
      <div className="cart__item-img">
        <img src={item.img_src} alt={item.name} />
      </div>
      <div className="cart__item-name">{item.name}</div>
      <div className="cart__item__price-info">
        <div className="cart__item-price">
          <div className="cart__item-price-text">{item.price}$</div>
        </div>
        <div className="cart__item-quantity">
          <div
            className="cart__item-quantity-btn-decrease"
            onClick={() => {
              updateItem(item.id, false);
            }}
          >
            <HiMinusSm />
          </div>
          <div className="cart__item-quantity-count">{item?.quantity ?? 1}</div>
          <div
            className="cart__item-quantity-btn-increase"
            onClick={() => {
              updateItem(item.id, true);
            }}
          >
            <HiPlusSm />
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  itemIndex: PropTypes.number.isRequired,
};

export default CartItem;
