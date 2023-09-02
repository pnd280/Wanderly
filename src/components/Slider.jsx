import '@styles/Slider.scss';

import { PropTypes } from 'prop-types';

const Slider = ({ label, onClick }) => {
  return (
    <div className="slider-box">
      <label className="switch">
        <input type="checkbox" onClick={onClick} />
        <span className="slider round" />
      </label>
      <div className="slider-label">{label}</div>
    </div>
  );
};

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Slider;
