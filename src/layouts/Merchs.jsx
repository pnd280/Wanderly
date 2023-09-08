import '@styles/Merchs.scss';

import {
  useContext,
  useEffect,
} from 'react';

import { BsCart } from 'react-icons/bs';

import Cart from '@/components/Cart';
import Portal from '@/components/Portal';
import AppContext from '@/context/AppContext';
import CartContext from '@/context/CartContext';
import useFetch from '@/hooks/useFetch';
import usePagination from '@/hooks/usePagination';
import { merchs as mockData } from '@/mock-data';
import MerchCard from '@components/MerchCard';
import Pagination from '@components/Pagination';

const Merchs = () => {
  const { merchs, setMerchs } = useContext(AppContext);

  const { totalAmount, toggleState, addItem } = useContext(CartContext);

  const [
    {
      activePageIndex,
      cardPerPage,
      searchTerm,
      debouncedSearchTerm,
      displayItems: displayMerchIds,
    },
    { setActivePageIndex, setCardPerPage, setSearchTerm },
  ] = usePagination(merchs);

  const {
    response: fetchedMerchs,
    loading,
    error,
  } = useFetch('http://127.0.0.1:28000/merchs/all');

  useEffect(() => {
    fetchedMerchs?.length > 0 && setMerchs(fetchedMerchs);
    error && setMerchs(mockData);
  }, [setMerchs, error, fetchedMerchs]);

  return (
    <>
      <Portal>
        <Cart />
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
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div className="section-merchs__cart" onClick={toggleState}>
            <div className="cart__count">{totalAmount}</div>
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
                    addItem(merch);
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

                  setCardPerPage(newCardPerPage);
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
                setActivePageIndex(index + 1);
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Merchs;
