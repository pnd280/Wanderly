import '@styles/Merchs.scss';

import {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import { BsCart } from 'react-icons/bs';

import Cart from '@/components/Cart';
import Portal from '@/components/Portal';
import AppContext from '@/context/AppContext';
import useArrayLocalStorage from '@/hooks/useArrayLocalStorage';
import useDebounce from '@/hooks/useDebounce';
import useFetch from '@/hooks/useFetch';
import { merchs as mockData } from '@/mock-data';
import MerchCard from '@components/MerchCard';
import Pagination from '@components/Pagination';

const initialState = {
  activePageIndex: 1,
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
  const { merchs, setMerchs, merchFetched } = useContext(AppContext);

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

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    response: fetchedMerchs,
    loading,
    error,
  } = useFetch('http://127.0.0.1:28000/merchs/all');

  const displayMerchIds = useMemo(() => {
    return debouncedSearchTerm.length > 0
      ? merchs
          .filter((merch) =>
            merch.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          )
          .map((merch) => merch.id)
      : Array.from({ length: cardPerPage }, (_, i) => {
          return 1 + (activePageIndex - 1) * cardPerPage + i;
        });
  }, [debouncedSearchTerm, merchs, cardPerPage, activePageIndex]);

  useEffect(() => {
    fetchedMerchs?.length > 0 && setMerchs(fetchedMerchs);
    error && setMerchs(mockData);

    (fetchedMerchs?.length > 0 || error) && (merchFetched.current = true);
  }, [merchFetched, setMerchs, error, fetchedMerchs]);

  useEffect(() => {
    merchs.length > 0 &&
      (function normalizeActivePageIndex() {
        activePageIndex > Math.ceil(merchs.length / cardPerPage) &&
          dispatch({
            type: 'SET_ACTIVE_PAGE_INDEX',
            payload: Math.ceil(merchs.length / cardPerPage),
          });
      })();
  }, [activePageIndex, cardPerPage, merchs.length]);

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
          {loading
            ? 'Loading... 🚀'
            : merchs.map((merch) => (
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

        {debouncedSearchTerm.length < 1 && (
          <>
            {Math.ceil(merchs.length / cardPerPage) > 1 && (
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
            )}
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
