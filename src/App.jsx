import '@styles/App.scss';

import { useRef } from 'react';

import AppContext from '@/context/AppContext';
import useArray from '@/hooks/useArray';
import Header from '@/layouts/Header.jsx';
import Merchs from '@/layouts/Merchs';
import About from '@layouts/About';
import Book from '@layouts/Book';
import Features from '@layouts/Features';
import Footer from '@layouts/Footer';
import Testimonials from '@layouts/Testimonials';
import Tours from '@layouts/Tours';

const App = () => {
  const { array: merchs, setArray: setMerchs } = useArray([]);
  const merchFetched = useRef(false);

  return (
    <AppContext.Provider value={{ merchs, setMerchs, merchFetched }}>
      <Header />
      <About />
      <Features />
      <Tours />
      <Book />
      <Testimonials />
      <Merchs />
      <Footer />
    </AppContext.Provider>
  );
};

export default App;
