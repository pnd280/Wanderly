
import Button from "./Button";
import "./Pagination.scss";

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

export default Pagination;