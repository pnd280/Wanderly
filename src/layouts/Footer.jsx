import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="./wanderly-logo.svg" alt="logo" />
        <div className="footer__brand-name">Wanderly</div>
      </div>

      <div className="footer__links">
        <div className="footer__nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#" className="nav__link">
                Company
              </a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">
                Socials
              </a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">
                Careers
              </a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">
                Privacy
              </a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__legal">© 2023 Wanderly. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
