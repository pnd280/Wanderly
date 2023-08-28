import NavList from './NavList';

import './Navbar.scss';

const Navbar = () => {
  const links = [
    {
      text: 'About',
    },
    {
      text: 'Benefits',
    },
    {
      text: 'Tours',
    },
    {
      text: 'Stories',
    },
    {
      text: 'Contact',
    },
  ];

  return (
    <>
      <nav className="nav__nav">
        <NavList links={links} />
      </nav>
    </>
  );
};

export default Navbar;

// <ul className="nav__list">
//   <li className="nav__item">
//     <a href="#" className="nav__link">
//       About
//     </a>
//   </li>
//   <li className="nav__item">
//     <a href="#" className="nav__link">
//       Benefits
//     </a>
//   </li>
//   <li className="nav__item">
//     <a href="#" className="nav__link">
//       Tours
//     </a>
//   </li>
//   <li className="nav__item">
//     <a href="#" className="nav__link">
//       Stories
//     </a>
//   </li>
//   <li className="nav__item">
//     <a href="#" className="nav__link">
//       Contact
//     </a>
//   </li>
// </ul>
