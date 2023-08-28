import Navbar from '../components/Navbar';
import logo from '../assets/wanderly-logo-outlined.svg';
import Hero from '../components/Hero';

import './Header.scss';

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__nav-container">
          <div className="header__logo-box">
            <img src={logo} alt="Wanderly Logo" className="header__logo" />
          </div>
          <Navbar />
        </div>
        <Hero />
      </header>
      <a href="#" className="cta-text">
        find out more <span className="cta-text__pointer">👇🏻</span>
      </a>
    </>
  );
};

export default Header;
