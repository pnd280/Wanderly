import "./Navbar.scss"

const Navbar = () => {
  return (
    <>
      <nav className="nav__nav">
        <ul className="nav__list">
          <li className="nav__item">
            <a href="#" className="nav__link">
              About Wanderly
            </a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">
              Your benefits
            </a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">
              Popular tours
            </a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">
              Stories
            </a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">
              Book now
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
