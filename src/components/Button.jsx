import { PropTypes } from 'prop-types';
import { memo } from 'react';

const Button = memo(function Button({
  href,
  className,
  children,
  onClick,
}) {
  return (
    <a
      href={href}
      className={`btn ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
});

Button.propTypes = {
  href: PropTypes.string.isOptional,
  children: PropTypes.any.isRequired,
  className: PropTypes.string.isOptional,
  onClick: PropTypes.func.isOptional,
};

export default Button;
