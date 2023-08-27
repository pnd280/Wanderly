import { PropTypes } from 'prop-types';

const ParagraphWithHeading = ({ heading, paragraph }) => {
  return (
    <>
      <h3
        className={`heading-tertiary ${
          heading.className ? heading.className : ''
        }`}
      >
        {heading.content}
      </h3>
      <p className={paragraph.className ? paragraph.className : ''}>
        {paragraph.content}
      </p>
    </>
  );
};

ParagraphWithHeading.propTypes = {
  heading: PropTypes.object.isRequired,
  paragraph: PropTypes.object.isRequired,
};

export default ParagraphWithHeading;
