import { PropTypes } from 'prop-types';
import { memo } from 'react';

const Button = memo(function Button({
  href,
  className,
  children,
  setActivePage,
}) {
  return (
    <a
      href={href}
      className={`btn ${className ?? ''}`}
      onClick={() => {
        setActivePage(parseInt(children));
      }}
    >
      {children}
    </a>
  );
});

Button.propTypes = {
  href: PropTypes.string.isOptional,
  children: PropTypes.any.isRequired,
  className: PropTypes.string.isOptional,
  setActivePage: PropTypes.func.isOptional,
};

export default Button;
