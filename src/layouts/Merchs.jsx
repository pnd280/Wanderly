import '@styles/Merchs.scss';

import {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import axios from 'axios';
import { BsCart } from 'react-icons/bs';

import Cart from '@/components/Cart';
import Portal from '@/components/Portal';
import AppContext from '@/context/AppContext';
import useArrayLocalStorage from '@/hooks/useArrayLocalStorage';
import { merchs as mockData } from '@/mock-data';
import MerchCard from '@components/MerchCard';
import Pagination from '@components/Pagination';

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
  const { merchs, setMerchs, setMerchFetched } = useContext(AppContext);

  const [cartToggle, setCartToggle] = useState(false);

  const handleCartToggle = () => {
    setCartToggle((prevState) => !prevState);
  };

  const {
    storedValue: cart,
    setValue: setCart,
    push: pushCartItem,
    filter: filterCartItem,
    update: updateCartItem,
    remove: removeCartItem,
  } = useArrayLocalStorage('cart');

  const [{ activePageIndex, cardPerPage, searchTerm }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchMerchs = async () => {
    console.log('fetching merchs...');

    let fetchedMerchs = [];

    try {
      const response = await axios.get('http://127.0.0.1:28000/merchs/all');
      fetchedMerchs = response.data;
    } catch (error) {
      fetchedMerchs = mockData;
    }

    return fetchedMerchs;
  };

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
    (async () => {
      const fetchedMerchs = await fetchMerchs();
      setMerchs(fetchedMerchs);
      setMerchFetched(true);

      dispatch({ type: 'SET_ACTIVE_PAGE_INDEX', payload: 1 });
    })();
  }, []);

  useEffect(() => {
    activePageIndex > Math.ceil(merchs.length / cardPerPage) &&
      dispatch({
        type: 'SET_ACTIVE_PAGE_INDEX',
        payload: Math.ceil(merchs.length / cardPerPage),
      });
  }, [cardPerPage]);

  return (
    <>
      <Portal>
        <Cart
          cartItems={cart}
          cartToggle={cartToggle}
          handleCartToggle={handleCartToggle}
          handleCartItemsChange={{
            setCartItems: setCart,
            pushCartItem,
            filterCartItem,
            updateCartItem,
            removeCartItem,
          }}
        />
      </Portal>
      <div className="section-merchs">
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
            {cart.length > 0 && (
              <div className="cart__count">
                {cart.reduce((acc, item) => (item?.quantity ?? 1) + acc, 0)}
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
                const itemIndexInCart = cart.findIndex(
                  (item) => item.id === merch.id
                );

                itemIndexInCart < 0
                  ? pushCartItem(merch)
                  : updateCartItem(itemIndexInCart, {
                      ...merch,
                      quantity: (cart[itemIndexInCart]?.quantity ?? 1) + 1,
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

                dispatch({
                  type: 'SET_CARD_PER_PAGE',
                  payload: newCardPerPage,
                });
              }}
            >
              Show {cardPerPage == 3 ? 'more' : 'less'}
            </div>
            <Pagination
              className="section-merchs__pagination"
              activePageIndex={activePageIndex}
              totalPage={Math.ceil(merchs.length / cardPerPage)}
              pageChangeHandle={(index) => {
                dispatch({ type: 'SET_ACTIVE_PAGE_INDEX', payload: index + 1 });
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Merchs;
