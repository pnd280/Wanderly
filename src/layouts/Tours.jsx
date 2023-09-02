import '@styles/Tours.scss';

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import axios from 'axios';

import AppContext from '@/context/AppContext';
import useArray from '@/hooks/useArray';
import { tours as mockData } from '@/mock-data.js';
import Pagination from '@components/Pagination';
import Slider from '@components/Slider';
import TourCard from '@components/TourCard';

const initialState = {
  priceToggle: false,
  activePageIndex: 0,
  cardPerPage: 3,
  searchTerm: '',
  showOnlyFavorite: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_PRICE':
      return {
        ...state,
        priceToggle: !state.priceToggle,
      };
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
    case 'SHOW_ONLY_FAVORITED':
      return {
        ...state,
        showOnlyFavorite: !state.showOnlyFavorite,
      };
    default:
      return state;
  }
};

const Tours = () => {
  const { merchs, merchFetched } = useContext(AppContext);

  const [tours, setTours] = useArray([], 'tours');
  const [favoriteTours, setFavoriteTours] = useArray([], 'favoriteTours');
  const [freeMerchs, setFreeMerchs] = useArray([], 'freeMerchs');

  const [
    { priceToggle, activePageIndex, cardPerPage, searchTerm, showOnlyFavorite },
    dispatch,
  ] = useReducer(reducer, initialState);

  const searchBoxRef = useRef(null);

  const fetchTours = async () => {
    console.log('fetching tours...');
    let fetchedTours = [];

    try {
      const response = await axios.get('http://127.0.0.1:28000/tours/all');
      fetchedTours = response.data;
    } catch (error) {
      fetchedTours = mockData;
    }

    return fetchedTours;
  };

  const fetchFavoriteTours = () => {
    const fetchedList = JSON.parse(localStorage.getItem('favoriteTours'));
    return fetchedList?.length > 0 ? fetchedList : [];
  };

  const setFavorite = useCallback((tourId) => {
    setFavoriteTours((favoriteTours) => {
      const newList = favoriteTours.includes(tourId)
        ? favoriteTours.filter((v) => v !== tourId)
        : favoriteTours.concat([tourId]);

      localStorage.setItem('favoriteTours', JSON.stringify(newList));

      return newList;
    });
  }, []);

  const displayedTours = useMemo(() => {
    if (showOnlyFavorite) {
      return tours
        .filter((tour) => favoriteTours.includes(tour.id))
        .map((tour) => tour.id);
    }

    return searchTerm.length > 0
      ? tours
          .filter((tour) =>
            tour.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((tour) => tour.id)
      : Array.from({ length: cardPerPage }, (_, i) => {
          return 1 + (activePageIndex - 1) * cardPerPage + i;
        });
  }, [
    activePageIndex,
    searchTerm,
    cardPerPage,
    showOnlyFavorite,
    favoriteTours,
  ]);

  useEffect(() => {
    (async () => {
      const fetchedTours = await fetchTours();
      setTours(fetchedTours);

      const fetchedFavoriteTours = fetchFavoriteTours();
      setFavoriteTours(fetchedFavoriteTours);

      dispatch({ type: 'SET_ACTIVE_PAGE_INDEX', payload: 1 });
    })();
  }, []);

  useEffect(() => {
    if (merchFetched) {
      setFreeMerchs(
        tours.map(() => merchs[Math.floor(Math.random() * merchs.length)].name)
      );
    }
  }, [merchs]);

  // navigate to the last page if the current page is out of range after changing card per page
  useEffect(() => {
    activePageIndex > Math.ceil(tours.length / cardPerPage) &&
      dispatch({
        type: 'SET_ACTIVE_PAGE_INDEX',
        payload: Math.ceil(tours.length / cardPerPage),
      });
  }, [cardPerPage]);

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
            dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value });
          }}
        />
        <Slider
          label="Show price"
          onClick={() => {
            dispatch({ type: 'TOGGLE_PRICE' });
          }}
        />
        <Slider
          label="Favorite list"
          onClick={() => {
            dispatch({ type: 'SHOW_ONLY_FAVORITED' });
          }}
        />
      </div>
      <div className="section-tours__tour-container">
        {tours.length > 0 ? (
          tours.map((tour, index) => {
            return (
              <TourCard
                key={index}
                tour={tour}
                priceToggle={priceToggle}
                isFavorited={favoriteTours.includes(tour.id)}
                setFavorite={setFavorite}
                show={displayedTours.includes(tour.id)}
                freeMerch={freeMerchs[index]}
              />
            );
          })
        ) : (
          <div>Fetching tours...</div>
        )}
      </div>

      {searchTerm.length < 1 && !showOnlyFavorite && (
        <>
          <div
            className="btn-text show-more-less"
            onClick={() => {
              let newCardPerPage = cardPerPage == 3 ? 6 : 3;

              newCardPerPage < cardPerPage &&
                searchBoxRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });

              dispatch({ type: 'SET_CARD_PER_PAGE', payload: newCardPerPage });
            }}
          >
            Show {cardPerPage == 3 ? 'more' : 'less'}
          </div>
          <Pagination
            activePageIndex={activePageIndex}
            totalPage={Math.ceil(tours.length / cardPerPage)}
            pageChangeHandle={(index) => {
              dispatch({
                type: 'SET_ACTIVE_PAGE_INDEX',
                payload: index + 1,
              });
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
