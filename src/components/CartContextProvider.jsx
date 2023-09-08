import {
  useEffect,
  useState,
} from 'react';

import { PropTypes } from 'prop-types';

import CartContext from '@/context/CartContext';
import useLocalStorage from '@hooks/useLocalStorage';

const CartContextProvider = ({ children }) => {
  const [cartFetched, setCartFetched] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage('cart', []);
  const [show, setShow] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cartFetched) return;

    const initialCartItems = cartItems;

    setTotalAmount(
      initialCartItems.reduce((acc, item) => acc + item.quantity, 0)
    );
    setTotalPrice(
      initialCartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      )
    );

    setCartFetched(true);
  }, [cartItems, cartFetched]);

  // Define your actions here
  const setCart = (newCartItems) => {
    setCartItems(newCartItems);
    setTotalAmount(newCartItems.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(
      newCartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  };

  const addItem = (item, quantity = 1) => {
    const itemIndex = cartItems.findIndex((e) => e.id === item.id);

    if (itemIndex < 0) {
      setCartItems([...cartItems, { ...item, quantity }]);
    } else {
      const updatedCartItems = [
        ...cartItems.slice(0, itemIndex),
        {
          ...item,
          quantity: (cartItems[itemIndex]?.quantity ?? 1) + quantity,
        },
        ...cartItems.slice(itemIndex + 1, cartItems.length),
      ];
      setCartItems(updatedCartItems);
    }

    setTotalAmount(totalAmount + quantity);
    setTotalPrice(totalPrice + quantity * item.price);
  };

  const updateItem = (id, isIncreased, quantity = 1) => {
    const itemIndex = cartItems.findIndex((e) => e.id === id);

    if (itemIndex < 0) return;

    const updatedQuantity =
      (cartItems[itemIndex]?.quantity ?? 1) +
      (isIncreased ? quantity : -quantity);

    if (updatedQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      const updatedCartItems = [
        ...cartItems.slice(0, itemIndex),
        {
          ...cartItems[itemIndex],
          quantity: updatedQuantity,
        },
        ...cartItems.slice(itemIndex + 1, cartItems.length),
      ];
      setCartItems(updatedCartItems);
    }

    setTotalAmount(totalAmount + (isIncreased ? quantity : -quantity));
    setTotalPrice(
      totalPrice +
        (isIncreased ? quantity : -quantity) *
          (cartItems[itemIndex]?.price ?? 0)
    );
  };

  const toggleState = () => {
    setShow(!show);
  };

  return (
    <CartContext.Provider
      value={{
        cartFetched,
        cartItems,
        show,
        totalAmount,
        totalPrice,
        setCart,
        addItem,
        updateItem,
        toggleState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContextProvider;
