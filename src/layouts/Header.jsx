import Navbar from '../components/NavBar';
import logo from '../../public/wanderly-logo-outlined.svg';

import './Header.scss';
import Hero from './Hero';

const Header = () => {
  return (
    <header className="header">
      <div className="header__nav-container">
        <div className="header__logo-box">
          <img src={logo} alt="Wanderly Logo" className="header__logo" />
        </div>
        <Navbar />
      </div>
      <Hero />
    </header>
  );
};

export default Header;
