import { PropTypes } from 'prop-types';

const NavList = ({ links }) => {
  return (
    <ul className="nav__list">
      {links.map((link, index) => {
        return (
          <li key={index} className="nav__item">
            <a
              href={`#${link.text.toLowerCase()}`}
              className="nav__link"
              onClick={(e) => {
                e.preventDefault();

                if (link.text.toLowerCase()) {
                  const element = document.getElementById(link.text.toLowerCase());
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {link.text}
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
