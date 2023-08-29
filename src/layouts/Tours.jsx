import { useState, useMemo, useCallback } from 'react';
import axios from 'axios';

import TourCard from '../components/TourCard';

import './Tours.scss';
import { useEffect } from 'react';
import Slider from '../components/Slider';

import mockData from '../mock-data.js';
import Button from '../components/Button';

const Tours = () => {
  const [tours, setTours] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [cardPerPage, setCardPerPage] = useState(3);

  const [priceToggle, setPriceToggle] = useState(false);

  useEffect(() => {
    console.log('effect 1');
    (async () => {
      let fetchedTours = [];

      try {
        const response = await axios.get('http://127.0.0.1:28000/tours/all');
        fetchedTours = response.data;
      } catch (error) {
        fetchedTours = mockData;
      }

      setTours(fetchedTours);
      setActivePageIndex(1);
    })();
  }, []);

  const displayedTours = useMemo(() => {
    return searchTerm.length > 0
      ? tours.filter((tour) =>
          tour.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : tours.slice(
          (activePageIndex - 1) * cardPerPage,
          (activePageIndex - 1) * cardPerPage + cardPerPage
        );
  }, [activePageIndex, searchTerm, cardPerPage, tours]);

  useEffect(() => {
    activePageIndex > Math.ceil(tours.length / cardPerPage) &&
      setActivePageIndex(Math.ceil(tours.length / cardPerPage));
  }, [cardPerPage]);

  const togglePrice = () => {
    setPriceToggle((prevPriceToggle) => !prevPriceToggle);
  };

  return (
    <section className="section-tours">
      <h2 className="heading-secondary" id="tours">
        Guided tours
      </h2>
      <div className="section-tours__search-box">
        <input
          type="text"
          className="search-box__input"
          placeholder="Enter a tour name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <Slider label="Show price" onClick={togglePrice} />
      </div>
      <div className="section-tours__tour-container">
        {tours.length > 0 ? (
          displayedTours.map((tour, index) => {
            return (
              <TourCard key={index} tour={tour} priceToggle={priceToggle} />
            );
          })
        ) : (
          <div>Fetching tours...</div>
        )}
      </div>

      {searchTerm.length < 1 && (
        <>
          <div
            className="btn-text"
            onClick={() => {
              setCardPerPage(cardPerPage == 3 ? 6 : 3);
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
                  onClick={() => {
                    setActivePageIndex(index + 1);
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
