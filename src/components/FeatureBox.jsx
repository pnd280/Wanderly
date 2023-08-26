import { PropTypes } from 'prop-types';

const FeatureBox = ({ icon, title, description }) => {
  return (
    <div className="section-features__feature-box">
      <span className="section-features__feature-box__icon">{icon}</span>
      <h3 className="section-features__feature-box__heading heading-tertiary">{title}</h3>
      <p className="section-features__feature-box__text">{description}</p>
    </div>
  );
};

FeatureBox.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureBox;
