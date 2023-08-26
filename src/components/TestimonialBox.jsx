import { PropTypes } from 'prop-types';

import './TestimonialBox.scss';

const TestimonialBox = ({ testimonial }) => {
  return (
    <div className="section-testimonials__testimonial-box">
      <figure className="author-box">
        <img src={testimonial.img_src} alt="user" className="author-box__img" />
        <figcaption className="author-box__name">{testimonial.name}</figcaption>
      </figure>
      <div className="testimonial-box">
        <h3 className="heading-tertiary">{testimonial.summary}</h3>
        <p>{testimonial.quote}</p>
      </div>
    </div>
  );
};

TestimonialBox.propTypes = {
  testimonial: PropTypes.object.isRequired,
};

export default TestimonialBox;
