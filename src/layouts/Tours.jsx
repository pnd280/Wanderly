import { useState, useMemo, useRef, useReducer, useCallback } from 'react';
import axios from 'axios';

import TourCard from '../components/TourCard';

import './Tours.scss';
import { useEffect } from 'react';
import Slider from '../components/Slider';

import mockData from '../mock-data.js';
import Button from '../components/Button';

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
  const [tours, setTours] = useState([]);
  const [favoriteTours, setFavoriteTours] = useState([]);

  const [
    { priceToggle, activePageIndex, cardPerPage, searchTerm, showOnlyFavorite },
    dispatch,
  ] = useReducer(reducer, initialState);

  const searchBoxRef = useRef(null);

  useEffect(() => {
    (async () => {
      console.log('fetching tours...');

      let fetchedTours = [];

      try {
        const response = await axios.get('http://127.0.0.1:28000/tours/all');
        fetchedTours = response.data;
      } catch (error) {
        fetchedTours = mockData;
      }

      setTours(fetchedTours);
      dispatch({ type: 'SET_ACTIVE_PAGE_INDEX', payload: 1 });

      // fetch favorite list
      const fetchedList = JSON.parse(localStorage.getItem('favoriteTours'));

      fetchedList?.length > 0 && setFavoriteTours(fetchedList);
    })();
  }, []);

  const displayedTours = useMemo(() => {
    if (showOnlyFavorite) {
      return tours.filter((tour) => favoriteTours.includes(tour.id));
    }

    return searchTerm.length > 0
      ? tours.filter((tour) =>
          tour.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : tours.slice(
          (activePageIndex - 1) * cardPerPage,
          (activePageIndex - 1) * cardPerPage + cardPerPage
        );
  }, [
    activePageIndex,
    searchTerm,
    cardPerPage,
    showOnlyFavorite,
    favoriteTours,
  ]);

  useEffect(() => {
    activePageIndex > Math.ceil(tours.length / cardPerPage) &&
      dispatch({
        type: 'SET_ACTIVE_PAGE_INDEX',
        payload: Math.ceil(tours.length / cardPerPage),
      });
  }, [cardPerPage]);

  const setFavorite = useCallback((tourId) => {
    setFavoriteTours((favoriteTours) => {
      const newList = favoriteTours.includes(tourId)
        ? favoriteTours.filter((v) => v !== tourId)
        : favoriteTours.concat([tourId]);

      localStorage.setItem('favoriteTours', JSON.stringify(newList));

      return newList;
    });
  }, []);

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
          displayedTours.map((tour, index) => {
            return (
              <TourCard
                key={index}
                tour={tour}
                priceToggle={priceToggle}
                isFavorited={favoriteTours.includes(tour.id)}
                setFavorite={setFavorite}
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
            className="btn-text"
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
          <div className="section-tours__pagination">
            {Array.from(
              { length: Math.ceil(tours.length / cardPerPage) },
              (_, i) => i + 1
            ).map((pageIndex, index) => {
              return (
                <Button
                  key={index}
                  className={`section-tours__pagination-item btn ${
                    index + 1 === activePageIndex ? 'is-active' : ''
                  }`}
                  setActivePage={() => {
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

      <div className="cta-text-book">
        Can&apos;t find your ideal place? Let us help you 👇🏻
      </div>
    </section>
  );
};

export default Tours;
