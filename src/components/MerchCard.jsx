import { PropTypes } from 'prop-types';

import './MerchCard.scss';
import { memo } from 'react';

const MerchCard = memo(function MerchCard({ merch, show, addToCartHandle }) {
  return (
    <div className="merch-card" style={{ display: show ? 'block' : 'none' }}>
      <div
        className={`merch-card__heading ${merch.isPopular ? 'popular' : ''}`}
      >
        <div className="merch-card__img">
          <img src={merch.img_src} alt={merch.name} />
        </div>
        <div className="merch-card__name">{merch.name}</div>
      </div>
      <div className="merch-card__content">
        <div className="merch-card__price">{merch.price}$</div>
        <div className="merch-card__add-to-cart btn" onClick={addToCartHandle}>Add to cart</div>
      </div>
    </div>
  );
});

MerchCard.propTypes = {
  merch: PropTypes.object.isRequired,
};

export default MerchCard;
