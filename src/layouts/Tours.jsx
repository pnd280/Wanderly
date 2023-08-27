import { useState } from 'react';

import TourCard from '../components/TourCard';

import './Tours.scss';
import { useEffect } from 'react';
import Slider from '../components/Slider';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTours = tours.filter((tour) => {
    return tour.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    setTours([
      {
        id: 1,
        name: 'Tropical Beach Paradise',
        details: {
          description:
            'Experience the ultimate beach vacation in a tropical paradise, with crystal-clear waters, pristine white sand beaches, and luxurious beachfront villas. Enjoy a week of relaxation, adventure, and unforgettable memories.',
          duration: 7,
          guides: 2,
          accomodations: 'Beachfront villas',
          min: 10,
          max: 12,
        },
        price_per_person: 1500,
      },
      {
        id: 2,
        name: 'Snowy Mountain Getaway',
        details: {
          description:
            'Escape to a winter wonderland in the heart of the mountains, where you can enjoy skiing, snowboarding, and other winter sports. Stay at a luxury ski resort and unwind by the fireplace after a day on the slopes.',
          duration: 5,
          guides: 3,
          accomodations: 'Luxury ski resort',
          min: 5,
          max: 8,
        },
        price_per_person: 1200,
      },
      {
        id: 3,
        name: 'Ancient City Exploration',
        details: {
          description:
            'Step back in time and explore the rich history and culture of ancient cities. Visit iconic landmarks, museums, and archaeological sites, and learn about the civilizations that once thrived in these remarkable places.',
          duration: 8,
          guides: 2,
          accomodations: 'Historic boutique hotels',
          min: 6,
          max: 10,
        },
        price_per_person: 1800,
      },
      {
        id: 4,
        name: 'Wildlife Safari Adventure',
        details: {
          description:
            "Embark on an unforgettable wildlife safari adventure, where you'll have the opportunity to observe majestic animals in their natural habitat. Experience the thrill of game drives, guided walks, and birdwatching in some of the world's most renowned national parks and reserves.",
          duration: 10,
          guides: 4,
          accomodations: 'Luxury safari lodges',
          min: 4,
          max: 6,
        },
        price_per_person: 2500,
      },
      {
        id: 5,
        name: 'Culinary and Wine Tour',
        details: {
          description:
            "Indulge your senses on a culinary and wine tour, where you'll savor the flavors of local cuisine and sample world-class wines. Visit local markets, vineyards, and farms, and learn the art of cooking from expert chefs.",
          duration: 6,
          guides: 2,
          accomodations: 'Charming boutique hotels',
          min: 8,
          max: 12,
        },
        price_per_person: 2000,
      },
      {
        id: 6,
        name: 'Scenic Hiking Expedition',
        details: {
          description:
            'Discover breathtaking landscapes and challenge yourself on a scenic hiking expedition. Trek through diverse terrains, from lush forests to rugged mountains, and experience the beauty of nature up close.',
          duration: 7,
          guides: 3,
          accomodations: 'Eco-lodges and mountain huts',
          min: 4,
          max: 8,
        },
        price_per_person: 1700,
      },
    ]);
  }, []);

  const [priceToggle, setPriceToggle] = useState(false);

  const togglePrice = () => {
    setPriceToggle(!priceToggle);
  };

  return (
    <section className="section-tours">
      <div className="heading-secondary" id="tours">
        Guided tours
      </div>
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
        {filteredTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} priceToggle={priceToggle} />
        ))}
      </div>
      <div className="section-tours__pagination">
        <div className="pagination__btn btn is-active">1</div>
        <div className="pagination__btn btn">2</div>
        <div className="pagination__btn btn">3</div>
      </div>
    </section>
  );
};

export default Tours;
