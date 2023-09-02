import '@styles/App.scss';

import { useState } from 'react';

import Header from '@/layouts/Header.jsx';
import About from '@layouts/About';
import Book from '@layouts/Book';
import Features from '@layouts/Features';
import Footer from '@layouts/Footer';
import Merchs from '@layouts/Merchs';
import Testimonials from '@layouts/Testimonials';
import Tours from '@layouts/Tours';

import AppContext from './context/AppContext';
import useArray from './hooks/useArray';

const App = () => {
  const [merchs, setMerchs] = useArray([]);
  const [merchFetched, setMerchFetched] = useState(false);

  return (
    <AppContext.Provider
      value={{ merchs, setMerchs, merchFetched, setMerchFetched }}
    >
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
