import '@styles/CartItem.scss';

import { PropTypes } from 'prop-types';
import {
  HiMinusSm,
  HiPlusSm,
} from 'react-icons/hi';
import { RxCrossCircled } from 'react-icons/rx';

const CartItem = ({ item, handleCartItemsChange, itemIndex }) => {
  return (
    <div className="cart__item">
      <div
        className="cart__item__remove-btn"
        onClick={() => {
          handleCartItemsChange.removeCartItem(itemIndex);
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
              item.quantity > 1 &&
                handleCartItemsChange.updateCartItem(itemIndex, {
                  ...item,
                  quantity: (item?.quantity ?? 1) - 1,
                });
            }}
          >
            <HiMinusSm />
          </div>
          <div className="cart__item-quantity-count">{item?.quantity ?? 1}</div>
          <div
            className="cart__item-quantity-btn-increase"
            onClick={() => {
              handleCartItemsChange.updateCartItem(itemIndex, {
                ...item,
                quantity: (item?.quantity ?? 1) + 1,
              });
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
  handleCartItemsChange: PropTypes.object.isRequired,
  itemIndex: PropTypes.number.isRequired,
}

export default CartItem;
