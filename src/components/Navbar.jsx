import "./Navbar.scss"

const Navbar = () => {
  return (
    <>
      <nav className="nav__nav">
        <ul className="nav__list">
          <li className="nav__item">
            <a href="#" className="nav__link">
              About
            </a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">
              Benefits
            </a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">
              Tours
            </a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">
              Stories
            </a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
