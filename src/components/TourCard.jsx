import '@styles/TourCard.scss';

import { memo } from 'react';

import { PropTypes } from 'prop-types';
import {
  AiFillHeart,
  AiOutlineHeart,
} from 'react-icons/ai';

const TourCard = memo(function TourCard({
  tour,
  priceToggle,
  isFavorited,
  toggleFavorite,
  show,
  freeMerch,
}) {
  return (
    <div
      className={`tour-card ${isFavorited ? 'favorited' : ''}`}
      style={{ display: show ? 'block' : 'none' }}
    >
      <div className="tour-card__heading">
        <div className="tour-card__img">
          <img
            src={`https://source.unsplash.com/random/1600x900/?${tour.name}`}
            alt={tour.name}
          />
          <div
            className="tour-card__img__favorite"
            onClick={() => {
              toggleFavorite(tour.id);
            }}
          >
            {isFavorited ? <AiFillHeart /> : <AiOutlineHeart />}
          </div>
        </div>
        <div className="tour-card__name">{tour.name}</div>
      </div>
      <div className="tour-card__details">
        <div className="tour-card__description">
          {tour.details.description.slice(0, 50)}...
        </div>
        <div className="tour-card__specs">
          <ul className="tour-card__list">
            <li className="tour-card__list-item">
              {tour.details.duration} days, {tour.details.duration - 1} nights
            </li>
            <li className="tour-card__list-item">
              {tour.details.guides} tour guide
              {tour.details.guides > 1 ? 's' : null}
            </li>
            <li className="tour-card__list-item">
              {tour.details.accommodations}
            </li>
            <li className="tour-card__list-item">
              {tour.details.min} - {tour.details.max} people
            </li>
            {freeMerch && (
              <li
                onClick={() => {
                  document
                    .getElementById('merchs')
                    .scrollIntoView({ behavior: 'smooth' });
                }}
              >
                🎁 {freeMerch}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div
        className={`tour-card__price-box ${
          priceToggle ? 'height-expanded' : 'height-collapsed'
        }`}
      >
        <div className="price">
          ${tour.price_per_person}
          <span>per person</span>
        </div>
      </div>
    </div>
  );
});

TourCard.propTypes = {
  tour: PropTypes.object.isRequired,
  priceToggle: PropTypes.bool.isRequired,
  isFavorited: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  freeMerch: PropTypes.string,
};

export default TourCard;
