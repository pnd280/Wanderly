import { PropTypes } from 'prop-types';

import './TourCard.scss';

const TourCard = ({ key, tour, priceToggle }) => {
  return (
    <div className={'tour-card'} key={key}>
      <div className="tour-card__heading">
        <div className="tour-card__img">
          <img
            src={`https://source.unsplash.com/random/1600x900/?${tour.name}`}
            alt={tour.name}
          />
        </div>
        <div className="tour-card__name">{tour.name}</div>
      </div>
      <div className="tour-card__details">
        {/* <div className="tour-card__description">
          {tour.details.description.slice(0, 50)}...
        </div> */}
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
              {tour.details.accomodations}
            </li>
            <li className="tour-card__list-item">
              {tour.details.min} - {tour.details.max} people
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`tour-card__price-box ${
          priceToggle ? '' : 'height-collapsed'
        }`}
      >
        <div className="price">
          ${tour.price_per_person}
          <span>per person</span>
        </div>
      </div>
    </div>
  );
};

TourCard.propTypes = {
  key: PropTypes.number.isRequired,
  tour: PropTypes.object.isRequired,
  priceToggle: PropTypes.bool.isRequired
};

export default TourCard;