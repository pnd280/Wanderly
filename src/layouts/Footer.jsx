import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';

import './Footer.scss';
import NavList from '../components/NavList';

const Footer = () => {
  const navLinks = [
    {
      text: 'Company',
    },
    {
      text: 'Blog',
    },
    {
      text: 'Careers',
    },

    {
      text: 'FAQ',
    },
    {
      text: 'Privacy terms',
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="./wanderly-logo.svg" alt="logo" />
        <div className="footer__brand-name">Wanderly</div>
        <div className="footer__socials">
          <a href="#" className="socials__link">
            <FaFacebookF />
          </a>
          <a href="#" className="socials__link">
            <FaTwitter />
          </a>
          <a href="#" className="socials__link">
            <FaInstagram />
          </a>
          <a href="#" className="socials__link">
            <FaYoutube />
          </a>
        </div>
      </div>

      <div className="footer__links">
        <div className="footer__nav">
          <NavList links={navLinks} />
        </div>
      </div>

      <div className="footer__company-contact">
        <div className="company-contact__address">
          <div className="icon">
            <IoLocationOutline />
          </div>
          <div className="company-contact__address-text">
            <span>Wanderly Inc.</span>
            <span>475 Adventure Avenue</span>
            <span>Globetrotter City, GC 94102</span>
            <span>Wonderful States</span>
          </div>
        </div>
        <div className="company-contact__phone">
          <div className="icon">
            <FiPhone />
          </div>
          <div className="company-contact__phone-number">
            +1 (888) 555-TRIP (8747)
          </div>
        </div>
      </div>

      <div className="footer__legal">© 2023 Wanderly. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
