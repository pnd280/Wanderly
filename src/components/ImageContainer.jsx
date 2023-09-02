import '@styles/ImageContainer.scss';

import { PropTypes } from 'prop-types';

const ImageContainer = ({ src, alt, className }) => {
  return (
    <div className="image-container">
      <img src={src} alt={alt} className={className} />
    </div>
  );
};

ImageContainer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default ImageContainer;
