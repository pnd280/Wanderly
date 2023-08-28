import { PropTypes } from 'prop-types';

const NavList = ({ links }) => {
  return (
    <ul className="nav__list">
      {links.map((e, index) => {
        return (
          <li key={index} className="nav__item">
            <a href="" className="nav__link">
              {e.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

NavList.propTypes = {
  links: PropTypes.array.isRequired,
};

export default NavList;
