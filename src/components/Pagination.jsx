import '@styles/Pagination.scss';

import { PropTypes } from 'prop-types';

import Button from '@components/Button';

const Pagination = ({
  activePageIndex,
  totalPage,
  pageChangeHandle,
  className,
}) => {
  return (
    <div className={`${className} pagination`}>
      {Array.from({ length: totalPage }, (_, i) => i + 1).map(
        (pageIndex, index) => {
          return (
            <Button
              key={index}
              className={`${className}-item btn ${
                index + 1 === activePageIndex ? 'is-active' : ''
              }`}
              onClick={() => {
                pageChangeHandle(index);
              }}
            >
              {pageIndex}
            </Button>
          );
        }
      )}
    </div>
  );
};

Pagination.propTypes = {
  activePageIndex: PropTypes.number,
  totalPage: PropTypes.number,
  pageChangeHandle: PropTypes.func,
  className: PropTypes.string,
};

export default Pagination;
