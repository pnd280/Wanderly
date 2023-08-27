import { PropTypes } from 'prop-types';

import './TestimonialBox.scss';
import ParagraphWithHeading from './ParagraphWithHeading';

const TestimonialBox = ({ testimonial }) => {
  return (
    <div className="section-testimonials__testimonial-box">
      <figure className="author-box">
        <img src={testimonial.img_src} alt="user" className="author-box__img" />
        <figcaption className="author-box__name">{testimonial.name}</figcaption>
      </figure>
      <div className="testimonial-box">
        <ParagraphWithHeading
          heading={{ content: testimonial.summary }}
          paragraph={{ content: testimonial.quote }}
        />
      </div>
    </div>
  );
};

TestimonialBox.propTypes = {
  testimonial: PropTypes.object.isRequired,
};

export default TestimonialBox;
