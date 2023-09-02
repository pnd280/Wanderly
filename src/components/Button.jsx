import { memo } from 'react';

import { PropTypes } from 'prop-types';

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
  href: PropTypes.string,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
