import { useEffect, useState, useReducer, useMemo, useCallback } from 'react';

import useArray from '@hooks/useArray.js';

import { BsCart } from 'react-icons/bs';

import './Merchs.scss';

import { merchs as mockData } from '../mock-data';
import MerchCard from '../components/MerchCard';
import Button from '../components/Button';
import axios from 'axios';
import Cart from './Cart';

const initialState = {
  activePageIndex: 0,
  cardPerPage: 3,
  searchTerm: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PAGE_INDEX':
      return state.activePageIndex === action.payload
        ? state
        : {
            ...state,
            activePageIndex: action.payload,
          };
    case 'SET_CARD_PER_PAGE':
      return {
        ...state,
        cardPerPage: action.payload,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

const Merchs = () => {
  const [merchs, setMerchs] = useState([]);

  const [cartToggle, setCartToggle] = useState(false);
  const [cartFetched, setCartFetched] = useState(false);

  const handleCartToggle = () => {
    setCartToggle((prevState) => !prevState);
  };

  const [
    cartItems,
    setCartItems,
    pushCartItem,
    filterCartItem,
    updateCartItem,
    removeCartItem,
  ] = useArray([]);

  const [{ activePageIndex, cardPerPage, searchTerm }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(cartItems);

    setCartFetched(true);
  };

  useEffect(() => {
    (async () => {
      console.log('fetching merchs...');

      let fetchedMerchs = [];

      try {
        const response = await axios.get('http://127.0.0.1:28000/merchs/all');
        fetchedMerchs = response.data;
      } catch (error) {
        fetchedMerchs = mockData;
      }

      setMerchs(fetchedMerchs);
      dispatch({ type: 'SET_ACTIVE_PAGE_INDEX', payload: 1 });

      fetchCartItems();
    })();
  }, []);

  const displayMerchIds = useMemo(() => {
    return searchTerm.length > 0
      ? merchs
          .filter((merch) =>
            merch.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((merch) => merch.id)
      : Array.from({ length: cardPerPage }, (_, i) => {
          return 1 + (activePageIndex - 1) * cardPerPage + i;
        });
  }, [activePageIndex, searchTerm, cardPerPage]);

  useEffect(() => {
    activePageIndex > Math.ceil(merchs.length / cardPerPage) &&
      dispatch({
        type: 'SET_ACTIVE_PAGE_INDEX',
        payload: Math.ceil(merchs.length / cardPerPage),
      });
  }, [cardPerPage]);

  useEffect(() => {
    cartFetched && localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="section-merchs">
      <Cart
        cartItems={cartItems}
        cartToggle={cartToggle}
        handleCartToggle={handleCartToggle}
        handleCartItemsChange={{
          setCartItems,
          pushCartItem,
          filterCartItem,
          updateCartItem,
          removeCartItem,
        }}
      />
      <h2 className="heading-secondary" id="merchs">
        Merchandise
      </h2>
      <div className="section-merchs__header">
        <div className="section-merchs__search-box">
          <input
            type="text"
            className="search-box__input"
            placeholder="Enter a product name..."
            value={searchTerm}
            onChange={(e) => {
              dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value });
            }}
          />
        </div>
        <div className="section-merchs__cart" onClick={handleCartToggle}>
          {cartItems.length > 0 && (
            <div className="cart__count">
              {cartItems.reduce((acc, item) => (item?.quantity ?? 1) + acc, 0)}
            </div>
          )}
          <div className="cart__btn">
            <BsCart />
          </div>
        </div>
      </div>
      <div className="section-merchs__merch-container">
        {merchs.map((merch) => (
          <MerchCard
            key={merch.id}
            merch={merch}
            show={displayMerchIds.includes(merch.id)}
            addToCartHandle={() => {
              const itemIndexInCart = cartItems.findIndex(
                (item) => item.id === merch.id
              );

              itemIndexInCart < 0
                ? pushCartItem(merch)
                : updateCartItem(itemIndexInCart, {
                    ...merch,
                    quantity: (cartItems[itemIndexInCart]?.quantity ?? 1) + 1,
                  });
            }}
          />
        ))}
      </div>

      {searchTerm.length < 1 && (
        <>
          <div
            className="btn-text show-more-less"
            onClick={() => {
              let newCardPerPage = cardPerPage == 3 ? 6 : 3;

              dispatch({ type: 'SET_CARD_PER_PAGE', payload: newCardPerPage });
            }}
          >
            Show {cardPerPage == 3 ? 'more' : 'less'}
          </div>
          <div className="section-merchs__pagination">
            {Array.from(
              { length: Math.ceil(merchs.length / cardPerPage) },
              (_, i) => i + 1
            ).map((pageIndex, index) => {
              return (
                <Button
                  key={index}
                  className={`section-tours__pagination-item btn ${
                    index + 1 === activePageIndex ? 'is-active' : ''
                  }`}
                  onClick={() => {
                    dispatch({
                      type: 'SET_ACTIVE_PAGE_INDEX',
                      payload: index + 1,
                    });
                  }}
                >
                  {pageIndex}
                </Button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Merchs;
