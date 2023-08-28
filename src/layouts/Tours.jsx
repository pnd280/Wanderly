import { useState } from 'react';
import axios from 'axios';

import TourCard from '../components/TourCard';

import './Tours.scss';
import { useEffect } from 'react';
import Slider from '../components/Slider';

import mockData from '../mock-data.js';
import Button from '../components/Button';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [displayedTours, setDisplayedTours] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const [displayLimit, setDisplayLimit] = useState(3);

  const filteredTours = tours.filter((tour) => {
    if (searchTerm.length > 0) {
      return tour.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  /* #region Lazy load */
  // const fetchTourCount = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://127.0.0.1:28000/tours/all?type=count'
  //     );
  //     setPageCount(() => {
  //       const newPageCount = Math.ceil(response.data / 3);
  //       console.log('pageCount = ' + newPageCount);

  //       setToursInRange(0);

  //       return newPageCount;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const setToursInRange = async (pageIndex) => {
  //   try {
  //     const from = pageIndex * 3 + 1;
  //     const to = from + 2;

  //     const response = await axios.get(
  //       `http://127.0.0.1:28000/tours?from=${from}&to=${to}`
  //     );

  //     setTours(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  /* #endregion */

  const displayItem = (tours) => {
    const pageCount = Math.ceil(tours.length / displayLimit);
    setPageCount(pageCount);
    setTours(tours);
    setDisplayedTours(tours.slice(0, displayLimit));
  };

  useEffect(() => {
    // fetchTourCount();

    (async () => {
      let fetchedTours = [];

      try {
        const response = await axios.get('http://127.0.0.1:28000/tours/all');
        fetchedTours = response.data;
        displayItem(fetchedTours);
      } catch (error) {
        console.log(error);
        fetchedTours = mockData;
      }
    })();
  }, []);

  useEffect(() => {
    displayItem(tours);
  }, [displayLimit]);

  const [priceToggle, setPriceToggle] = useState(false);

  const togglePrice = () => {
    setPriceToggle(!priceToggle);
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
        {pageCount < 1 ? (
          <div>No tours found at the momment 😅</div>
        ) : searchTerm === '' ? (
          displayedTours.map((tour, index) => (
            <TourCard key={index} tour={tour} priceToggle={priceToggle} />
          ))
        ) : (
          filteredTours.map((tour, index) => (
            <TourCard key={index} tour={tour} priceToggle={priceToggle} />
          ))
        )}
      </div>

      {searchTerm.length > 0 ? null : (
        <>
          <div
            className="btn-text"
            onClick={() => {
              setDisplayLimit(displayLimit == 3 ? 6 : 3);
            }}
          >
            Show {displayLimit == 3 ? 'more' : 'less'}
          </div>

          <div className="section-tours__pagination">
            {pageCount > 0
              ? Array.from({ length: pageCount }, (_, i) => i + 1).map(
                  (page, index) => (
                    <Button
                      key={index}
                      className={`section-tours__pagination-item btn ${
                        index === activePage ? 'is-active' : ''
                      }`}
                      onClick={() => {
                        setActivePage(index);
                        setDisplayedTours(
                          tours.slice(
                            index * displayLimit,
                            index * displayLimit + displayLimit
                          )
                        );
                      }}
                    >
                      {page}
                    </Button>
                  )
                )
              : null}
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
