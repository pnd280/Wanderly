import '@styles/FeatureBox.scss';

import { PropTypes } from 'prop-types';

import ParagraphWithHeading from '@components/ParagraphWithHeading';

const FeatureBox = ({ icon, title, description }) => {
  return (
    <div className="section-features__feature-box">
      <span className="section-features__feature-box__icon">{icon}</span>
      <ParagraphWithHeading
        heading={{
          content: title,
          className: 'section-features__feature-box__heading',
        }}
        paragraph={{
          content: description,
          className: 'section-features__feature-box__text',
        }}
      />
    </div>
  );
};

FeatureBox.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureBox;
