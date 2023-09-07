import '@styles/Tours.scss';

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import AppContext from '@/context/AppContext';
import useArray from '@/hooks/useArray';
import useArrayLocalStorage from '@/hooks/useArrayLocalStorage';
import useFetch from '@/hooks/useFetch';
import usePagination from '@/hooks/usePagination';
import { tours as mockData } from '@/mock-data.js';
import Pagination from '@components/Pagination';
import Slider from '@components/Slider';
import TourCard from '@components/TourCard';

const Tours = () => {
  const { merchs, merchFetched } = useContext(AppContext);

  const [priceToggle, setPriceToggle] = useState(false);
  const [favoriteToggle, setFavoriteToggle] = useState(false);

  const { array: tours, setArray: setTours } = useArray([], 'tours');

  const {
    storedValue: favoriteTours,
    push: addFavoriteTour,
    remove: removeFavoriteTour,
  } = useArrayLocalStorage('favoriteTours');

  const { array: freeMerchs, setArray: setFreeMerchs } = useArray(
    [],
    'freeMerchs'
  );

  const {
    response: fetchedTours,
    loading,
    error,
  } = useFetch('http://127.0.0.1:28000/tours/all');

  const [
    {
      activePageIndex,
      cardPerPage,
      searchTerm,
      debouncedSearchTerm,
      displayItems: displayTourIds,
    },
    { setActivePageIndex, setCardPerPage, setSearchTerm },
  ] = usePagination(tours);

  const searchBoxRef = useRef(null);

  const toggleFavorite = useCallback(
    (tourId) => {
      const index = favoriteTours.findIndex((id) => id === tourId);

      index > -1 ? removeFavoriteTour(index) : addFavoriteTour(tourId);
    },
    [addFavoriteTour, favoriteTours, removeFavoriteTour]
  );

  const favoriteTourIds = useMemo(() => {
    if (favoriteToggle) {
      return tours
        .filter((tour) => favoriteTours.includes(tour.id))
        .map((tour) => tour.id);
    }
  }, [favoriteToggle, tours, favoriteTours]);

  useEffect(() => {
    fetchedTours?.length > 0 && setTours(fetchedTours);
    error && setTours(mockData);
  }, [error, fetchedTours, setTours]);

  useEffect(() => {
    merchFetched.current &&
      setFreeMerchs(
        tours.map(() => merchs[Math.floor(Math.random() * merchs.length)].name)
      );
  }, [merchs, merchFetched, tours, setFreeMerchs]);

  return (
    <section className="section-tours">
      <h2 className="heading-secondary" id="tours">
        Guided tours
      </h2>
      <div className="section-tours__search-box" ref={searchBoxRef}>
        <input
          type="text"
          className="search-box__input"
          placeholder="Enter a tour name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <Slider
          label="Show price"
          onClick={() => {
            setPriceToggle((state) => !state);
          }}
        />
        <Slider
          label="Favorite list"
          onClick={() => {
            setFavoriteToggle((state) => !state);
          }}
        />
      </div>
      <div className="section-tours__tour-container">
        {displayTourIds.length < 1 && tours.length > 0 && 'No tour found!'}
        {loading ? (
          'Loading... 🚀'
        ) : tours.length > 0 ? (
          tours.map((tour, index) => {
            return (
              <TourCard
                key={index}
                tour={tour}
                priceToggle={priceToggle}
                isFavorited={favoriteTours.includes(tour.id)}
                toggleFavorite={toggleFavorite}
                show={(favoriteToggle
                  ? favoriteTourIds
                  : displayTourIds
                ).includes(tour.id)}
                freeMerch={freeMerchs[index]}
              />
            );
          })
        ) : (
          <div>No tour is available at the moment 🥲</div>
        )}
      </div>

      {debouncedSearchTerm.length < 1 && !favoriteToggle && (
        <>
          {Math.ceil(tours.length / cardPerPage) > 1 && (
            <div
              className="btn-text show-more-less"
              onClick={() => {
                let newCardPerPage = cardPerPage == 3 ? 6 : 3;

                newCardPerPage < cardPerPage &&
                  searchBoxRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });

                setCardPerPage(newCardPerPage);
              }}
            >
              Show {cardPerPage == 3 ? 'more' : 'less'}
            </div>
          )}
          <Pagination
            activePageIndex={activePageIndex}
            totalPage={Math.ceil(tours.length / cardPerPage)}
            pageChangeHandle={(index) => {
              setActivePageIndex(index + 1);
            }}
            className="section-tours__pagination"
          />
        </>
      )}

      <div className="cta-text-book">
        Can&apos;t find your ideal place? Let us help you 👇🏻
      </div>
    </section>
  );
};

export default Tours;
